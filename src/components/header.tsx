'use client'

import Link from "next/link"
import Container from "./container"
import { UserButton } from "@clerk/clerk-react"

const Header = () => {
  return (
    <header className="border-b border-border py-3">
      <Container className="flex flex-row justify-between items-center">
        <div className="block lg:hidden">
          {/* <Menu /> */}
        </div>
        <div className="hidden lg:block">
          <Link href={"/"} className="font-semibold text-2xl">
            Taskly
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "h-8 w-8 ring-2 ring-gray-200/50 ring-offset-2 rounded-full transition-shadow hover:ring-gray-300/50",
                },
              }}
            />
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header