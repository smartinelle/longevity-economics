import calculatorScreenshot from '@/assets/calculator-screenshot.png';
import designer5Image from '@/assets/designer_5.png';
import tubeImage from '@/assets/tube.png';
import Image from 'next/image';
import Link from 'next/link';

export const ProductShowcase = () => {
  return (
  <section id="calculator-presentation" className='bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip'>
    <div className="container">
      <div className="section-heading">
      <div className='flex justify-center'>
        <div className='tag'>A new era of progress</div>
      </div>
      <h2 className='section-title mt-5'>
        Discover the benefits of longevity
        </h2>
      <p className='section-description mt-5'>
        Deep dive into the latest macroeconomics research on healthy lifespan extension.
        </p>
      </div>
        <div className='relative'>
        <a href="/calculator" className="flex justify-center mt-10">
        <Image 
        src={calculatorScreenshot} 
        alt="Product Image"
        className="border border-[#222222]/10 [mask-image:linear-gradient(to_bottom_right,transparent,black_25%,black_75%,transparent)]" 
        />
        </a>
         <Image 
        src={designer5Image} 
        alt="Designer 5 Image"
        height={280}
        width={280}
        className="hidden md:block absolute -right-44 -top-32" 
        />
        <Image 
        src={tubeImage}
        alt="Tube Image"
        height={248}
        className="hidden md:block absolute bottom-24 -left-36"
        />  
        </div> 
      </div>
  </section>
  );
};
