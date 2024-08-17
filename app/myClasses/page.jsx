"use client"
import { useState, useEffect, useRef } from "react";
// import { Framework } from "@superfluid-finance/sdk-core";
// import { ethers } from "ethers";
// import web3modal from "web3modal";
import { address, abi } from "../../constants";
import styles from "../../styles/style";
import { Navbar } from "../../components";
import { useLocalPeer } from "@huddle01/react/hooks";
import { useHuddle01 ,useRoom} from "@huddle01/react/hooks";
import { useLocalVideo, useLocalAudio, useLocalScreenShare,useLobby,usePeers } from '@huddle01/react/hooks';
import { 
    usePeerIds, 
    useRemoteVideo, 
    useRemoteAudio, 
    useRemoteScreenShare 
  } from '@huddle01/react/hooks';
  import { useEventListener } from "@huddle01/iframe";
import { Audio, Video } from "@huddle01/react/components";
import Web3Modal from "web3modal";
export default function MyClasses() {
    // const receiverAddress = `0x248F5db296Ae4D318816e72c25c93e620341f621`;
    // const flowRate = `385802469135802`;

    const { initialize, isInitialized } = useHuddle01();
    const { joinLobby } = useLobby();
    const { stream:localVideoStream, enableVideo, disableVideo, isVideoOn } = useLocalVideo();
    const { stream:localAudioStream, enableAudio, disableAudio, isAudioOn } = useLocalAudio();
    const { startScreenShare, stopScreenShare, shareStream } = useLocalScreenShare();
    const { joinRoom, leaveRoom } = useRoom();

    const videoRef = useRef();
    // const { peers } = usePeers();
     const {
        peerIds
      } = usePeerIds({
      roles: [],
      labels: [],
      onPeerRoleUpdate(data) {}
      });

    async function runHardware() {
        if (fetchVideoStream.isCallable) {
            fetchVideoStream();
        }
        if (fetchAudioStream.isCallable) {
            fetchAudioStream();
        }
    }
    async function produceHardware() {
        // if (fetchVideoStream.isCallable) {
        //     fetchVideoStream();
        // }
        if (produceVideo.isCallable) {
            produceVideo(camStream);
        }
        // if (fetchAudioStream.isCallable) {
        //     fetchAudioStream();
        // }
        if (produceAudio.isCallable) {
            produceAudio(micStream);
        }
    }

    async function stopHardware() {
        if (stopVideoStream.isCallable) {
            stopVideoStream();
        }
        if (stopAudioStream.isCallable) {
            stopAudioStream();
        }
    }

    useEventListener("lobby:cam-on", () => {
        if (camStream && videoRef.current)
            videoRef.current.srcObject = camStream;
        
    });

    const superTokenAddress = `0x96B82B65ACF7072eFEb00502F45757F254c2a0D4`;
    const [superToken, setSuperToken] = useState();
    const [gigs, setGigs] = useState([]);
    const [userAddress, setUserAddress] = useState();

    async function joinMeeting(prop) {
        joinLobby(prop.meetingId);
        await startFlow(prop.host, prop.flowRate);
        // await getFlowInfo(prop.host);
    }

    async function endMeeting(prop) {
        if (leaveRoom.isCallable) {
            leaveRoom();
        }
        stopHardware();
        await stopFlow(prop.host);
    }

    useEffect(() => {
        sfInitialize();
        fetchUserAddress();
        fetchMyClasses();
        // initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
    }, []);

    async function getEthersProvider() {
        const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
        const provider = new ethers.providers.JsonRpcProvider(
            `https://polygon-mumbai.infura.io/v3/${infuraKey}`
        );
        return provider;
    }

    async function sfInitialize() {
        const provider = await getEthersProvider();
        const xsf = await Framework.create({
            chainId: 80001,
            provider,
        });
        const sT = await xsf.loadSuperToken(superTokenAddress);
        setSuperToken(sT);

        console.log("ready");
        return sT;
    }

    async function fetchUserAddress() {
        const modal = new Web3Modal({
            network: "mumbai",
            cacheProvider: true,
        });
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        let accounts = await provider.send("eth_requestAccounts", []);
        let senderAddress = accounts[0];
        setUserAddress(senderAddress);
        return senderAddress;
    }

    async function fetchMyClasses() {
        const provider = await getEthersProvider();
        const senderAddress = await fetchUserAddress();
        const contract = new ethers.Contract(address, abi, provider);
        const data = await contract.myClasses(senderAddress);
        const itemsFetched = await Promise.all(
            data.map(async (i) => {
                let parseStringFlowRate = ethers.utils.formatEther(
                    i.stringFlowRate
                );
                let item = {
                    host: i.host.toString(),
                    title: i.title,
                    description: i.description,
                    time: i.time,
                    meetingId: i.meetingId,
                    flowRate: i.flowRate.toNumber(),
                    stringFlowRate: parseStringFlowRate,
                    gigId: i.gigId.toNumber(),
                    nftTokenId: i.nftTokenId.toNumber(),
                    attendees: i.attendees.toNumber(),
                };
                return item;
            })
        );

        console.log("inventory", itemsFetched);
        setGigs(itemsFetched);

        return itemsFetched;
    }

    async function startFlow(xReceiverAddress, xFlowRate) {
        const senderAddress = await fetchUserAddress();
        if (senderAddress.toUpperCase() == xReceiverAddress.toUpperCase()) return
        console.log(senderAddress, xReceiverAddress, xFlowRate);

        const xSuperToken = await sfInitialize();

        const modal = new web3modal({
            network: "mumbai",
            cacheProvider: true,
        });
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const createFlowOperation = xSuperToken.createFlow({
            sender: senderAddress,
            receiver: xReceiverAddress,
            flowRate: xFlowRate,
        });

        const txnResponse = await createFlowOperation.exec(signer);
        const txnReceipt = await txnResponse.wait();
        console.log("started");
        console.log(
            `https://app.superfluid.finance/dashboard/${xReceiverAddress}`
        );
    }

    async function stopFlow(xReceiverAddress) {

        if (userAddress?.toUpperCase() == xReceiverAddress?.toUpperCase()) return

        const modal = new web3modal({
            network: "mumbai",
            cacheProvider: true,
        });
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const flowOp = superToken.deleteFlow({
            sender: userAddress,
            receiver: xReceiverAddress,
        });

        const txnResponse = await flowOp.exec(signer);
        const txnReceipt = await txnResponse.wait();
        console.log("stopped");
    }

    async function getFlowInfo(xReceiverAddress) {
        const provider = await getEthersProvider();
        if (userAddress == xReceiverAddress) return
        
        const flowInfo = await superToken.getFlow({
            sender: userAddress,
            receiver: xReceiverAddress,
            providerOrSigner: provider,
        });
        console.log("flowInfo", flowInfo);
    }

    function Card(prop) {
        const add0 = (t) => (t < 10 ? `0${t}` : String(t));
        const getDateStandard = (dt) => {
            const y = dt.getFullYear();
            const m = add0(dt.getMonth() + 1);
            const d = add0(dt.getDate()); //day of month
            const w = dt.toDateString().substring(0, 3); //day of week enum, either Mon, Tue, Wed, Thu, Fri, Sat, Sun
            const h = add0(dt.getHours());
            const min = add0(dt.getMinutes());
            return `${d}-${m}-${y} ${w} ${h}:${min}`;
        };
        const dateTime = new Date(prop.time);
        return (
            <div className={`bg-primary ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <section
                        className={`${styles.flexCenter} ${styles.marginY} !mb-0 ${styles.padding}sm:flex-row flex-col bg-black-gradient-3 rounded-[20px] box-shadow mx-10`}
                    >
                        <div className="flex-1 flex flex-col w-full">
                            <div className="flex items-center justify-between w-full">
                                <div className="grow-[3] max-w-[75%]">
                                    <h1 className="flex-1 font-poppins font-semibold ss:text-[40px] text-[32px] text-white ss:leading-[50.8px] leading-[45px] capitalize">
                                        {prop.title}
                                    </h1>
                                    <p className="font-thin text-slate-200 mt-1 leading-5">
                                        {prop.description}
                                    </p>
                                    <p className="mt-3 text-gray-500">
                                        Date: {getDateStandard(dateTime)}
                                    </p>
                                </div>
                                <div className="flex flex-1 justify-center items-end flex-col">
                                    <p className="mr-6">
                                        Price: {prop.stringFlowRate} Matic/Hour
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => joinMeeting(prop)}
                                        className={`py-4 mt-2 px-12 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
                                    >
                                        Launch Meeting
                                    </button>
                                    {/* <button
                                        disabled={joinLobby.isCallable}
                                        onClick={() =>
                                            joinLobby(prop.meetingId)
                                        }
                                        className={`py-4 mt-2 px-12 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
                                    >
                                        
                                        Join Lobby
                                    </button> */}
                                    {/* <TestJoinMeeting
                                        host={prop.host}
                                        title={prop.title}
                                        description={prop.description}
                                        time={prop.time}
                                        meetingId={prop.meetingId}
                                        flowRate={prop.flowRate}
                                        stringFlowRate={prop.stringFlowRate}
                                        gigId={prop.gigId}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primary w-full overflow-hidden min-h-screen">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            <div className={`bg-primary ${styles.flexStart} mt-5 text-center`}>
                <div className={`${styles.boxWidth}`}>
                    <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
                        Purchases<span className="text-gradient"></span>{" "}
                    </h1>
                </div>
            </div>
            <div>
                {/* <button onClick={startFlow}>start flow</button>
            <button onClick={stopFlow}>stop flow</button>
            <button onClick={getFlowInfo}>Get info</button> */}
                <div className="flex">
                    <div className="pb-20 flex-1">
                        {gigs.map((item, i) => (
                            <Card
                                key={i}
                                host={item.host}
                                title={item.title}
                                description={item.description}
                                time={item.time}
                                meetingId={item.meetingId}
                                flowRate={item.flowRate}
                                stringFlowRate={item.stringFlowRate}
                                gigId={item.gigId}
                            />
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        {/* <div className="w-96 h-auto mt-5 mb-5 rounded-lg bg-black-gradient-3 text-white"> */}
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            className="w-96 h-auto p-8 rounded-lg bg-black-gradient-3 text-black"
                        ></video>
                        {/* <div className="w-96 h-96 bg-white text-black"> */}
                        <div className=" w-96 h-auto mt-5 mb-5 rounded-lg bg-black-gradient-3 text-white ">
                            {
                                peerIds.map((peer) => (
                                    <>
                                        {/* role: {peer.role} */}
                                        <Video
                                            key={peer}
                                            peerId={peer}
                                            // track={peer.cam}
                                            debug
                                            className="h-full w-full"
                                        />
                                    </>
                                ))}
                            {
                                peerIds.map((peer) => (
                                    <Audio
                                        key={peer}
                                        peerId={peer}
                                        track={peer}
                                    />
                                ))}
                        </div>

                        {/* ----------- */}

                        <div className="flex gap-2">
                            {/* Webcam */} 
        <button 
          onClick={() => {
            isVideoOn ? disableVideo() : enableVideo()
          }}>
          Fetch and Produce Video Stream
        </button>
 
        {/* Mic */} 
       <button 
          onClick={() => {
            isAudioOn ? disableAudio() : enableAudio();
          }}>
          Fetch and Produce Audio Stream
        </button>
 
        {/* Screen Share */}
        <button 
          onClick={() => {
            shareStream ? stopScreenShare() : startScreenShare();
          }}>
          Fetch and Produce Screen Share Stream
        </button>
                        </div>

                        {/* ----------- */}

                        <div className="flex gap-2">
                            <button
                                disabled={!joinRoom.isCallable}
                                onClick={joinRoom}
                            >
                                Join
                            </button>

                            <button onClick={produceHardware}>Stream</button>
                        </div>
                        <button onClick={endMeeting}>End Meeting</button>
                    </div>
                </div>
            </div>
        </div>
    );
}