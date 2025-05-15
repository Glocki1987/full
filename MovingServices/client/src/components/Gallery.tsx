import { useLanguage } from "@/hooks/useLanguage";
import { useRef, useEffect, useState } from "react";
import { Truck, Camera } from "lucide-react";
import deliveryMan1 from "@/assets/delivery-man1.png";

const Gallery = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
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
  
  // Галерея изображений
  const galleryItems = [
    {
      src: deliveryMan1,
      alt: "Pracownik firmy transportowej TransExpress"
    },
    {
      src: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      alt: "Przeprowadzka i transport mebli"
    },
    {
      src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      alt: "Transport paczek i przesyłek"
    }
  ];
  
  // Польский текст (только польский язык)
  const text = {
    title: "Galeria",
    description: "Zapraszamy do obejrzenia galerii naszej działalności",
    closeModal: "Zamknij"
  };
  
  return (
    <section id="galeria" className="py-20 bg-card" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title">{text.title}</h2>
          <p className="section-description">{text.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Gallery images */}
          {galleryItems.map((item, index) => (
            <div 
              key={index} 
              className={`gallery-item card-dark rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              onClick={() => setSelectedImage(item.src)}
            >
              <div className="relative group">
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Camera className="text-white h-10 w-10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Image modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setSelectedImage(null)}>
          <div className="max-w-4xl max-h-full overflow-auto p-2">
            <img src={selectedImage} className="max-w-full max-h-[90vh] object-contain" alt="Enlarged view" />
            <button 
              className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-md hover:bg-black/70 transition"
              onClick={() => setSelectedImage(null)}
            >
              {text.closeModal}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
