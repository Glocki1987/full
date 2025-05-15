import { useLanguage } from "@/hooks/useLanguage";
import { Phone, Mail, Truck, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const { language } = useLanguage();
  const year = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Detect scroll position for "scroll to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      slogan: {
        pl: 'Profesjonalne usługi transportowe w Warszawie i Katowicach',
        en: 'Professional transportation services in Warsaw and Katowice',
        ru: 'Профессиональные транспортные услуги в Варшаве и Катовице'
      },
      copyright: {
        pl: `© ${year} TransExpress. Wszelkie prawa zastrzeżone.`,
        en: `© ${year} TransExpress. All rights reserved.`,
        ru: `© ${year} TransExpress. Все права защищены.`
      },
      scrollTop: {
        pl: 'Do góry',
        en: 'Back to top',
        ru: 'Наверх'
      }
    };
    
    return texts[key][language as keyof (typeof texts)[typeof key]] || texts[key]['pl'];
  };
  
  return (
    <footer className="bg-black text-white py-10 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <Truck className="h-6 w-6 text-primary mr-2" />
              <span className="text-2xl font-bold font-heading">TransExpress</span>
            </div>
            <div className="text-gray-400 text-sm">
              {getText('slogan')}
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-3 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Kontakt</h3>
            <a 
              href="tel:+48796691959" 
              className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center" 
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>+48 796 691 959</span>
            </a>
            <a 
              href="mailto:m.martynowytch@gmail.com" 
              className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center" 
            >
              <Mail className="h-5 w-5 mr-2" />
              <span>m.martynowytch@gmail.com</span>
            </a>
          </div>
          
          <div className="text-gray-400 text-sm text-center md:text-right">
            {getText('copyright')}
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label={getText('scrollTop')}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default Footer;
