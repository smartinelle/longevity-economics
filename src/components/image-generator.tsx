'use client'

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
    const generateImage = async () => {
      const SCALE_FACTOR = 2;
      const BASE_WIDTH = 515;
      const BASE_HEIGHT = 350;
      const canvas = document.createElement('canvas');
      canvas.width = BASE_WIDTH * SCALE_FACTOR;
      canvas.height = BASE_HEIGHT * SCALE_FACTOR;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        console.error('Failed to get canvas context');
        return;
      }
  
      // Scale all drawing operations
      ctx.scale(SCALE_FACTOR, SCALE_FACTOR);
      
      // Background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);
      
      // Gradient overlay
      const gradient = ctx.createLinearGradient(0, BASE_HEIGHT * 0.4, 0, BASE_HEIGHT);
      gradient.addColorStop(0, 'rgba(37, 99, 235, 0.1)');
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);
      
      // Load and draw logo
      try {
        const logo = new Image();
        await new Promise<void>((resolve, reject) => {
          logo.onload = () => resolve();
          logo.onerror = reject;
          logo.src = '/logo.png';
        });
        ctx.drawImage(logo, 440, 18, 45, 45);
      } catch (error) {
        console.error('Failed to load logo:', error);
      }
      
      // Colors
      const COLORS = {
        white: '#ffffff',
        slate300: '#94a3b8',
        slate500: '#64748b',
        blue500: '#3b82f6',
        yellow500: '#eab308'
      };
      
      // Country name
      ctx.font = 'bold 48px Inter';
      ctx.fillStyle = COLORS.white;
      ctx.fillText(country, 85, 60);
  
      // Flag
      try {
        const flag = new Image();
        await new Promise<void>((resolve, reject) => {
          flag.onload = () => resolve();
          flag.onerror = reject;
          flag.src = `/flags/l/${countryCode}.svg`;
        });
        ctx.drawImage(flag, 30, 30, 45, 30);
      } catch (error) {
        console.error('Failed to load flag:', error);
      }
      
      // Header text
      ctx.font = '26px Inter';
      ctx.fillStyle = COLORS.slate300;
      const line1 = `Economic Value Unlocked by ${years} Additional`;
      const line2 = `Year${years > 1 ? 's' : ''} of Healthy Life Expectancy:`;
      ctx.fillText(line1, 30, 105);
      ctx.fillText(line2, 30, 135);
  
      // Main value
      ctx.font = 'bold 96px Inter';
      ctx.fillStyle = COLORS.blue500;
      ctx.fillText(`$${totalWTP.toFixed(1)}T /`, 30, 240);
      
      // GDP comparison
      ctx.font = 'bold 42px Inter';
      ctx.fillStyle = COLORS.yellow500;
      ctx.fillText(`= ${wtpAsPercentOfGDP.toFixed(1)}x Annual GDP`, 30, 300);
      
      // Per capita value
      ctx.font = 'bold 40px Inter';
      ctx.fillStyle = COLORS.blue500;
      ctx.fillText(`$${Math.round(perCapitaWTP).toLocaleString()}k`, 380, 210);
      
      // Per capita label
      ctx.font = '26px Inter';
      ctx.fillStyle = COLORS.slate300;
      ctx.fillText('per capita', 380, 235);
      
      // Footer
      ctx.font = '14px Inter';
      ctx.fillStyle = COLORS.slate500;
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