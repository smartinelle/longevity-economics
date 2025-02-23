'use client'

import React from 'react';

// Country code conversion mapping
const countryCodeMap: { [key: string]: string } = {
  'USA': 'us',
  'GBR': 'gb',
  'DEU': 'de',
  'FRA': 'fr',
  'ITA': 'it',
  'ESP': 'es',
  'JPN': 'jp',
  'CAN': 'ca',
  'AUS': 'au',
  'NLD': 'nl',
  'SWE': 'se',
  'NZL': 'nz',
  'ISR': 'il'
};


// Helper function to convert 3-letter to 2-letter code
const convertCountryCode = (code: string): string => {
  return countryCodeMap[code] || code.toLowerCase();
};

interface ImageGeneratorProps {
    country: string;
    countryCode: string;
    years: number;
    data: {
      life_expectancy: number;
      hle: number;
      VSL: number;
    };
    totalWTP: number;
    wtpAsPercentOfGDP: number;
    perCapitaWTP: number;
  }
  
  const ImageGenerator: React.FC<ImageGeneratorProps> = ({ 
    country, 
    countryCode, 
    years, 
    data, 
    totalWTP, 
    wtpAsPercentOfGDP, 
    perCapitaWTP 
  }) => {
    const transformedCountryCode = convertCountryCode(countryCode);
    const generateImage = async () => {
      const SCALE_FACTOR = 4;
      const BASE_WIDTH = 515;
      const BASE_HEIGHT = 390;
      const canvas = document.createElement('canvas');
      canvas.width = BASE_WIDTH * SCALE_FACTOR;
      canvas.height = BASE_HEIGHT * SCALE_FACTOR;
      const ctx = canvas.getContext('2d');
      
      try {
        const flag = new Image();
        flag.crossOrigin = 'anonymous'; // Add crossOrigin attribute
        await new Promise<void>((resolve, reject) => {
          flag.onload = () => resolve();
          flag.onerror = reject;
          flag.src = `/api/flags/${transformedCountryCode}`;
        });
        ctx.drawImage(flag, 30, 40, 45, 30);
      } catch (error) {
        console.error('Failed to load flag:', error);
      }

      if (!ctx) {
        console.error('Failed to get canvas context');
        return;
      }
  
      // Scale all drawing operations
      ctx.scale(SCALE_FACTOR, SCALE_FACTOR);
      
      // Background - changed to white
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);
      
      // Load and draw logo
      try {
        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        await new Promise<void>((resolve, reject) => {
          logo.onload = () => resolve();
          logo.onerror = (e) => {
            console.error('Logo load error:', e);
            reject(e);
          };
          // Update logo path to use the correct one from public directory
          logo.src = '/images/logo.png';
        });
        ctx.drawImage(logo, 440, 25, 45, 45);
      } catch (error) {
        console.error('Failed to load logo:', error);
      }
      
      // Colors - adjusted for white background
      const COLORS = {
        text: '#1e293b', // slate-800 for better contrast on white
        slate300: '#94a3b8',
        slate500: '#64748b',
        blue500: '#3b82f6',
        yellow500: '#eab308'
      };
      
      // Country name - moved down slightly
      ctx.font = 'bold 48px Inter';
      ctx.fillStyle = COLORS.text;
      ctx.fillText(country, 95, 70); // Adjusted position

      // Flag - using local API endpoint
      try {
        const flag = new Image();
        await new Promise<void>((resolve, reject) => {
          flag.onload = () => resolve();
          flag.onerror = reject;
          flag.src = `/api/flags/${transformedCountryCode}`;
        });
        ctx.drawImage(flag, 30, 40, 45, 30); // Adjusted position
      } catch (error) {
        console.error('Failed to load flag:', error);
      }
      
      // Header text - moved down and adjusted color
      ctx.font = '26px Inter';
      ctx.fillStyle = COLORS.text;
      const line1 = `Economic Value Unlocked by ${years} Additional`;
      const line2 = `Year${years > 1 ? 's' : ''} of Healthy Life Expectancy:`;
      ctx.fillText(line1, 30, 120); // Adjusted position
      ctx.fillText(line2, 30, 150); // Adjusted position
  
      // Main value - moved down and adjusted color
      ctx.font = 'bold 96px Inter';
      ctx.fillStyle = COLORS.blue500;
      ctx.fillText(`$${totalWTP.toFixed(1)}T /`, 30, 260); // Adjusted position
      
      // GDP comparison - moved down
      ctx.font = 'bold 42px Inter';
      ctx.fillStyle = COLORS.yellow500;
      ctx.fillText(`= ${wtpAsPercentOfGDP.toFixed(1)}x Annual GDP`, 30, 330); // Adjusted position
      
      // Per capita value - adjusted position
      ctx.font = 'bold 40px Inter';
      ctx.fillStyle = COLORS.blue500;
      ctx.fillText(`$${Math.round(perCapitaWTP).toLocaleString()}k`, 380, 230); // Adjusted position
      
      // Per capita label - adjusted position and color
      ctx.font = '26px Inter';
      ctx.fillStyle = COLORS.text;
      ctx.fillText('per capita', 380, 255); // Adjusted position
      
      // Footer - adjusted color
      ctx.font = '14px Inter';
      ctx.fillStyle = COLORS.text;
      ctx.fillText('Source: Scott et al. (2023). International Gains to Achieving Healthy Longevity.', 30, BASE_HEIGHT - 20);
  
      // Save image
      const link = document.createElement('a');
      link.download = `${country}-longevity-value.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    };
    
    return (
      <button 
        onClick={generateImage}
        className="px-4 py-2 rounded-lg bg-blue-500 transition-none hover:border-2 border border-slate-800/50 tracking-tight"
      >
        Export Image
      </button>
    );
  };
  
  export default ImageGenerator;