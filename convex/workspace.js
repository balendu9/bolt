import { mutation } from "/_generated/server";
import { v } from "convex/values"; // Required for type-safe argument definitions

/**
 * CreateWorkspace mutation
 * ------------------------
 * This mutation creates a new workspace record in the "workspace" table.
 * A workspace stores:
 *  - Chat messages (in any JSON format)
 *  - A reference to the user who owns the workspace
 */
export const CreateWorkspace = mutation({
  // Define the expected arguments for this mutation
  args: {
    messages: v.any(),         // Chat message data in any format (object, array, etc.)
    user: v.id("users")       // Reference to the user who owns this workspace
  },

  // Main mutation handler
  handler: async (ctx, args) => {
    /**
     * 1️⃣ Insert a new record into the "workspace" table
     * - `message`: Stores the provided chat data
     * - `user`: Stores a foreign key reference to the "users" table
     */
    const workspaceId = await ctx.db.insert("workspace", {
      messages: args.messages, // ✅ matches schema field name exactly
      user: args.user
    });

    // 2️⃣ Return the ID of the newly created workspace entry
    return workspaceId;
  }
});



/**
 * GetWorkspace query
 * ------------------
 * This query fetches a single workspace record from the "workspace" table
 * based on its unique document ID.
 */
 export const GetWorkspace = query({
    // Define the expected arguments
    args: {
      workspaceId: v.id("workspace") // The Convex document ID for the workspace
    },
  
    // Query handler
    handler: async (ctx, args) => {
      /**
       * 1️⃣ Fetch the workspace document by ID
       * - If found, returns the workspace object
       * - If not found, returns null
       */
      const result = await ctx.db.get(args.workspaceId);
  
      // 2️⃣ Return the fetched record (or null if it doesn't exist)
      return result;
    }
  });



export const UpdateMessages=mutation({
  args:{
    workspaceId:v.id('workspace'),
    messages:v.any()
  },
  handler:async(ctx,args)=> {
    const result=await ctx.db.patch(args.workspaceId, {
      messages:args.messages
    });
    return result 
  }
})


export const UpdateFiles=mutation({
  args:{
    workspaceId:v.id('workspace'),
    files:v.any()
  },
  handler:async(ctx,args)=> {
    const result=await ctx.db.patch(args.workspaceId, {
      fileData:args.files
    });
    return result 
  }
})