import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSubmissionSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactSubmissionSchema.parse(req.body);
      
      // Store submission
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({ 
        message: "Dziękujemy za wiadomość! Skontaktujemy się wkrótce.",
        id: submission.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Nieprawidłowe dane formularza",
          errors: error.errors
        });
      } else {
        console.error("Error processing contact form:", error);
        res.status(500).json({ 
          message: "Wystąpił błąd podczas przetwarzania formularza" 
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
