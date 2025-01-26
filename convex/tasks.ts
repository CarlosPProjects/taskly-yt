import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createTask = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {

    const task = await ctx.db.insert("tasks", {
      title: args.title,
      isDone: false,
      createdAt: Date.now(),
      userId: args.userId
    })

    return task
  }
})

export const getTasks = query({
  args: {
    userId: v.string()
  },
  handler: async (ctx, args) => {
    const tasks = await ctx.db.query("tasks").withIndex("by_user_id", (q) => q.eq("userId", args.userId)).collect()
    return tasks
  }
})

export const deleteTask = mutation({
  args: {
    taskId: v.id("tasks")
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.taskId)
  }
})

export const updateTaskTitle = mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.taskId, {
      title: args.title
    })
  }
})

export const updateTaskStatus = mutation({
  args: {
    taskId: v.id("tasks"),
    isDone: v.boolean()
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.taskId, {
      isDone: args.isDone
    })
  }
})