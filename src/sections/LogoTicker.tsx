import acmeLogo from "@/assets/logo-acme.png";
import quantumLogo from "@/assets/logo-quantum.png";
import echologo from "@/assets/logo-echo.png";
import celestialLogo from "@/assets/logo-celestial.png";
import pulseLogo from "@/assets/logo-pulse.png";
import apexLogo from "@/assets/logo-apex.png";
import Image from "next/image";

export const LogoTicker = () => {
  return (
  <div className="py-8 md:py-12 bg-white">
      <div className="container">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
            <div className="flex gap-14 flex-none">
              <Image className="logo-ticker-image" src={acmeLogo} alt="Acme Logo" width={120} height={40} />
              <Image className="logo-ticker-image" src={quantumLogo} alt="Quantum Logo" width={120} height={40} />
              <Image className="logo-ticker-image" src={echologo} alt="Echo Logo" width={120} height={40} />
              <Image className="logo-ticker-image" src={celestialLogo} alt="Celestial Logo" width={120} height={40} />
              <Image className="logo-ticker-image" src={pulseLogo} alt="Pulse Logo" width={120} height={40} />
              <Image className="logo-ticker-image" src={apexLogo} alt="Apex Logo" width={120} height={40} />
            </div>
          </div>
        </div>
  </div>
  );
};
 