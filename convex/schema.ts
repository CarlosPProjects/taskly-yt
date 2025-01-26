import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    isDone: v.boolean(),
    userId: v.string(),
    createdAt: v.number(),
  }).index("by_user_id", ["userId"]),
})