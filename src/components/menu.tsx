'use client'

import React, { useState } from 'react'
import { Sheet, SheetTitle, SheetHeader, SheetContent, SheetTrigger } from './ui/sheet'
import { AlignLeft } from 'lucide-react'
import Link from 'next/link'
import Sidebar from './sidebar'

const Menu = () => {

  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => {
    setIsOpen(false);
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <AlignLeft className="size-6 cursor-pointer text-muted-foreground" />
        </SheetTrigger>
        <SheetContent className="border-border" side="left">
          <SheetHeader>
            <SheetTitle className="py-12 flex justify-center">
              <Link href={"/"} className="font-semibold text-2xl">
                Taskly
              </Link>
            </SheetTitle>
          </SheetHeader>
          <Sidebar closeSheet={closeSheet} />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Menu