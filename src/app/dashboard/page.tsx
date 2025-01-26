import { getConvexClient } from '@/lib/convex'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { api } from '../../../convex/_generated/api'
import { Card } from '@/components/ui/card'
import TaskProgressCard from './_components/task-progress-card'
import TaskSummaryCard from './_components/task-summary-card'

const Dashboard = async () => {

  const { userId } = await auth()

  if (!userId) return <div>Unauthorized</div>

  const convex = getConvexClient()
  const tasks = await convex.query(api.tasks.getTasks, {
    userId
  })

  return (
    <div className="flex w-full bg-background">
      <div className="flex-1">
        <div className="flex flex-col max-h-[700px] h-full mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

          <TaskProgressCard tasks={tasks} />

          <Card className="shadow-lg rounded-2xl overflow-y-scroll __hideScrollBar">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Task Summary</h2>
              <ul className="space-y-4">
                {tasks.map((task) => (
                  <TaskSummaryCard key={task._id} task={task} />
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard