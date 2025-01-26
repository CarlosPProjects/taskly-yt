'use client'

import { useState, type FC } from 'react'
import { Doc } from '../../../../convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { toast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'

interface Props {
  task: Doc<'tasks'>
  isUpdating: boolean
  setIsUpdating: (value: boolean) => void
}

const TaskName: FC<Props> = ({ task, isUpdating, setIsUpdating }) => {

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(task.title);
  const updateTask = useMutation(api.tasks.updateTaskTitle)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    try {
      await updateTask({
        taskId: task._id,
        title: name
      })
      toast({
        title: 'Task name updated',
        description: 'Task name has been updated successfully',
      })
    } catch (error) {
      console.error("Error updating task name", error)
    } finally {
      setLoading(false)
      setIsUpdating(false)
    }

  }
  return isUpdating ? (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        defaultValue={task.title}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
    </form>
  ) : (
    <h3 className="text-base font-medium">{name}</h3>
  );
}

export default TaskName;
