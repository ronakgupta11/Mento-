"use client"
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
} from "@chakra-ui/react";

import { Heading } from "@chakra-ui/react";

export default function Publish() {
    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        startTime: "",
        stringFlowRate: "",
    });

    console.log(formInput);

    // async function publish() {
    //     const meetingId = await createMeeting();

    //     // const amountInWei = ethers.BigNumber.from(formInput.flowrate);
    //     // const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
    //     // const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
    //     const calculatedFlowRate = 385802469135802;

    //     if (
    //         (!formInput.title,
    //         !formInput.description,
    //         !formInput.time,
    //         !meetingId,
    //         !formInput.stringFlowRate)
    //     )
    //         return;

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

    // async function createMeeting() {
    //   const response = await fetch(`http://localhost:3000/api/create-room`);
    //   const resJson = await response.json();
    //   const meetingId = resJson.data.roomId;
    //   return meetingId;
    // }

    // async function debug() {
    //   const roomId = await createMeeting()
    //     console.log(roomId);
    // }

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
                        Host your{" "}
                        <span className="text-gradient">First Lecture</span>{" "}
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
                                        <FormLabel fontSize={20} mb={1}>
                                            Title
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            w="100%"
                                            borderRadius={8}
                                            py={2}
                                            px={2}
                                            color={"black"}
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
                                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Description</FormLabel>
                                        <Input
                                            type="text"
                                            w="100%"
                                            borderRadius={8}
                                            py={2}
                                            px={2}
                                            color={"black"}
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
                                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                    </FormControl>
                                    <div className="flex gap-5">
                                        <FormControl className="flex-1">
                                            <FormLabel>Meeting Time</FormLabel>
                                            <Input
                                                type="datetime-local"
                                                w="100%"
                                                borderRadius={8}
                                                py={2}
                                                px={2}
                                                color={"black"}
                                                name="startTime"
                                                placeholder="Meeting Time"
                                                required
                                                value={formInput.startTime}
                                                onChange={(e) =>
                                                    setFormInput({
                                                        ...formInput,
                                                        startTime:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                        </FormControl>
                                        <FormControl className="flex-1">
                                            <FormLabel>
                                                Flow Rate(matic/hour)
                                            </FormLabel>
                                            <NumberInput
                                                value={formInput.stringFlowRate}
                                                onChange={(rate) =>
                                                    setFormInput({
                                                        ...formInput,
                                                        stringFlowRate: rate,
                                                    })
                                                }
                                            >
                                                <NumberInputField
                                                    w="100%"
                                                    borderRadius={8}
                                                    py={2}
                                                    px={2}
                                                    color={"black"}
                                                    name="flowrate"
                                                    placeholder="matic/hour"
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
                                    onClick={()=>console.log("publish")}
                                    className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
                                >
                                    Host Class
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}