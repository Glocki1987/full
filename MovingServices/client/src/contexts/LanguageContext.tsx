import { createContext, ReactNode, useEffect } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "pl",
  setLanguage: () => {},
});

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Всегда используем только польский язык
  const language = "pl";

  // Настраиваем язык для документа при монтировании
  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.querySelector('html')?.setAttribute('lang', language);
    
    // Обновляем мета-теги для SEO 
    const metaLang = document.querySelector('meta[property="og:locale"]');
    if (metaLang) {
      metaLang.setAttribute('content', 'pl_PL');
    }
  }, []);

  // Функция setLanguage оставлена для совместимости, но ничего не делает
  const handleSetLanguage = () => {
    // Пустая функция - мы всегда используем только польский язык
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
