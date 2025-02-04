import alexey from "@/assets/team/alexey.jpg";
import sacha from "@/assets/team/sacha.jpeg";
import stephan from "@/assets/team/stephan.jpeg";
import SocialLinkedIn from "@/assets/social-linkedin.svg";

import Image from "next/image";
import {twMerge} from "tailwind-merge";

const testimonials = [
  {
    id: 'alexey',
    name: "Alexey Strygin",
    title: "Co-Founder", 
    bio: "Serial biotech entrepreneur with extensive experience in longevity and drug discovery. Proven track record of bringing scientific innovations to market.",
    imageSrc: alexey.src,
    username: "CEO",
    linkedIn: "https://www.linkedin.com/in/strygin/",
  },
  {
    id: 'sacha',
    name: "Sacha Martinelle",
    title: "",
    bio: "Economist and data scientist bridging research and technology. Expert in quantitative analysis and product development with a background in healthcare.",
    imageSrc: sacha.src,
    username: "CTO",
    linkedIn: "https://www.linkedin.com/in/sacha-martinelle-32b884220/",
  },
  {
    id: 'stephan',
    name: "Stephan Hähne",
    title: "",
    bio: "Mathematical mind specializing in data science and algorithms. Passionate about advancing longevity research through quantitative approaches.",
    imageSrc: stephan.src,
    username: "CSO",
    linkedIn: "https://www.linkedin.com/in/stephanhaehne/",
  },
];

const firstColumn = testimonials.slice(0,3);

const TestimonialsColumn = (props: {
  className?: string; 
  testimonials: typeof testimonials
}) => (
    <div className="flex flex-col md:flex-row gap-6 mt-10">
      {props.testimonials.map(({ id, bio, imageSrc, name, username, linkedIn, website }) => (
        <div key={id} className="card">
          <div className="flex items-center gap-2 mt-5"> 
            <Image 
              src={imageSrc} 
              alt={name} 
              width={40}
              height={40}
              className="h-10 w-10 rounded-full" 
            />
            <div className="flex flex-col">
              <div className="font-medium tracking-tight leading-5">{name}</div>
              <div className="leading-5 tracking-tight">{username}</div>
            </div>
          </div>
          <div className="mt-5">{bio}</div>
          <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="flex justify-center mt-5">
            <SocialLinkedIn 
              className="hover:opacity-80 transition-opacity" 
            />
          </a>
        </div>
      ))}
    </div>
);

export const Testimonials = () => {
  return (
    <section id="team" className="bg-white py-24">
      <div className="container">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">Our Team</div>
          </div>
          <h2 className="section-title mt-5">Who we are</h2>
          <p className="section-description mt-5"> 
            A team of seasoned biotech pioneers, quantitative analysts, and technology specialists building the foundations for large-scale longevity investments.
          </p>
        </div>
        <div className="flex justify-center gap-6">
          <TestimonialsColumn testimonials={firstColumn} />
        </div>
      </div>
    </section>
  );
};