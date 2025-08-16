import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Convex Database Schema
 * ----------------------
 * This file defines the structure of the database tables for our app.
 * 
 * In Convex:
 * - `defineSchema` declares all tables in the database.
 * - `defineTable` specifies the fields in each table, along with their data types.
 * - Data types (`v.string()`, `v.any()`, `v.optional()`, `v.id()`, etc.) are
 *   validated at runtime to ensure data integrity.
 */
export default defineSchema({
  /**
   * USERS TABLE
   * Stores profile and authentication details for each registered user.
   */
  users: defineTable({
    name: v.string(),    // Full name of the user
    email: v.string(),   // Unique email address (used for login/identification)
    picture: v.string(), // URL to the user's profile picture
    uid: v.string()      // Unique identifier from auth provider (e.g., Firebase UID)
  }),

  /**
   * WORKSPACE TABLE
   * Stores user-generated workspace/chat data and related file information.
   */
  workspace: defineTable({
    messages: v.any(),                 // Chat messages in JSON object format
    fileData: v.optional(v.any()),    // Optional file/code data associated with the message
    user: v.id("users")                // Reference to the "users" table (foreign key)
  })
});




/**
 * Convex Database Schema other details
 * ----------------------
 * v.any() → Flexible type; allows storing arbitrary JSON objects (good for chat messages that may have mixed formats).

 * v.optional() → Field may be undefined or missing entirely (good for file data that isn't always attached).

 * v.id("users") → Enforces a relationship between workspace entries and a valid users table record.
 
 */