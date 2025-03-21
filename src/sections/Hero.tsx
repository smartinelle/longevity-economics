'use client'

import ArrowIcon from '@/assets/arrow-right.svg';
import pyramidImage from '@/assets/pyramid.png';
import Image from 'next/image';
import designer3Image from '@/assets/designer_3.png';
import noodleImage from '@/assets/noodle.png';
import {motion, useScroll, useTransform, useMotionValueEvent} from 'framer-motion'
import Link from "next/link";
import { useRef } from "react";

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0,1], [150, -150]); 

  return (
    <section id="about" className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip">
      <div className="container">
        <div className="md:flex items-center">
          <div className='md:w-[478px]'>
            {/* <div className="tag"> 
            Version 2.0 is here
              </div> */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              Future-Proof Economics 
              </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
               We provide decision makers and investors with deep expertise in the longevity industry, and help you set up your next longevity project.   </p>
            <div className="flex gap-1 items-center mt-[30px]">
            <Link href="/calculator">
              <button className="btn btn-primary"> Try our calculator</button>
              </Link>
              <a href="#team">
              <button className="btn btn-text gap-1"> 
                <span>Reach out</span>
                <ArrowIcon className="h-5 w-5" />
                </button>
              </a>
            </div>
          </div>
            <div className='mt-20 md:mt-0 md:h-[648px] md:flex-1 relative'>
              <motion.img
              src={designer3Image.src} 
              alt="Designer 3 Image" 
              className='md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0'
              animate={{
                translateY: [-30,30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
              />
              <motion.img
              src={pyramidImage.src} 
              alt="Pyramid Image" 
              width={180}
              className='hidden md:block -top-24 -left-28 md:absolute'
              style={{
                translateY: translateY,
              }}
              />
              <motion.img 
              src={noodleImage.src} 
              alt="Noodle Image" 
              width={220}
              className='hidden absolute lg:block top-[470px] left-[448px] rotate-[30deg]'
              style={{
                rotate: 30,
                translateY: translateY,
              }}
              />
            </div>
        </div>
      </div>
    </section>
  );
};
