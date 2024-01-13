"use client";
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { IoSearchOutline } from "react-icons/io5";
import { TbHexagonLetterB } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ModeToggle } from "./dark-mode";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavigationMenuDemo } from "./navigation";

import { Icons } from "@/components/icons";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

import { logOut } from "@/lib/features/auth-slice";
import { AppDispatch, RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";

export default function Navbar() {
  const loggedIn = useSelector(
    (state: RootState) => state.authReducer.user.loggedIn
  );

  const dispatch = useDispatch<AppDispatch>();

  const notLogged = (
    <ul className="grid gap-3 p-6 md:w-[300px] lg:w-[400px] lg:grid-cols-[1fr_1fr]">
      <li className="row-span-3">
        <NavigationMenuLink asChild>
          <Link
            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
            href="/"
          >
            <Icons.logo className="h-6 w-6" />
            <div className="mb-2 mt-4 text-lg font-medium">BlogPenn</div>
            <p className="text-sm leading-tight text-muted-foreground">
              Empower Your Voice, Transform Your Thoughts: BlogPenn – Where AI
              Meets Creativity
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
      <ListItem href="/onboard" title="Login">
        Re-usable components built using Radix UI and Tailwind CSS.
      </ListItem>
      {!loggedIn && (
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
      )}
    </ul>
  );

  const logged = (
    <ul className="grid gap-3 p-6 md:w-[300px] lg:w-[400px] lg:grid-cols-[1fr_1fr]">
      <li className="row-span-3">
        <NavigationMenuLink asChild>
          <Link
            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
            href="/"
          >
            <Icons.logo className="h-6 w-6" />
            <div className="mb-2 mt-4 text-lg font-medium">BlogPenn</div>
            <p className="text-sm leading-tight text-muted-foreground">
              Empower Your Voice, Transform Your Thoughts: BlogPenn – Where AI
              Meets Creativity
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
      <Link href={"/draft"}>
        <button
          type="button"
          className="rounded-full w-full flex items-center bg-blue-600 hover:bg-blue-500 text-white border-transparent focus:dark:bg-blue-600 focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed disabled:dark:bg-blue-900 disabled:dark:text-slate-400 text-sm py-3 px-6 gap-2"
        >
          <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
            <path
              stroke="currentColor"
              d="M12.77 3.897 7.587 9.078c-.344.344-.515.516-.659.708-.128.17-.238.353-.331.545-.105.216-.178.448-.324.911l-.763 2.413 2.413-.762c.463-.147.695-.22.911-.324.192-.093.375-.204.545-.332.193-.143.364-.315.708-.659l5.181-5.18m-2.5-2.5.981-.981c.34-.341.511-.512.695-.603a1.25 1.25 0 0 1 1.11 0c.184.091.354.262.695.603.34.34.511.51.602.695.174.35.174.76 0 1.11-.09.183-.261.354-.602.694l-.98.981m-2.5-2.5 2.5 2.5M16.666 17.5H3.333"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
            ></path>
          </svg>
          <span>Join the community</span>
        </button>
      </Link>
      <Button
        onClick={() => {
          dispatch(logOut());
          localStorage.removeItem("user");
        }}
      >
        Logout
      </Button>
    </ul>
  );

  return (
    <Drawer>
      <nav className="z-10 fixed flex bg-black/10 backdrop-blur items-center top-0 left-0 w-full border-b-gray-200 border-b py-4 px-6 justify-between">
        <div className="flex items-center">
          <TbHexagonLetterB className="text-black dark:text-white text-4xl" />

          <div className="font-bold text-black dark:text-white text-xl">
            logPenn
          </div>
        </div>

        <div className="md:flex hidden items-center gap-5">
          {!loggedIn && <NavigationMenuDemo>{notLogged}</NavigationMenuDemo>}
          <IoSearchOutline className="text-xl" />
          <ModeToggle />

          {loggedIn && (
            <>
              <NavigationMenuDemo>{logged}</NavigationMenuDemo>{" "}
              <IoIosNotificationsOutline className="text-2xl" />
              <Link href="/profile">
                <div className="rounded-full h-10 border border-black aspect-square bg-[url('https://storage.googleapis.com/opensea-static/opensea-profile/10.png')] "></div>
              </Link>
            </>
          )}
        </div>
        <div className="flex md:hidden">
          <Button variant="outline">
            <GiHamburgerMenu className="text-xl" />
          </Button>
        </div>
      </nav>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
