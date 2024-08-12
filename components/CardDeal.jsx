"use client"

import { card } from "../assets";
import styles, { layout } from "../styles/style";
import Button from "./Button";
import Image from "next/image";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Pay money in a stream <br className="sm:block hidden" /> in few easy
        steps.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        The money flows from your wallet to the lecturer&apos;s wallet without any hassle for the duration of the course

      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <Image src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;