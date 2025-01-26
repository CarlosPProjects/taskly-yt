'use client'

import { useState, type FC } from 'react'
import { Doc } from '../../../../convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { toast } from '@/hooks/use-toast'
import { Switch } from '@/components/ui/switch'
import { formatDate } from '@/lib/utils'

interface Props {
  task: Doc<'tasks'>
}

const TaskSummaryCard: FC<Props> = ({ task }) => {

  const [loading, setLoading] = useState(false)
  const updateTaskStatus = useMutation(api.tasks.updateTaskStatus)
  const [isDone, setIsDone] = useState(task.isDone)

  const toggleComplete = async () => {
    setLoading(true)
    try {
      const newStatus = !isDone
      await updateTaskStatus({
        taskId: task._id,
        isDone: newStatus
      })
      setIsDone(newStatus)
      toast({
        title: "Task status updated",
        description: "Task status updated successfully"
      })
    } catch (error) {
      console.error("Error updating task status", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <li
      key={task._id}
      className="flex items-center justify-between py-3 border-b  last:border-b-0"
    >
      <div className="flex flex-col">
        <span
          className={`text-base font-medium ${isDone && "text-muted-foreground line-through"
            }`}
        >
          {task.title}
        </span>
        <span className="text-sm text-muted-foreground">{formatDate(new Date(task.createdAt))}</span>
      </div>
      <Switch
        checked={isDone}
        onCheckedChange={() => toggleComplete()}
        disabled={loading}
      />
    </li>
  )
}

export default TaskSummaryCard;