'use client'

import { useState, type FC } from 'react'
import { Doc } from '../../../../convex/_generated/dataModel'
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { toast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import TaskName from './task-name';

interface Props {
  task: Doc<"tasks">
}

const TaskCard: FC<Props> = ({ task }) => {

  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDone, setIsDone] = useState(task.isDone)

  const updateTaskStatus = useMutation(api.tasks.updateTaskStatus)
  const deleteTask = useMutation(api.tasks.deleteTask)

  const toggleComplete = async () => {
    setLoading(true)
    try {
      const newStatus = !task.isDone
      await updateTaskStatus({
        taskId: task._id,
        isDone: newStatus
      })
      setIsDone(newStatus)
      toast({
        title: "Task updated",
        description: "Task updated successfully",
      })
    } catch (error) {
      console.error('Error updating task status', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)

    try {
      await deleteTask({
        taskId: task._id
      })
      toast({
        title: "Task deleted",
        description: "Task deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      key={task._id}
      className={cn(
        "rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg",
        loading && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-center justify-between mb-4 gap-4">
        <TaskName
          task={task}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
        />
        <span className="text-xs text-muted-foreground text-nowrap">
          {formatDate(new Date(task.createdAt))}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setIsUpdating(true)}
            className="text-muted-foreground"
            variant="secondary"
            disabled={isUpdating}
          >
            <Edit2 className="size-5" />
          </Button>
          <Button
            onClick={() => handleDelete()}
            className="text-muted-foreground"
            variant="secondary"
            disabled={isUpdating}
          >
            <Trash2 className="size-5" />
          </Button>
        </div>

        <Switch
          checked={isDone}
          onCheckedChange={() => toggleComplete()}
          disabled={loading || isUpdating}
        />
      </div>
    </Card>
  )
}

export default TaskCard;