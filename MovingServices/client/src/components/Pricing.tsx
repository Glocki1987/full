import { useLanguage } from "@/hooks/useLanguage";
import { useRef, useEffect, useState } from "react";
import { Phone, Check } from "lucide-react";

const Pricing = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const pricingItems = [
    {
      title: {
        pl: "Transport - samochód dostawczy z kierowcą",
        en: "Transport - delivery van with driver",
        ru: "Транспорт - фургон с водителем"
      },
      description: {
        pl: "Obejmuje podstawowy transport bez dodatkowych usług",
        en: "Includes basic transportation without additional services",
        ru: "Включает базовую транспортировку без дополнительных услуг"
      },
      price: "120 zł/h"
    },
    {
      title: {
        pl: "Transport + 1 pomocnik",
        en: "Transport + 1 helper",
        ru: "Транспорт + 1 помощник"
      },
      description: {
        pl: "Samochód z kierowcą oraz dodatkowa osoba do pomocy",
        en: "Vehicle with driver and an additional person to help",
        ru: "Автомобиль с водителем и дополнительный человек для помощи"
      },
      price: "170 zł/h"
    },
    {
      title: {
        pl: "Transport + 2 pomocników",
        en: "Transport + 2 helpers",
        ru: "Транспорт + 2 помощника"
      },
      description: {
        pl: "Samochód z kierowcą oraz 2 osoby do pomocy, idealne do przeprowadzek",
        en: "Vehicle with driver and 2 people to help, perfect for relocations",
        ru: "Автомобиль с водителем и 2 человека для помощи, идеально для переездов"
      },
      price: "220 zł/h"
    },
    {
      title: {
        pl: "Opłata za dojazd",
        en: "Travel fee",
        ru: "Плата за приезд"
      },
      description: {
        pl: "Dojazd do klienta poza głównym obszarem działania",
        en: "Travel to the client outside the main service area",
        ru: "Приезд к клиенту за пределами основной зоны обслуживания"
      },
      price: "2.5 zł/km"
    }
  ];
  
  // Только польский текст теперь
  const sectionText = {
    title: "Cennik",
    description: "Przejrzyste i konkurencyjne ceny naszych usług",
    ratesTitle: "Podstawowe stawki",
    ratesSubtitle: "Ceny mogą się różnić w zależności od specyfiki zlecenia",
    quoteButton: "Zadzwoń do nas",
    contactInfo: "Informacje kontaktowe"
  };
  
  const text = sectionText;
  
  return (
    <section 
      id="cennik" 
      className="py-20 bg-background"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title">{text.title}</h2>
          <p className="section-description">{text.description}</p>
        </div>

        <div 
          className={`card-dark rounded-lg shadow-lg overflow-hidden mt-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="px-6 py-6 bg-primary">
            <h3 className="font-bold text-2xl font-heading text-white">{text.ratesTitle}</h3>
            <p className="text-white/80">{text.ratesSubtitle}</p>
          </div>

          <div className="divide-y divide-border">
            {pricingItems.map((item, index) => (
              <div 
                key={index} 
                className={`px-6 py-6 flex flex-col md:flex-row justify-between transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${300 + (index * 100)}ms` }}
              >
                <div className="md:w-2/3">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <Check className="mr-2 text-primary h-5 w-5" />
                    {item.title[language as keyof typeof item.title] || item.title.pl}
                  </h4>
                  <p className="text-muted-foreground">
                    {item.description[language as keyof typeof item.description] || item.description.pl}
                  </p>
                </div>
                <div className="md:w-1/3 text-right mt-4 md:mt-0">
                  <span className="font-bold text-xl text-primary">{item.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Секция с минимальным заказом удалена по требованию клиента */}
        </div>

        <div 
          className={`mt-16 text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <h3 className="text-xl font-bold mb-6 font-heading">{text.contactInfo}</h3>
          <a 
            href="tel:+48796691959" 
            className="btn-primary inline-flex items-center justify-center gap-2 group"
          >
            <Phone className="h-5 w-5 transition-transform group-hover:animate-pulse" /> 
            +48 796 691 959
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
