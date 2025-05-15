import { useLanguage } from "@/hooks/useLanguage";
import { Phone, ArrowRight } from "lucide-react";
import VideoBackground from "@/components/VideoBackground";

const HeroSection = () => {
  const { language } = useLanguage();
  
  const getContent = () => {
    const content = {
      pl: {
        title: "Profesjonalne usługi transportowe",
        subtitle: "Warszawa i Katowice",
        description: "Szybkie i niezawodne przeprowadzki mieszkań i biur, transport mebli i sprzętu. Pracujemy 7 dni w tygodniu.",
        buttonText: "Zamów transport",
        phoneText: "Zadzwoń teraz",
        imgAlt: "Profesjonalne usługi transportowe"
      },
      en: {
        title: "Professional Transportation Services",
        subtitle: "Warsaw and Katowice",
        description: "Fast and reliable apartment and office relocation, furniture and equipment transport. We work 7 days a week.",
        buttonText: "Order Transport",
        phoneText: "Call Now",
        imgAlt: "Professional transportation services"
      },
      ru: {
        title: "Грузоперевозки",
        subtitle: "Warszawa и Katowice",
        description: "Переезды квартир и офисов, перевозка мебели и техники. Работаем без выходных.",
        buttonText: "Заказать транспорт",
        phoneText: "Позвонить",
        imgAlt: "Профессиональные транспортные услуги"
      }
    };
    
    return content[language as keyof typeof content] || content.pl;
  };
  
  const content = getContent();
  
  // Placeholder for video URL - this should be replaced with an actual video URL
  const videoUrl = "https://player.vimeo.com/external/528335088.sd.mp4?s=a6201797f9ef36ecde8a0a5cf329044df8b2c9bd&profile_id=164&oauth2_token_id=57447761";
  
  // Fallback image URL in case video doesn't load
  const fallbackImageUrl = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080";
  
  return (
    <section className="relative text-white min-h-[90vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <VideoBackground 
        videoUrl={videoUrl} 
        fallbackImageUrl={fallbackImageUrl} 
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 z-20 relative">
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-4xl animate-fadeIn">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 animate-slideInLeft">
            {content.title}
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium text-gray-300 mb-6 animate-slideInLeft delay-100">
            {content.subtitle}
          </h2>
          
          <p className="text-xl text-gray-200 mb-10 max-w-2xl animate-slideInLeft delay-200">
            {content.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slideUp delay-300">
            <a 
              href="#cennik" 
              className="btn-primary group"
            >
              {content.buttonText} <ArrowRight className="inline-block ml-2 transition-transform group-hover:translate-x-1" size={18} />
            </a>
            <a 
              href="tel:+48796691959" 
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" /> +48 796 691 959
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default HeroSection;
