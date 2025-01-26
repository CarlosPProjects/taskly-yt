'use client'

import { Bot, CheckCircle, Clock, List, LucideIcon, Send, TrendingUp } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { useChat } from "ai/react";
import { useUser } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import Markdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SuggestCard = {
  id: number
  Icon: LucideIcon
  prompt: string
}

const suggestCards: SuggestCard[] = [
  {
    id: 1,
    Icon: TrendingUp,
    prompt: "Analyze my tasks to find automation opportunities",
  },
  {
    id: 2,
    Icon: Clock,
    prompt: "Suggest deadline strategies for my current tasks",
  },
  {
    id: 3,
    Icon: List,
    prompt: "Help me categorize tasks by urgency/importance",
  },
  {
    id: 4,
    Icon: CheckCircle,
    prompt: "Analyze my progress patterns for improvements",
  },
];

const ChatbotPage = () => {

  const { user } = useUser()
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [chatStarted, setChatStarted] = useState(false);
  const [showContent, setShowContent] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    (messagesEndRef.current as unknown as HTMLDivElement)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (ref.current?.submit) {
      setChatStarted(true);
    }
  }, [chatStarted]);

  const handleSubmitWithHide = (e: React.FormEvent<HTMLFormElement>) => {
    setShowContent(false);
    handleSubmit(e);
  };

  const handleCardClick = (description: string) => {
    handleInputChange({
      target: { value: description },
    } as React.ChangeEvent<HTMLInputElement>);
    setTimeout(() => {
      if (ref.current) {
        ref.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    }, 0);
  };

  return (
    <div className="flex items-center w-full bg-background">
      <div className={cn("flex flex-col justify-end w-full mx-auto max-w-3xl", showContent ? "h-fit" : "h-full")}>
        {showContent ? (
          <div>
            <div className="space-y-2 text-start">
              <h1 className="text-4xl font-semibold">
                Hi there,{" "}
                <span className="bg-gradient-to-r from-foreground to-red-500 bg-clip-text text-transparent">
                  {user?.firstName ? user?.firstName : 'Anonymous'}
                </span>
              </h1>
              <h2 className="text-2xl">
                What{" "}
                <span className="bg-gradient-to-r from-foreground to-red-500 bg-clip-text text-transparent">
                  would you like to{" "}
                </span>
                <span className="bg-gradient-to-r from-foreground to-red-500 bg-clip-text text-transparent">
                  know?
                </span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Use one of the most common prompts below or use your own to
                begin
              </p>
            </div>
            {/* Suggestion Cards */}
            <div className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-4">
              {suggestCards.map(({ id, Icon, prompt }) => (
                <React.Fragment key={id}>
                  <Card
                    className="p-4 hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleCardClick(prompt)}
                  >
                    <div className="flex flex-col h-full items-start justify-between gap-4 ">
                      <div className="space-y-1">
                        <p className="text-sm">{prompt}</p>
                      </div>

                      <Icon className="size-4" strokeWidth={1.5} />
                    </div>
                  </Card>
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (

          <div className="mt-8 flex flex-col gap-4 overflow-y-scroll max-h-[600px] __hideScrollBar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                {message.role === "assistant" && (
                  <div className="rounded-full border border-border mt-1 p-2 hidden sm:block">
                    <Bot className="size-5" />
                  </div>
                )}
                <div className="flex flex-col gap-2 max-w-[90%]">
                  {message.toolInvocations && message.toolInvocations.length > 0 ? (
                    message.toolInvocations.map(toolInvocation => {
                      const { toolName, toolCallId, state } = toolInvocation;

                      if (state === 'result') {
                        if (['createTask', 'getTasks', 'deleteTask', 'updateTask', 'updateTaskStatus'].includes(toolName)) {
                          return (
                            <div key={toolCallId} className="font-mono text-sm bg-zinc-900 border border-zinc-800 rounded-md py-3 px-6" >
                              <div className="text-emerald-400">
                                <span className="text-emerald-500">success</span> Operation completed ✓
                              </div>
                            </div>
                          )
                        }
                      } else {
                        return (
                          <div key={toolCallId} className="font-mono text-sm bg-zinc-900 border border-zinc-800 rounded-md py-3 px-6">
                            <div className="text-blue-400">
                              <span className="text-blue-500">exec</span> Working on it<span className="ml-2 animate-pulse">...</span>
                            </div>
                          </div>
                        )
                      }
                    })
                  ) : (
                    <div className="font-mono text-sm bg-muted/70 border rounded-md py-3 px-6">
                      <Markdown>{message.content}</Markdown>
                    </div>
                  )}
                  {message.toolInvocations && message.toolInvocations.length > 0 && message.content && (
                    <div className="font-mono text-sm bg-muted/70 border rounded-md py-3 px-6">
                      <Markdown>{message.content}</Markdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        {/* Input Area */}
        <form className="mt-8" onSubmit={handleSubmitWithHide} ref={ref}>
          <div className="relative">
            <Input
              className="pr-24 rounded-xl py-6"
              placeholder="Ask whatever you want..."
              type="text"
              value={input}
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
              <Button
                size="icon"
                className="h-8 w-8 rounded-md bg-primary text-primary-foreground"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatbotPage