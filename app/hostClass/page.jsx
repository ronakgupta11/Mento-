"use client";
import { useState } from "react";
import { address, abi } from "../../constants";
import styles from "../../styles/style";
import { Navbar } from "../../components";
import { Input, Stack } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
} from "@chakra-ui/react";
import { useWriteContract,useWaitForTransactionReceipt } from "wagmi";

export default function Publish() {
    const { 
        data: hash,
        error,
        isPending, 
        writeContract 
      } = useWriteContract() 
    

    
      const { isLoading: isConfirming, isSuccess: isConfirmed } = 
        useWaitForTransactionReceipt({ 
          hash, 
        }) 

        

    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        banner: "",
        time: "",
        price: "",
        paymentToken: "0x0000000000000000000000000000000000000000",
    });

    async function submit(e) { 
        if (
            (!formInput.title,
            !formInput.description,
            !formInput.time,
            !formInput.price)
        )
            return;
        // const meetingId = await createMeeting();
        const meetingId = "aml-buiz-caa"
        
            
            writeContract({
              address: address,
              abi,
              functionName: 'createGig',
              args: [formInput.title,
                formInput.description,
                formInput.time,
                meetingId,
                formInput.price,
                formInput.banner,
                formInput.paymentToken,],
            })
            setFormInput({
                title: "",
                description: "",
                banner: "",
                time: "",
                price: "",
                paymentToken: "0x0000000000000000000000000000000000000000",
            })
          } 

//     async function publish() {


//     // const amountInWei = ethers.BigNumber.from(formInput.flowrate);
//     // const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
//     // const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
//     const calculatedFlowRate = 385802469135802;



//     const modal = new web3modal({
//         network: "mumbai",
//         cacheProvider: true,
//     });
//     const connection = await modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(address, abi, signer);
//     const parseStringFlowRate = ethers.utils.parseEther(
//         formInput.stringFlowRate
//     );
//     const publish = await contract.createGig(
//         formInput.title,
//         formInput.description,
//         formInput.startTime,
//         meetingId,
//         calculatedFlowRate,
//         parseStringFlowRate,
//         {
//             gasLimit: 1000000,
//         }
//     );
//     await publish.wait();

//     console.log("published");
// }

async function createMeeting() {
  const response = await fetch(`http://localhost:3000/api/create-room`);
  const resJson = await response.json();
  const meetingId = resJson.data.roomId;
  return meetingId;
}



    return (
        <div className="bg-primary w-full overflow-hidden min-h-screen">
            {/* <button onClick={debug}>debug</button> */}
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            <div className={`bg-primary ${styles.flexStart} mt-5 text-center`}>
                <div className={`${styles.boxWidth}`}>
                    <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
                        Host your First{" "}
                        <span className="text-gradient">Mentorship Class</span>{" "}
                    </h1>
                </div>
            </div>

            <div className={`bg-primary ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <section
                        className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow mx-20`}
                    >
                        <div className="flex-1 flex flex-col">
                            <h2 className={styles.heading2}>
                                Fill the given details.
                            </h2>
                            <div>
                                <Stack gap={2}>
                                    <FormControl>
                                        <FormLabel fontSize={20} mb={1} color="white">
                                            Title
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            w="100%"
                                            borderRadius={8}
                                            py={2}
                                            px={2}
                                            color={"white"}
                                            name="title"
                                            placeholder="Title"
                                            required
                                            value={formInput.title}
                                            onChange={(e) =>
                                                setFormInput({
                                                    ...formInput,
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel color="white">Description</FormLabel>
                                        <Input
                                            type="text"
                                            w="100%"
                                            borderRadius={8}
                                            py={2}
                                            px={2}
                                            color={"white"}
                                            name="description"
                                            placeholder="Description"
                                            required
                                            onChange={(e) =>
                                                setFormInput({
                                                    ...formInput,
                                                    description: e.target.value,
                                                })
                                            }
                                            value={formInput.description}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel color="white">Banner</FormLabel>
                                        <Input
                                            type="text"
                                            w="100%"
                                            borderRadius={8}
                                            py={2}
                                            px={2}
                                            color={"white"}
                                            name="banner"
                                            placeholder="Banner URI"
                                            required
                                            onChange={(e) =>
                                                setFormInput({
                                                    ...formInput,
                                                    banner: e.target.value,
                                                })
                                            }
                                            value={formInput.banner}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel color="white">Payment Token</FormLabel>
                                        <Select
                                            w="100%"
                                            borderRadius={8}
                                            py={2}
                                            px={2}
                                            color={"white"}
                                            name="paymentToken"
                                            placeholder="Select Payment Token"
                                            required
                                            onChange={(e) =>
                                                setFormInput({
                                                    ...formInput,
                                                    paymentToken: e.target.value,
                                                })
                                            }
                                            value={formInput.paymentToken}
                                        >
                                            <option value="0x0000000000000000000000000000000000000000">ETH</option>
                                            <option value="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48">USDC</option>
                                            <option value="0xdAC17F958D2ee523a2206206994597C13D831ec7">USDT</option>
                                            <option value="0xB8c77482e45F1F44dE1745F52C74426C631bDD52">BNB</option>
                                            <option value="0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984">UNI</option>
                                            <option value="0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4">NEAR</option>
                                            <option value="0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0">MATIC</option>
                                            <option value="0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1">ARB</option>
                                        </Select>
                                    </FormControl>
                                    <div className="flex gap-5">
                                        <FormControl className="flex-1">
                                            <FormLabel color="white">Meeting Time</FormLabel>
                                            <Input
                                                type="datetime-local"
                                                w="100%"
                                                borderRadius={8}
                                                py={2}
                                                px={2}
                                                color={"white"}
                                                name="time"
                                                placeholder="Meeting Time"
                                                required
                                                value={formInput.time}
                                                onChange={(e) =>
                                                    setFormInput({
                                                        ...formInput,
                                                        time: e.target.value,
                                                    })
                                                }
                                            />
                                        </FormControl>
                                        <FormControl className="flex-1">
                                            <FormLabel color="white">
                                                Price
                                            </FormLabel>
                                            <NumberInput
                                                value={formInput.price}
                                                onChange={(rate) =>
                                                    setFormInput({
                                                        ...formInput,
                                                        price: rate,
                                                    })
                                                }
                                            >
                                                <NumberInputField
                                                    w="100%"
                                                    borderRadius={8}
                                                    py={2}
                                                    px={2}
                                                    color={"white"}
                                                    name="price"
                                                    placeholder="Price"
                                                    required
                                                />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>
                                    </div>
                                </Stack>
                            </div>
                            <div className={`mt-8`}>
                            
                                <button 
                                type="button"
                                onClick={() => submit()}
                                className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
        disabled={isPending} 
        
      >
        {isPending ? 'Confirming...' : 'Host Class'} 
      </button>
      {hash && <div className="text-white">Transaction Hash: {hash}</div>}
      {isConfirming && <div className="text-white">Waiting for confirmation...</div>} 
      {isConfirmed && <div className="text-white">Transaction confirmed.</div>} 
      {error && (
        <div>Error: {(error).shortMessage || error.message}</div>
      )}

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
