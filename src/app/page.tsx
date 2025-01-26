import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 flex items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:6rem_4rem]">
      </div>
      <section className="w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center space-y-10 text-center">
        <header className="w-full flex flex-col items-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">Your AI Task Assistant</h1>
          <p className="max-w-[600px] text-lg text-gray-600 md:text-xl/relaxed xl:text-2xl/relaxed">
            Meet your intelligent task companion that not only helps you organize but actively assists in getting things done!
            <br />
            <span className="text-gray-400 text-sm">
              Powered by Vercel AI SDK & your favourite LLM&apos;s.
            </span>
          </p>
        </header>

        <SignedIn>
          <Link href="/dashboard">
            <button className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInButton
            mode="modal"
            fallbackRedirectUrl={"/dashboard"}
            forceRedirectUrl={"/dashboard"}
          >
            <button className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl ">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </SignInButton>
        </SignedOut>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-8 max-w-3xl mx-auto">
          {[
            { title: "Intelligent", description: "AI-powered task management and assistance" },
            {
              title: "Efficient",
              description: "Streamlined workflow with real-time updates",
            },
            { title: "Collaborative", description: "Works alongside you to achieve your goals" },
          ].map(({ title, description }) => (
            <div key={title} className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {title}
              </div>
              <div className="text-sm text-gray-600 mt-1">{description}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home