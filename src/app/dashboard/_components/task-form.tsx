'use client'

import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";

const TaskForm = () => {

  const { user } = useUser()
  const formRef = React.useRef<HTMLFormElement>(null);
  const createTask = useMutation(api.tasks.createTask)

  if (!user) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    createTask({
      title: formData.get('task') as string,
      userId: user.id
    })

    toast({
      title: 'Created',
      description: 'Task created successfully',
    })

    formRef.current?.reset()
  }

  return (
    <Card className="col-span-full md:col-span-2 lg:col-span-3 mb-3">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} className="flex" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="task"
            placeholder="Enter task name"
            className="flex-grow mr-2"
            required
          />
          <Button type="submit">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default TaskForm