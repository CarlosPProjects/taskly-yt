import { getConvexClient } from "@/lib/convex"
import { auth } from "@clerk/nextjs/server"
import { tool } from "ai"
import { z } from "zod"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"

const convex = getConvexClient()

export const taskTools = {
  createTask: tool({
    description: 'Create a task',
    parameters: z.object({
      title: z.string().describe("The title of the task")
    }),
    execute: async ({ title }: { title: string }) => {

      const { userId } = await auth()

      if (!userId) {
        return { success: false, message: 'User not found' }
      }

      const taskId = await convex.mutation(api.tasks.createTask, { title, userId })

      return { success: true, message: `Task created with id: ${taskId}` }
    }
  }),
  getTasks: tool({
    description: "Get tasks from the database",
    parameters: z.object({}),
    execute: async () => {

      const { userId } = await auth()

      if (!userId) {
        return { success: false, message: 'User not found' }
      }

      const tasks = await convex.query(api.tasks.getTasks, { userId: userId });
      return { success: true, tasks };
    }
  }),
  deleteTask: tool({
    description: 'Delete a task',
    parameters: z.object({
      taskId: z.string().describe('The id of the task to delete'),
    }),
    execute: async ({ taskId }: { taskId: string }) => {
      await convex.mutation(api.tasks.deleteTask, { taskId: taskId as Id<'tasks'> });
      return { success: true, message: `Task with id "${taskId}" deleted successfully` };
    }
  }),
  updateTaskTitle: tool({
    description: 'Update the title of a task',
    parameters: z.object({
      taskId: z.string().describe('The id of the task to update'),
      title: z.string().describe('The new title of the task'),
    }),
    execute: async ({ taskId, title }: { taskId: string, title: string }) => {
      await convex.mutation(api.tasks.updateTaskTitle, { taskId: taskId as Id<'tasks'>, title });
      return { success: true, message: `Task with id "${taskId}" updated successfully` };
    }
  }),
  updateTaskStatus: tool({
    description: 'Update the status of a task',
    parameters: z.object({
      taskId: z.string().describe('The id of the task to update'),
      isDone: z.boolean().describe('The new status of the task'),
    }),
    execute: async ({ taskId, isDone }: { taskId: string, isDone: boolean }) => {
      await convex.mutation(api.tasks.updateTaskStatus, { taskId: taskId as Id<'tasks'>, isDone });
      return { success: true, message: `Task with id "${taskId}" updated successfully` };
    }
  })
}