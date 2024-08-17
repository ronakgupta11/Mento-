"use client";
import { useState, useEffect, useRef } from "react";
import { useReadContract, useAccount } from "wagmi";
import { address as contractAddress, abi } from "../../constants";
import styles from "../../styles/style";
import { Navbar } from "../../components";
import { 
    useHuddle01, 
    useRemoteAudio,
    useRemoteVideo,
    useRemoteScreenShare,
    useRoom, 
    useLocalVideo, 
    useLocalAudio, 
    useLocalScreenShare, 
    useLobby, 
    usePeerIds, 
    
} from "@huddle01/react/hooks";
import { sepolia } from "viem/chains";
import { Audio, Video } from "@huddle01/react/components";

export default function MyClasses() {
    const { initialize, isInitialized } = useHuddle01();
    const { joinLobby } = useLobby();
    const { stream: localVideoStream, enableVideo, disableVideo, isVideoOn } = useLocalVideo();
    const { stream: localAudioStream, enableAudio, disableAudio, isAudioOn } = useLocalAudio();
    const { startScreenShare, stopScreenShare, shareStream } = useLocalScreenShare();
    const { joinRoom, leaveRoom } = useRoom();
    const [gigs, setGigs] = useState([]);

    const { address } = useAccount();
    const { isPending, data, error } = useReadContract({
        abi: abi,
        address: contractAddress,
        functionName: 'myClasses',
        args: [address],
        chainId: sepolia.id,
    });

    useEffect(() => {
        if (data) {
            const gigsData = data.map((i) => ({
                host: i.host,
                title: i.title,
                description: i.description,
                time: i.time,
                meetingId: i.meetingId,
                price: i.price,
                gigId: i.gigId,
                nftTokenId: i.nftTokenId,
                attendees: i.attendees,
                banner: i.banner,
                paymentToken: i.paymentToken,
            }));
            setGigs(gigsData);
        }
    }, [data]);

    const videoRef = useRef();
    const { peerIds } = usePeerIds();

    // useEventListener("lobby:cam-on", () => {
    //     if (localVideoStream && videoRef.current)
    //         videoRef.current.srcObject = localVideoStream;
    // });
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
    async function joinMeeting(gig) {
        joinLobby(gig.meetingId);
        // Start payment flow, assuming startFlow is a defined function
        await startFlow(gig.host, gig.flowRate);
    }

    async function endMeeting(gig) {
        if (leaveRoom.isCallable) {
            leaveRoom();
        }
        // Stop payment flow, assuming stopFlow is a defined function
        await stopFlow(gig.host);
        // Stop any hardware stream
        stopHardware();
    }

    function stopHardware() {
        if (localVideoStream) disableVideo();
        if (localAudioStream) disableAudio();
        if (shareStream) stopScreenShare();
    }

    function Card({ gig }) {
        const add0 = (t) => (t < 10 ? `0${t}` : String(t));
        const getDateStandard = (dt) => {
            const y = dt.getFullYear();
            const m = add0(dt.getMonth() + 1);
            const d = add0(dt.getDate());
            const w = dt.toDateString().substring(0, 3);
            const h = add0(dt.getHours());
            const min = add0(dt.getMinutes());
            return `${d}-${m}-${y} ${w} ${h}:${min}`;
        };
        const dateTime = new Date(gig.time);
        return (
            <div className={`bg-primary ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <section
                        className={`${styles.flexCenter} ${styles.marginY} !mb-0 ${styles.padding} sm:flex-row flex-col bg-black-gradient-3 rounded-[20px] box-shadow mx-10`}
                    >
                        <div className="flex-1 flex flex-col w-full">
                            <div className="flex items-center justify-between w-full">
                                <div className="grow-[3] max-w-[75%]">
                                    <h1 className="flex-1 font-poppins font-semibold ss:text-[40px] text-[32px] text-white ss:leading-[50.8px] leading-[45px] capitalize">
                                        {gig.title}
                                    </h1>
                                    <p className="font-thin text-slate-200 mt-1 leading-5">
                                        {gig.description}
                                    </p>
                                    <p className="mt-3 text-gray-500">
                                        Date: {getDateStandard(dateTime)}
                                    </p>
                                </div>
                                <div className="flex flex-1 justify-center items-end flex-col">
                                    <p className="mr-6">
                                        Price: {gig.price} Matic/Hour
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => joinMeeting(gig)}
                                        className={`py-4 mt-2 px-12 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
                                    >
                                        Launch Meeting
                                    </button>
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
                <div className="flex">
                    {isPending && <div>Loading...</div>}
                    <div className="flex-1 pb-20">
                        {gigs.map((gig, i) => (
                            <Card key={i} gig={gig} />
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            className="w-96 h-auto p-8 rounded-lg bg-black-gradient-3 text-black"
                        ></video>
                        <div className="w-96 h-auto mt-5 mb-5 rounded-lg bg-black-gradient-3 text-white">
                            {peerIds.map((peerId) => (
                                <Video
                                    key={peerId}
                                    peerId={peerId}
                                    className="h-full w-full"
                                />
                            ))}
                            {peerIds.map((peerId) => (
                                <Audio
                                    key={peerId}
                                    peerId={peerId}
                                />
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => isVideoOn ? disableVideo() : enableVideo()}
                            >
                                {isVideoOn ? "Stop Video" : "Start Video"}
                            </button>
                            <button 
                                onClick={() => isAudioOn ? disableAudio() : enableAudio()}
                            >
                                {isAudioOn ? "Stop Audio" : "Start Audio"}
                            </button>
                            <button 
                                onClick={() => shareStream ? stopScreenShare() : startScreenShare()}
                            >
                                {shareStream ? "Stop Screen Share" : "Start Screen Share"}
                            </button>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                disabled={!joinRoom.isCallable}
                                onClick={joinRoom}
                            >
                                Join Room
                            </button>
                            <button onClick={produceHardware}>Stream</button>
                        </div>
                        <button className="mt-4" onClick={endMeeting}>End Meeting</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
