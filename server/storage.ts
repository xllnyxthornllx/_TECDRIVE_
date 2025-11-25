import {
  users,
  files,
  folders,
  type User,
  type UpsertUser,
  type File,
  type InsertFile,
  type Folder,
  type InsertFolder,
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserPlan(userId: string, planType: string): Promise<User | undefined>;
  
  // File operations
  getFilesByUser(userId: string): Promise<File[]>;
  getFile(id: string): Promise<File | undefined>;
  createFile(file: InsertFile & { ownerId: string }): Promise<File>;
  updateFile(id: string, updates: Partial<File>): Promise<File | undefined>;
  deleteFile(id: string): Promise<void>;
  
  // Folder operations
  getFoldersByUser(userId: string): Promise<Folder[]>;
  getFolder(id: string): Promise<Folder | undefined>;
  createFolder(folder: InsertFolder & { ownerId: string }): Promise<Folder>;
  updateFolder(id: string, updates: Partial<Folder>): Promise<Folder | undefined>;
  deleteFolder(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserPlan(userId: string, planType: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ planType, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // File operations
  async getFilesByUser(userId: string): Promise<File[]> {
    return await db.select().from(files).where(eq(files.ownerId, userId));
  }

  async getFile(id: string): Promise<File | undefined> {
    const [file] = await db.select().from(files).where(eq(files.id, id));
    return file;
  }

  async createFile(fileData: InsertFile & { ownerId: string }): Promise<File> {
    const [file] = await db.insert(files).values(fileData).returning();
    return file;
  }

  async updateFile(id: string, updates: Partial<File>): Promise<File | undefined> {
    const [file] = await db
      .update(files)
      .set(updates)
      .where(eq(files.id, id))
      .returning();
    return file;
  }

  async deleteFile(id: string): Promise<void> {
    await db.delete(files).where(eq(files.id, id));
  }

  // Folder operations
  async getFoldersByUser(userId: string): Promise<Folder[]> {
    return await db.select().from(folders).where(eq(folders.ownerId, userId));
  }

  async getFolder(id: string): Promise<Folder | undefined> {
    const [folder] = await db.select().from(folders).where(eq(folders.id, id));
    return folder;
  }

  async createFolder(folderData: InsertFolder & { ownerId: string }): Promise<Folder> {
    const [folder] = await db.insert(folders).values(folderData).returning();
    return folder;
  }

  async updateFolder(id: string, updates: Partial<Folder>): Promise<Folder | undefined> {
    const [folder] = await db
      .update(folders)
      .set(updates)
      .where(eq(folders.id, id))
      .returning();
    return folder;
  }

  async deleteFolder(id: string): Promise<void> {
    await db.delete(folders).where(eq(folders.id, id));
  }
}

export const storage = new DatabaseStorage();
