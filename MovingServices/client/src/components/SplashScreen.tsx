import { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can adjust this as needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="loading-container flex flex-col items-center justify-center">
      <div className="loading-truck mb-6 transform-gpu relative w-full flex justify-center">
        <Truck size={80} className="text-primary animate-pulse" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-2 font-heading">TransExpress</h1>
      <p className="text-gray-400 mb-6 text-lg">Warszawa & Katowice</p>
      
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default SplashScreen;