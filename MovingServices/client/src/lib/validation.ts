import { z } from "zod";

export const contactFormSchema = z.object({
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

export type ContactFormValues = z.infer<typeof contactFormSchema>;
