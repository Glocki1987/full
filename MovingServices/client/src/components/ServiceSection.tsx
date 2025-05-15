import { useLanguage } from "@/hooks/useLanguage";
import { Home, Building, Sofa, Zap, ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const ServiceSection = () => {
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
  
  const services = [
    {
      icon: <Home className="h-8 w-8 text-primary" />,
      title: {
        pl: "Przeprowadzki mieszkań",
        en: "Apartment Moving",
        ru: "Переезды квартир"
      },
      description: {
        pl: "Kompleksowe przeprowadzki mieszkań wraz z bezpiecznym pakowaniem i transportem.",
        en: "Comprehensive apartment relocations with safe packing and transportation.",
        ru: "Комплексные переезды квартир с безопасной упаковкой и транспортировкой."
      }
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: {
        pl: "Przeprowadzki biur",
        en: "Office Moving",
        ru: "Переезды офисов"
      },
      description: {
        pl: "Szybkie i efektywne przeprowadzki biur i firm z minimalnymi przestojami.",
        en: "Fast and efficient office and company relocations with minimal downtime.",
        ru: "Быстрые и эффективные переезды офисов и компаний с минимальными простоями."
      }
    },
    {
      icon: <Sofa className="h-8 w-8 text-primary" />,
      title: {
        pl: "Transport mebli",
        en: "Furniture Transport",
        ru: "Перевозка мебели"
      },
      description: {
        pl: "Bezpieczny transport mebli i wyposażenia z zabezpieczeniem przed uszkodzeniami.",
        en: "Safe transportation of furniture and equipment with protection against damage.",
        ru: "Безопасная транспортировка мебели и оборудования с защитой от повреждений."
      }
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: {
        pl: "Pilne dostawy",
        en: "Urgent Deliveries",
        ru: "Срочная доставка"
      },
      description: {
        pl: "Pilne i ekspresowe dostawy oraz transporty w nagłych przypadkach.",
        en: "Urgent and express deliveries and transportation in emergency situations.",
        ru: "Срочные и экспресс-доставки и транспортировки в экстренных случаях."
      }
    }
  ];
  
  const sectionText = {
    pl: {
      title: "Nasze usługi",
      description: "Oferujemy kompleksowe usługi transportowe dostosowane do Twoich potrzeb. Sprawdź, co możemy dla Ciebie zrobić.",
      workingTitle: "Pracujemy 7 dni w tygodniu!",
      workingDescription: "Nasze usługi są dostępne codziennie, również w weekendy i święta. Zawsze jesteśmy gotowi pomóc Ci z przeprowadzką lub transportem.",
      detailsButton: "Zobacz cennik"
    },
    en: {
      title: "Our Services",
      description: "We offer comprehensive transportation services tailored to your needs. Check what we can do for you.",
      workingTitle: "We work 7 days a week!",
      workingDescription: "Our services are available daily, including weekends and holidays. We are always ready to help you with moving or transportation.",
      detailsButton: "See pricing"
    },
    ru: {
      title: "Услуги",
      description: "Мы предлагаем комплексные транспортные услуги, адаптированные к вашим потребностям.",
      workingTitle: "Работаем без выходных!",
      workingDescription: "Наши услуги доступны ежедневно, включая выходные и праздничные дни. Мы всегда готовы помочь вам с переездом или транспортировкой.",
      detailsButton: "Узнать детали"
    }
  };
  
  const text = sectionText[language as keyof typeof sectionText] || sectionText.pl;
  
  return (
    <section 
      id="uslugi" 
      className="py-20 bg-card"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title">{text.title}</h2>
          <p className="section-description">{text.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`card-dark p-8 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                {service.icon}
              </div>
              <h3 className="font-bold text-xl mb-4 font-heading text-center">
                {service.title[language as keyof typeof service.title] || service.title.pl}
              </h3>
              <p className="text-muted-foreground text-center">
                {service.description[language as keyof typeof service.description] || service.description.pl}
              </p>
            </div>
          ))}
        </div>

        <div 
          className={`mt-20 p-8 rounded-lg border border-border bg-card/60 shadow-lg transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-3/4 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-3 font-heading">{text.workingTitle}</h3>
              <p className="text-muted-foreground">{text.workingDescription}</p>
            </div>
            <div className="md:w-1/4 md:text-right">
              <a 
                href="#cennik" 
                className="btn-secondary inline-flex items-center group"
              >
                {text.detailsButton} <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
