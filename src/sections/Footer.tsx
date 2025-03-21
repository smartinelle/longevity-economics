import logo from "@/assets/logosaas.png";
import Image from "next/image";
import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedIn from "@/assets/social-linkedin.svg";
import SocialPin from "@/assets/social-pin.svg";
import SocialYoutube from "@/assets/social-youtube.svg";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-0 before:bottom-0 before:w-full before:blur before:bg-slate-100 before:absolute">
        <Image 
        src={logo}
        height={50}
        alt="SaaS Logo"
        className="relative"
        />
        </div>
        {/*<nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Customers</a>
          <a href="#">Pricing</a>
          <a href="#">Help</a>
          <a href="#">Careers</a>
        </nav>*/}
        <div className="flex justify-center items-center gap-6 mt-6">
          <a href="https://x.com/longeconinst" target="_blank" rel="noopener noreferrer" className="pt-1">
          <SocialX />
          </a>
          <a href="https://www.linkedin.com/company/longecon/" target="_blank" rel="noopener noreferrer">
          <SocialLinkedIn />
          </a>
        </div>
        <p className="mt-6">
          &copy; 2025 Longevity Economics Institute, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};
