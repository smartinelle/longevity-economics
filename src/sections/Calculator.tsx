'use client'

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import ImageGenerator from '@/components/image-generator';
import Flag from 'react-flagpack';
import socialWtpData from '@/assets/data/social_wtp.json';

// TypeScript interfaces
interface CountryData {
  code: string;
  life_expectancy: number;
  hle: number;
  VSL: number;
  population: number;
  gdp_pc: number;
  additional_years: {
    [key: number]: {
      wtp_current: number;
      wtp_unborn: number;
      wtp_avg: number;
    };
  };
}

interface DataType {
  [country: string]: CountryData;
}

interface DetailSectionProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

interface CountrySelectorProps {
  countries: string[];
  onSelect: (country: string) => void;
  explored: string[];
  data: DataType;
}

interface WTPCalculatorProps {
  country: string;
  data: DataType;
  onBack: () => void;
}

const DetailSection: React.FC<DetailSectionProps> = ({ title, content, isOpen, onToggle }) => (
  <div className="border-b border-slate-700">
    <button
      onClick={onToggle}
      className="w-full py-4 flex justify-between items-center hover:border-2 border border-transparent transition-none"
    >
      <span className="font-medium text-slate-800">{title}</span>
      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </button>
    {isOpen && (
      <div className="py-4 text-slate-800">
        {content}
      </div>
    )}
  </div>
);

const CountrySelector: React.FC<CountrySelectorProps> = ({ countries, onSelect, explored, data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {countries.map(country => {
        const countryData = data[country];
        const countryCode = countryData?.code;

        return (
          <button
            key={country}
            onClick={() => onSelect(country)}
            className="group relative p-6 rounded-lg transition-none duration-300 border-2 border-slate-700 hover:border-4"
          >
            <div className="text-left space-y-2">
              <div className="flex items-center justify-start space-x-2">
                <h3 className="text-xl font-semibold">{country}</h3>
                {countryCode && (
                  <Flag
                    code={countryCode}
                    size="S"
                    gradient="real-linear"
                    hasBorder={false}
                    hasDropShadow
                    className='hidden md:block'
                  />
                )}
              </div>
              <p className="text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to explore impact
              </p>
              {explored.includes(country) && (
                <span className="absolute top-2 right-2 text-blue-800 text-sm">Viewed</span>
              )}
            </div>
            <ArrowRight className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        );
      })}
    </div>
  );
};

