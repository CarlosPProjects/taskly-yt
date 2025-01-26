import React, { FC } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Doc } from '../../../../convex/_generated/dataModel'

interface Props {
  tasks: Doc<'tasks'>[]
}

const TaskProgressCard: FC<Props> = ({ tasks }) => {

  const completedTasks = tasks.filter(task => task.isDone).length
  const completionPercentage = (completedTasks / tasks.length) * 100

  return (
    <Card className="mb-6 shadow-lg rounded-2xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold  mb-4">Task Progress</h2>
        <Progress value={completionPercentage} className="h-2 bg-gray-200" />
        <p className="text-sm mt-2">
          {completedTasks} of {tasks.length} tasks completed
        </p>
      </div>
    </Card>
  )
}

export default TaskProgressCard