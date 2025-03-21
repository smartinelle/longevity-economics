'use client'

import { usePathname, useRouter } from 'next/navigation';
import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/logosaas.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import Link from "next/link";

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  
  const handleNavigation = async (e: React.MouseEvent<HTMLAnchorElement>, path: string, id: string) => {
    e.preventDefault();
    
    // If we're already on home page, just scroll
    if (pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on different page, navigate home first then scroll
      router.push('/');
      // Add a small delay to ensure the page is loaded
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      {isHomePage && (
        <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
          <p className="text-white/60 hidden md:block">Evaluate the economic benefits of lifespan extension</p>
          <div className="inline-flex gap-1 items-center">
            <Link href="/calculator">
              <p>Try our calculator</p>
            </Link>
            <ArrowRight className="w-4 h-4 inline-flex justify-center items-center" />
          </div>
        </div>
      )}
      
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image src={Logo} alt="Saas logo" width={55} height={55} />
            </Link>
            <MenuIcon className="w-5 h-5 md:hidden" />
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="/about" onClick={(e) => handleNavigation(e, '/about', 'about')}>
                About
              </a>
              <a href="/services" onClick={(e) => handleNavigation(e, '/services', 'services')}>
                Services
              </a>
              <a href="/calculator-presentation" onClick={(e) => handleNavigation(e, '/calculator-presentation', 'calculator-presentation')}>
                Calculator
              </a>
              <a href="/team" onClick={(e) => handleNavigation(e, '/team', 'team')}>
                Team
              </a>
              <Link href="/team" onClick={(e) => handleNavigation(e, '/team', 'team')}>
                <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
                  Contact
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};