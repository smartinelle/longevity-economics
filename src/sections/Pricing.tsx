import CheckIcon from "@/assets/check.svg";
import {twMerge} from "tailwind-merge";

const pricingTiers = [
  {
    id: 'strategic',
    title: "Strategic Planning",
    description: "For organizations seeking strategic guidance on longevity projects",
    buttonText: "Schedule Consultation",
    popular: false,
    inverse: false,
    features: [
      "In-depth economic analysis reports",
      "Implementation frameworks",
      "Project feasibility studies",
      "Quarterly strategic reviews",
      "Direct access to senior advisors"
    ],
    engagementType: "Annual Engagement"
  },
  {
    id: 'research',
    title: "Research & Analytics",
    description: "Comprehensive research and data analysis for evidence-based decisions",
    buttonText: "Request Proposal",
    popular: true,
    inverse: true,
    features: [
      "Custom economic modeling",
      "Stakeholder surveys & interviews",
      "Market analysis reports",
      "Data integration services",
      "Quarterly trend analysis"
    ],
    engagementType: "Project-Based"
  },
  {
    id: 'foresight',
    title: "Foresight & Advocacy",
    description: "Educational and advocacy solutions for broader impact",
    buttonText: "Learn More",
    popular: false,
    inverse: false,
    features: [
      "Educational content development",
      "Interactive web applications",
      "Event speaking engagements",
      "Partnership development",
      "Social media strategy"
    ],
    engagementType: "Flexible Terms"
  }
];

export const Pricing = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container">
        <div className="section-heading"> 
          <h2 className="section-title"> 
            Services
          </h2>
          <p className="section-description mt-5">
            Expert consulting services for advancing large-scale longevity projects and research initiatives.
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(({
            id,
            title, 
            monthlyPrice, 
            buttonText, 
            popular, 
            inverse, 
            features,
          }) => (
            <div key={id} className={twMerge("card", inverse === true && 'border-black bg-black text-white')}>
              <div className="flex justify-between">
                <h3 className={twMerge("text-lg font-bold text-black/50", inverse === true && "text-white/60")}>
                  {title}
                </h3>
              </div>
              {/*<button className={twMerge("btn btn-primary w-full mt-[30px]", inverse === true && "bg-white text-black")}>{buttonText}</button>*/}
              <ul className="flex flex-col gap-5 mt-8">
                {features.map((feature, index) => (
                  <li key={`${id}-feature-${index}`} className="text-sm flex items-center gap-4">
                    <CheckIcon className="h-6 w-6"/>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};