const WTPCalculator: React.FC<WTPCalculatorProps> = ({ country, data, onBack }) => {
  const [years, setYears] = useState<number>(5);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const countryData = data[country];
  const selectedData = countryData.additional_years[years];
  const totalWTP = selectedData.wtp_current + selectedData.wtp_unborn;
  
  const totalGDP = countryData.population * 1000000 * countryData.gdp_pc;
  const wtpAsPercentOfGDP = (totalWTP * 1000000000000 / totalGDP);
  const perCapitaWTP = selectedData.wtp_avg;
  const vsl = countryData.VSL;
  const hle = countryData.hle;
  const lifeExpectancy = countryData.life_expectancy;
  const countryCode = countryData.code;

  return (
    <div className="max-w-4xl mx-auto space-y-2">
      <button 
        onClick={onBack}
        className="text-slate-700 tracking-tight hover:font-bold transition-colors"
      >
        ← Explore other countries
      </button>

      <div className="flex justify-between space-y-2 space-x-4 py-4">
        <h2 className="text-4xl font-bold inline-block border-b-2 border-blue-500 pb-2">
          {country}
        </h2>
        <span> 
          <Flag
            code={countryCode}
            size="L"
            gradient="real-linear"
            hasBorderRadius
            hasDropShadow
            className='hidden md:block'
          />
        </span>
      </div>

      <div>
        <span className="inline-flex text-3xl tracking-tight text-slate-800">
          Economic Value Unlocked by 
        </span>
        <span className="inline-flex px-2"> 
          <Select value={years.toString()} onValueChange={(value) => setYears(parseInt(value))}>
            <SelectTrigger className="text-3xl text-slate-800 bg-transparent px-1 py-3 transition-colors justify-between w-[60px]">
              <SelectValue>{years}</SelectValue>
            </SelectTrigger>
            <SelectContent className="border-slate-700 bg-white">
              {[1,2,3,4,5,6,7,8,9,10].map((value) => (
                <SelectItem 
                  key={value} 
                  value={value.toString()}
                  className="cursor-pointer"
                >
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </span>
        <span className="text-3xl tracking-tight text-slate-800">
          Additional Year{years > 1 ? 's' : ''} of Healthy Life Expectancy.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 space-y-10">
        <div className="flex flex-col items-left space-y-2 text-left">
          <div className="space-x-2">
            <span className="inline-flex text-8xl font-bold figure-mainColor">
              ${totalWTP.toFixed(1)}T
            </span>
            <span className="figure-unit">
              in Total 
            </span>
          </div>

          <div className="space-x-2 flex flex-col md:flex-row md:items-end">
          <div>
            <span className="text-6xl font-bold figure-warningColor">
              = {wtpAsPercentOfGDP.toFixed(1)}x 
            </span>
            </div>
            <div className='mb-[2px]'>
            <span className="figure-unit">
              Annual GDP 
            </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-left space-y-2 text-right">
          <div className="space-x-2">
            <span className="text-8xl font-bold figure-mainColor">
              ${Math.round(perCapitaWTP).toLocaleString()}k
            </span>
          </div>
          <div>
          <span className="figure-unit">
              per capita 
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <ImageGenerator 
          country={country}
          countryCode={countryCode}
          years={years}
          data={countryData}
          totalWTP={totalWTP}
          wtpAsPercentOfGDP={wtpAsPercentOfGDP}
          perCapitaWTP={perCapitaWTP}
        />
      </div>

      <div className="space-y-2">
        <DetailSection
          title="Methodology"
          content={
            <div className="space-y-2">
              <p className='text-justify'>The Value of Statistical Life (VSL) methodology by Scott et al. (2023) quantifies society&apos;s willingness to pay for reduced mortality risks. {country} had a VSL of ${vsl}M in 2020 given its economic and health metrics. A key distinction is between total life expectancy ({lifeExpectancy} years) and healthy life expectancy ({hle} years). The economic value combines benefits to current population (${selectedData.wtp_current}T) and future generations (${selectedData.wtp_unborn}T).</p>
              <p className="text-xs text-slate-500">Scott, Andrew, et al. &quot;International gains to achieving healthy longevity.&quot; <i> Cold Spring Harbor Perspectives in Medicine </i> 13.2 (2022).</p>
            </div>
          }
          isOpen={openSection === 'methodology'}
          onToggle={() => setOpenSection(openSection === 'methodology' ? null : 'methodology')}
        />
      </div>
    </div>
  );
};

const Calculator: React.FC = () => {
  const [data] = useState<DataType>(socialWtpData as DataType);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [exploredCountries, setExploredCountries] = useState<string[]>([]);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    if (!exploredCountries.includes(country)) {
      setExploredCountries([...exploredCountries, country]);
    }
    // Scroll to top of page smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Add console.log to debug data
  console.log('Data loaded:', data);
  console.log('Available countries:', Object.keys(data));

  return (
    <section className="min-h-screen bg-white text-black p-12 overflow-x-clip">
      {!selectedCountry ? (
        <div className="space-y-12">
          <div className="text-center space-y-6 mb-16">
            <h1 className="section-title">
              Economic Value of Longevity
            </h1>
            <p className="section-description">
              Select a country to explore the impact of extending human lifespan
            </p>
          </div>
          <CountrySelector 
            countries={Object.keys(data)} 
            onSelect={handleCountrySelect}
            explored={exploredCountries}
            data={data}
          />
        </div>
      ) : (
        <WTPCalculator 
          country={selectedCountry} 
          data={data}
          onBack={() => setSelectedCountry(null)}
        />
      )}
    </section>
  );
};

export default Calculator;