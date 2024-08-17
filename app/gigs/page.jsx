"use client";
import { useEffect, useState } from "react";
import { address, abi } from "../../constants";
import styles from "../../styles/style";
import { Navbar } from "../../components";
import { useReadContract } from 'wagmi'
import { sepolia } from "viem/chains";
import { useWriteContract } from "wagmi";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const {writeContract} = useWriteContract()
  
  const { isPending, isError, data, error } = useReadContract({
    abi: abi,
    address: address,
    functionName: 'listGigs',
    chainId: sepolia.id,
  });

  useEffect(() => {
    if (data) {
      const gigsData = data.map((i) => {
        return {
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
        };
      });

      setGigs(gigsData);
      console.log(data)
    }
  }, [data]);

  function Card(prop) {
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

    const dateTime = new Date(parseInt(prop.time) * 1000);

    return (
        <div className={`bg-primary ${styles.flexStart} w-[70%] mx-auto mt-6 mb-6 px-[1.5rem]`}>
            <div className={`${styles.boxWidth} bg-white rounded-lg shadow-lg overflow-hidden`}>
                {/* Banner Image */}
                {prop.banner && (
                    <div className="h-56 w-[80%] bg-cover bg-center  mx-auto" style={{ backgroundImage: `url(${prop.banner})` }}>
                        
                    </div>
                )}
                <section className={`${styles.flexCenter} p-6 sm:flex-row flex-col`}>
                    <div className="flex-1 flex flex-col w-full">
                        <div className="flex items-center justify-between w-full">
                            <div className="grow-[3] max-w-[75%]">
                                <h1 className="font-poppins font-semibold ss:text-[40px] text-[32px] text-black ss:leading-[50.8px] leading-[45px] capitalize">
                                    {prop.title}
                                </h1>
                                <p className="font-thin text-slate-700 mt-1 leading-5">
                                    {prop.description}
                                </p>
                                <p className="mt-3 text-gray-500">
                                    Date: {getDateStandard(dateTime)}
                                </p>
                            </div>
                            <div className="flex flex-1 justify-center items-end flex-col">
                                <p className="text-center text-black">Price: {prop.price} Tokens</p>
                                <button
                                    type="button"
                                    onClick={() =>writeContract({ 
                                        abi,
                                        address,
                                        functionName: 'buy',
                                        args: [
                                          prop.id
                                        ],
                                        value:prop.price
                                     })}
                                    className={`py-4 mt-2 px-12 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}


  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
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
            Browse all Mentors <span className="text-gradient">on Mento</span>{" "}
          </h1>
        </div>
      </div>
      <div>
        <div className="pb-20">
          {gigs.map((gig, k) => (
            <Card

              key={k}
              id={k}
              host={gig.host}
              title={gig.title}
              description={gig.description}
              time={gig.time}
              meetingId={gig.meetingId}
              price={gig.price}
              nftTokenId={gig.nftTokenId}
              attendees={gig.attendees}
              banner = {gig.banner}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
