'use client'

import { Bot, LayoutDashboard, ListTodo, LogOut, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/clerk-react";

type Route = {
  name: string;
  href: string;
  Icon: LucideIcon
}

const routes: Route[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    Icon: LayoutDashboard,
  },
  {
    name: "Chatbot",
    href: "/dashboard/chatbot",
    Icon: Bot,
  },
  {
    name: "Tasks",
    href: "/dashboard/tasks",
    Icon: ListTodo,
  },
];

interface Props {
  closeSheet?: () => void
}

const Sidebar: FC<Props> = ({ closeSheet }) => {

  const pathname = usePathname();

  return (
    <nav className="flex flex-col justify-between gap-2 w-full lg:w-fit xl:w-full pr-8 lg:border-r border-border">
      <ul className="flex flex-col gap-2">
        {routes.map(({ name, href, Icon }) => (
          <li key={name}>
            <Link href={href} onClick={closeSheet}>
              <Button
                variant="ghost"
                className="w-full lg:w-fit xl:w-full justify-start font-medium text-muted-foreground h-auto text-base py-3"
              >
                <Icon
                  className={cn(
                    "!size-5",
                    pathname === href && "text-primary"
                  )}
                />
                <span
                  className={cn(
                    "block lg:hidden xl:block",
                    pathname === href && "text-primary"
                  )}
                >
                  {name}
                </span>
              </Button>
            </Link>
          </li>
        ))}
      </ul>
      <SignOutButton>
        <Button
          variant="ghost"
          className="w-full justify-start font-medium text-muted-foreground h-auto text-base py-3"
        >
          <LogOut className="!size-5" />
          <span className="block lg:hidden xl:block">Log out</span>
        </Button>
      </SignOutButton>
    </nav>
  )
}

export default Sidebar;