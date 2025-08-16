import { mutation } from "/_generated/server";
import { v } from "convex/values"; // Required for type-safe argument definitions

/**
 * CreateUser mutation
 * -------------------
 * This mutation adds a new user to the "users" table in Convex.
 * It first checks if a user with the same email already exists to avoid duplicates.
 * If the user does not exist, it inserts a new record with the provided details.
 */
export const CreateUser = mutation({
  // Define the expected arguments and their types
  args: {
    name: v.string(),    // Full name of the user
    email: v.string(),   // Unique email address of the user
    picture: v.string(), // URL of the user's profile picture
    uid: v.string()      // Unique identifier for the user (e.g., from auth provider)
  },

  // The mutation handler contains the logic to process the request
  handler: async (ctx, args) => {
    // 1️⃣ Check if a user with the given email already exists in the "users" table
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .collect(); // collect() executes the query and returns an array of matching records

    console.log("Existing users:", user);

    // 2️⃣ If no user with this email exists, insert a new record
    if (user.length === 0) {
      const result = await ctx.db.insert("users", {
        name: args.name,
        picture: args.picture,
        email: args.email,
        uid: args.uid
      });

      console.log("New user created with ID:", result);
    }
    // Else: Do nothing (user already exists)
  }
});



//next check the file SignInDialog.jsx in components/custom/
//there the code to add user is written


// get user data:

export const GetUser=query({
    args: {
        email
    },
    handler:async(ctx, args)=> {
        const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .collect(); // collect() executes the query and returns an array of matching records

    }
})