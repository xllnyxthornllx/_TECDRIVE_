import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertFileSchema, insertFolderSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // File routes
  app.get("/api/files", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const files = await storage.getFilesByUser(userId);
      res.json(files);
    } catch (error) {
      console.error("Error fetching files:", error);
      res.status(500).json({ message: "Failed to fetch files" });
    }
  });

  app.get("/api/files/:id", isAuthenticated, async (req: any, res) => {
    try {
      const file = await storage.getFile(req.params.id);
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      // Check ownership
      const userId = req.user.claims.sub;
      if (file.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      res.json(file);
    } catch (error) {
      console.error("Error fetching file:", error);
      res.status(500).json({ message: "Failed to fetch file" });
    }
  });

  app.post("/api/files", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate request body
      const fileData = insertFileSchema.parse(req.body);
      
      // Create file with owner
      const file = await storage.createFile({
        ...fileData,
        ownerId: userId,
      });
      
      res.status(201).json(file);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid file data", errors: error.errors });
      }
      console.error("Error creating file:", error);
      res.status(500).json({ message: "Failed to create file" });
    }
  });

  app.patch("/api/files/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const file = await storage.getFile(req.params.id);
      
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      
      if (file.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      // Only allow updating specific fields, not ownerId
      const allowedUpdates = z.object({
        filename: z.string().optional(),
        isFavorite: z.boolean().optional(),
        isDeleted: z.boolean().optional(),
        folderId: z.string().nullable().optional(),
      }).parse(req.body);
      
      const updatedFile = await storage.updateFile(req.params.id, allowedUpdates);
      res.json(updatedFile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid update data", errors: error.errors });
      }
      console.error("Error updating file:", error);
      res.status(500).json({ message: "Failed to update file" });
    }
  });

  app.delete("/api/files/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const file = await storage.getFile(req.params.id);
      
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      
      if (file.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      await storage.deleteFile(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting file:", error);
      res.status(500).json({ message: "Failed to delete file" });
    }
  });

  // Folder routes
  app.get("/api/folders", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const folders = await storage.getFoldersByUser(userId);
      res.json(folders);
    } catch (error) {
      console.error("Error fetching folders:", error);
      res.status(500).json({ message: "Failed to fetch folders" });
    }
  });

  app.get("/api/folders/:id", isAuthenticated, async (req: any, res) => {
    try {
      const folder = await storage.getFolder(req.params.id);
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }
      // Check ownership
      const userId = req.user.claims.sub;
      if (folder.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      res.json(folder);
    } catch (error) {
      console.error("Error fetching folder:", error);
      res.status(500).json({ message: "Failed to fetch folder" });
    }
  });

  app.post("/api/folders", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate request body
      const folderData = insertFolderSchema.parse(req.body);
      
      // Create folder with owner
      const folder = await storage.createFolder({
        ...folderData,
        ownerId: userId,
      });
      
      res.status(201).json(folder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid folder data", errors: error.errors });
      }
      console.error("Error creating folder:", error);
      res.status(500).json({ message: "Failed to create folder" });
    }
  });

  app.patch("/api/folders/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const folder = await storage.getFolder(req.params.id);
      
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }
      
      if (folder.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      // Only allow updating specific fields, not ownerId
      const allowedUpdates = z.object({
        folderName: z.string().optional(),
        isDeleted: z.boolean().optional(),
        parentFolderId: z.string().nullable().optional(),
      }).parse(req.body);
      
      const updatedFolder = await storage.updateFolder(req.params.id, allowedUpdates);
      res.json(updatedFolder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid update data", errors: error.errors });
      }
      console.error("Error updating folder:", error);
      res.status(500).json({ message: "Failed to update folder" });
    }
  });

  app.delete("/api/folders/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const folder = await storage.getFolder(req.params.id);
      
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }
      
      if (folder.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      await storage.deleteFolder(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting folder:", error);
      res.status(500).json({ message: "Failed to delete folder" });
    }
  });

  // Payment simulation route - upgrade user to Basic plan
  app.post("/api/upgrade-plan", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Simulate payment processing
      // In production, this would integrate with a real payment gateway
      const updatedUser = await storage.updateUserPlan(userId, "user_basic");
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({ 
        message: "Plan upgraded successfully",
        user: updatedUser 
      });
    } catch (error) {
      console.error("Error upgrading plan:", error);
      res.status(500).json({ message: "Failed to upgrade plan" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
