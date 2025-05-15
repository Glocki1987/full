import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone } from "lucide-react";

const ServiceArea = () => {
  const { language } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState("warszawa");
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
  
  const cityInfo = {
    warszawa: {
      name: {
        pl: "Warszawa",
        en: "Warsaw",
        ru: "Варшава"
      },
      description: {
        pl: "Obsługujemy Warszawę oraz okoliczne miejscowości w promieniu do 50 km, w tym Piaseczno, Pruszków, Legionowo, Otwock i inne.",
        en: "We service Warsaw and surrounding towns within a 50 km radius, including Piaseczno, Pruszków, Legionowo, Otwock and others.",
        ru: "Мы обслуживаем Варшаву и близлежащие населенные пункты в радиусе до 50 км, включая Пясечно, Прушкув, Легионово, Отвоцк и другие."
      }
    },
    katowice: {
      name: {
        pl: "Katowice",
        en: "Katowice",
        ru: "Катовице"
      },
      description: {
        pl: "Obsługujemy Katowice oraz okoliczne miejscowości w promieniu do 50 km, w tym Chorzów, Gliwice, Tychy, Sosnowiec i inne.",
        en: "We service Katowice and surrounding towns within a 50 km radius, including Chorzów, Gliwice, Tychy, Sosnowiec and others.",
        ru: "Мы обслуживаем Катовице и близлежащие населенные пункты в радиусе до 50 км, включая Хожув, Гливице, Тыхы, Сосновец и другие."
      }
    }
  };
  
  const sectionTexts = {
    pl: {
      title: "Obszar działania",
      description: "Świadczymy usługi transportowe głównie w Warszawie i Katowicach oraz okolicznych miejscowościach.",
      mainLocations: "Nasze główne lokalizacje",
      servicesInfo: "Oferujemy usługi w następujących miastach i okolicach:",
      citySelection: "Wybierz miasto",
      districts: "Obsługiwane dzielnice w Warszawie:",
      districtsNames: "Mokotów, Ursynów, Wilanów, Wola, Bemowo, Białołęka, Bielany, Ochota, Praga-Południe, Praga-Północ, Rembertów, Śródmieście, Targówek, Ursus, Wawer, Wesoła, Włochy, Żoliborz",
      needOutsideArea: "Potrzebujesz transportu poza wskazanymi obszarami?",
      inquireButton: "Zadzwoń do nas"
    },
    en: {
      title: "Service Area",
      description: "We provide transportation services mainly in Warsaw and Katowice and surrounding locations.",
      mainLocations: "Our main locations",
      servicesInfo: "We offer services in the following cities and surrounding areas:",
      citySelection: "Select city",
      districts: "Serviced districts in Warsaw:",
      districtsNames: "Mokotów, Ursynów, Wilanów, Wola, Bemowo, Białołęka, Bielany, Ochota, Praga-Południe, Praga-Północ, Rembertów, Śródmieście, Targówek, Ursus, Wawer, Wesoła, Włochy, Żoliborz",
      needOutsideArea: "Need transportation outside the indicated areas?",
      inquireButton: "Call us"
    },
    ru: {
      title: "География обслуживания",
      description: "Мы предоставляем транспортные услуги в основном в Варшаве и Катовице, а также в близлежащих населенных пунктах.",
      mainLocations: "Наши основные локации",
      servicesInfo: "Мы предлагаем услуги в следующих городах и окрестностях:",
      citySelection: "Выберите город",
      districts: "Обслуживаемые районы в Варшаве:",
      districtsNames: "Мокотув, Урсынув, Виланув, Воля, Бемово, Бялоленка, Беляны, Охота, Прага-Пулноц, Прага-Полудне, Рембертув, Шрудмещце, Таргувек, Урсус, Вавер, Весола, Влохи, Жолибож",
      needOutsideArea: "Нужна транспортировка за пределами указанных областей?",
      inquireButton: "Позвоните нам"
    }
  };
  
  const districtsInfo = {
    warszawa: {
      title: {
        pl: "Obsługiwane dzielnice w Warszawie:",
        en: "Serviced districts in Warsaw:",
        ru: "Обслуживаемые районы в Варшаве:"
      },
      districts: "Mokotów, Ursynów, Wilanów, Wola, Bemowo, Białołęka, Bielany, Ochota, Praga-Południe, Praga-Północ, Rembertów, Śródmieście, Targówek, Ursus, Wawer, Wesoła, Włochy, Żoliborz"
    },
    katowice: {
      title: {
        pl: "Obsługiwane dzielnice w Katowicach:",
        en: "Serviced districts in Katowice:",
        ru: "Обслуживаемые районы в Катовице:"
      },
      districts: "Śródmieście, Koszutka, Bogucice, Dąbrówka Mała, Zawodzie, Os. Paderewskiego, Muchowiec, Brynów, Ligota-Panewniki, Załęże, Osiedle Witosa, Osiedle Tysiąclecia, Dąb, Wełnowiec-Józefowiec, Szopienice-Burowiec, Janów-Nikiszowiec, Giszowiec, Murcki, Kostuchna, Podlesie, Zarzecze, Piotrowice-Ochojec"
    }
  };

  const text = sectionTexts[language as keyof typeof sectionTexts] || sectionTexts.pl;
  
  // New Warsaw image with dark aesthetic
  const warsawImage = "https://images.unsplash.com/photo-1603986575288-6afa6e527cea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80";
  
  // New Katowice image with dark aesthetic
  const katowiceImage = "https://images.unsplash.com/photo-1633854304077-2723dfe9c9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80";
  
  return (
    <section 
      id="obszar" 
      className="py-14 sm:py-16 md:py-20 bg-background"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title">{text.title}</h2>
          <p className="section-description">{text.description}</p>
        </div>

        <div 
          className={`card-dark overflow-hidden mt-8 md:mt-10 shadow-lg transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="p-4 sm:p-6 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 font-heading flex items-center">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary flex-shrink-0" /> 
                  <span>{text.mainLocations}</span>
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">{text.servicesInfo}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Select 
                  defaultValue={selectedLocation}
                  onValueChange={(value) => setSelectedLocation(value)}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder={text.citySelection} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warszawa">Warszawa</SelectItem>
                    <SelectItem value="katowice">Katowice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg" style={{ height: "300px", minHeight: "300px", maxHeight: "450px", width: "100%" }}>
            {/* Map with Markers for Warsaw and Katowice - different maps depending on selection */}
            <iframe 
              src={selectedLocation === "warszawa" 
                ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156388.35438500526!2d20.8484356849418!3d52.232690687241744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3fc!2sWarszawa!5e0!3m2!1spl!2spl!4v1684057025532!5m2!1spl!2spl" 
                : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81588.72389145645!2d18.898676024356976!3d50.24542684274072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce2336a1ccd1%3A0xb9af2a350559fabb!2sKatowice!5e0!3m2!1spl!2spl!4v1684057098523!5m2!1spl!2spl"}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen
              loading="lazy"
              className="z-0 bg-background w-full h-full transform-gpu"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map with ${selectedLocation === "warszawa" ? "Warsaw" : "Katowice"} service area`}
              className="z-0 bg-background"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 flex items-center justify-center">
              <div className="text-center text-white p-3 sm:p-6 max-w-full sm:max-w-2xl">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 font-heading bg-black/50 py-1 sm:py-2 px-3 sm:px-4 rounded-lg inline-block backdrop-blur-sm">
                  {cityInfo[selectedLocation as keyof typeof cityInfo].name.pl}
                </p>
                <p className="text-sm sm:text-base md:text-lg bg-black/40 p-3 sm:p-4 rounded-lg shadow-lg backdrop-blur-sm">
                  {cityInfo[selectedLocation as keyof typeof cityInfo].description.pl}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-card/80">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <div className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base text-foreground">
                {districtsInfo[selectedLocation as keyof typeof districtsInfo].title[language as keyof typeof districtsInfo.warszawa.title] || districtsInfo[selectedLocation as keyof typeof districtsInfo].title.pl}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {districtsInfo[selectedLocation as keyof typeof districtsInfo].districts}
              </div>
            </div>
          </div>
        </div>

        <div 
          className={`mt-8 sm:mt-10 md:mt-12 text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="mb-4 sm:mb-6 text-base sm:text-lg">{text.needOutsideArea}</p>
          <a 
            href="tel:+48796691959" 
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" /> +48 796 691 959
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
