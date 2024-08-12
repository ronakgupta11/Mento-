"use client"
import React from "react";
import { useRouter } from 'next/navigation';

const Button = ({ styles }) => {
  const router = useRouter();

  return (
  <button onClick={() => router.push('/gigs')} type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
    Get Started
  </button>
)
  };

export default Button;