import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Info } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Imię i nazwisko musi mieć co najmniej 2 znaki"
  }),
  phone: z.string().min(9, {
    message: "Numer telefonu musi mieć co najmniej 9 znaków"
  }),
  email: z.string().email({
    message: "Proszę podać poprawny adres email"
  }),
  serviceType: z.string().min(1, {
    message: "Proszę wybrać rodzaj usługi"
  }),
  message: z.string().min(10, {
    message: "Wiadomość musi mieć co najmniej 10 znaków"
  })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const serviceTypes = [
    { value: "home-moving", labelPl: "Przeprowadzka mieszkania", labelRu: "Переезд квартиры" },
    { value: "office-moving", labelPl: "Przeprowadzka biura", labelRu: "Переезд офиса" },
    { value: "furniture-transport", labelPl: "Transport mebli", labelRu: "Перевозка мебели" },
    { value: "urgent-delivery", labelPl: "Pilna dostawa", labelRu: "Срочная доставка" },
    { value: "other", labelPl: "Inne", labelRu: "Другое" }
  ];
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      message: ""
    }
  });
  
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: language === 'pl' ? "Dziękujemy za wiadomość!" : "Спасибо за сообщение!",
        description: language === 'pl' ? "Skontaktujemy się wkrótce." : "Мы свяжемся с вами в ближайшее время.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: language === 'pl' ? "Wystąpił błąd" : "Произошла ошибка",
        description: error.message,
      });
    }
  });
  
  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };
  
  return (
    <section id="kontakt" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {language === 'pl' ? (
          <>
            <h2 className="section-title">Kontakt</h2>
            <p className="section-description">Skontaktuj się z nami, aby omówić szczegóły transportu lub zadać pytania</p>
          </>
        ) : (
          <>
            <h2 className="section-title">Контакт</h2>
            <p className="section-description">Свяжитесь с нами, чтобы обсудить детали транспортировки или задать вопросы</p>
          </>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="bg-gray-50 rounded-lg shadow-md p-6 h-full">
              <h3 className="font-bold text-xl mb-6 font-heading">
                {language === 'pl' ? 'Formularz kontaktowy' : 'Контактная форма'}
              </h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'pl' ? 'Imię i nazwisko' : 'Имя и фамилия'}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'pl' ? 'Telefon' : 'Телефон'}
                          </FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'pl' ? 'Rodzaj usługi' : 'Тип услуги'}
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={language === 'pl' ? 'Wybierz rodzaj usługi' : 'Выберите тип услуги'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {serviceTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {language === 'pl' ? type.labelPl : type.labelRu}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'pl' ? 'Wiadomość' : 'Сообщение'}
                        </FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-blue-600"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending
                      ? (language === 'pl' ? 'Wysyłanie...' : 'Отправка...')
                      : (language === 'pl' ? 'Wyślij wiadomość' : 'Отправить сообщение')}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-gray-50 rounded-lg shadow-md p-6 h-full">
              <h3 className="font-bold text-xl mb-6 font-heading">
                {language === 'pl' ? 'Dane kontaktowe' : 'Контактные данные'}
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <Phone className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">
                      {language === 'pl' ? 'Telefon' : 'Телефон'}
                    </h4>
                    <p className="text-gray-700">
                      {language === 'pl' ? 'Dostępny 7 dni w tygodniu, 8:00 - 20:00' : 'Доступен 7 дней в неделю, 8:00 - 20:00'}
                    </p>
                    <a href="tel:+48796691959" className="text-primary font-bold text-xl hover:underline">+48 796 691 959</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-gray-700">
                      {language === 'pl' ? 'Odpowiadamy w ciągu 24 godzin' : 'Отвечаем в течение 24 часов'}
                    </p>
                    <a href="mailto:m.martynowytch@gmail.com" className="text-primary font-bold hover:underline">m.martynowytch@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <MapPin className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">
                      {language === 'pl' ? 'Obszary działania' : 'Зоны обслуживания'}
                    </h4>
                    <p className="text-gray-700">
                      {language === 'pl' ? 'Główne lokalizacje:' : 'Основные локации:'}
                    </p>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>
                        {language === 'pl' ? 'Warszawa i okolice (do 50 km)' : 'Варшава и окрестности (до 50 км)'}
                      </li>
                      <li>
                        {language === 'pl' ? 'Katowice i okolice (do 50 km)' : 'Катовице и окрестности (до 50 км)'}
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-8">
                  <h4 className="font-bold mb-2 flex items-center">
                    <Info className="text-yellow-500 mr-2 h-4 w-4" />
                    {language === 'pl' ? 'Szybka wycena' : 'Быстрая оценка'}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {language === 'pl' 
                      ? 'Aby uzyskać szybką wycenę, zadzwoń bezpośrednio pod numer telefonu lub wyślij zapytanie przez formularz kontaktowy. Odpowiemy najszybciej, jak to możliwe.'
                      : 'Чтобы получить быструю оценку, позвоните напрямую по номеру телефона или отправьте запрос через контактную форму. Мы ответим как можно скорее.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
