import * as React from "react";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";

import { IoSearchOutline } from "react-icons/io5";
import { TbHexagonLetterB } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ModeToggle } from "./dark-mode";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavigationMenuDemo } from "./navigation";
import { Icons } from "@/components/icons";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/hooks/redux/store";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { updateLoggedIn } from "@/hooks/redux/features/auth-slice";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const User = useSelector((state: RootState) => state.authReducer.user);
  const LoggedIn = useSelector(
    (state: RootState) => state.authReducer.loggedIn
  );

  const navigate = useNavigate();
  const userId = User.id;

  const createBlog = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5050/blog/getDraftedBlog/${userId}`
      );
      if (res.data.status === 200 && res.data.data.message !== null) {
        const id = res?.data?.data?.message?.[0]?.blogid;

        navigate(`/draft/${id}`);
        return;
      }
      const response = await axios.post(
        "http://localhost:5050/blog/createEmpty",
        { id: userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const id = response.data.blogid;

      navigate(`/draft/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const notLogged = (
    <ul className="grid gap-3 p-6 md:w-[300px] lg:w-[400px] lg:grid-cols-[1fr_1fr]">
      <li className="row-span-3">
        <NavigationMenuLink asChild>
          <Link
            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
            to="/"
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
      {!LoggedIn && (
        <Link to="/onboard/register">
          <Button variant="outline">Register</Button>
        </Link>
      )}
    </ul>
  );

  const logged = (
    <ul className="grid gap-2 p-1 md:w-[300px] lg:w-[400px] lg:grid-cols-[1fr_1fr]">
      <li className="row-span-3">
        <NavigationMenuLink asChild>
          <Link
            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
            to="/"
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
      <div className="w-full flex flex-col items-center h-full p-1 gap-2 justify-center">
        <button
          type="button"
          onClick={() => createBlog()}
          className="rounded justify-center w-full flex items-center bg-blue-600 hover:bg-blue-500 text-white border-transparent focus:dark:bg-blue-600 focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed disabled:dark:bg-blue-900 disabled:dark:text-slate-400 text-sm py-3 px-6 gap-2"
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
          <span>Draft Blog</span>
        </button>
        {/* </Link> */}
        <Button
          className="w-full"
          onClick={() => {
            // setLoggedIn(false);
            dispatch(updateLoggedIn(false));
            localStorage.removeItem("user");
          }}
        >
          Logout
        </Button>
      </div>
    </ul>
  );

  return (
    <nav className="z-10 fixed flex bg-black/10 backdrop-blur items-center top-0 left-0 w-full border-b-gray-200 border-b py-4 px-6 justify-between">
      <div className="flex items-center">
        <TbHexagonLetterB className="text-black dark:text-white text-4xl" />

        <div className="font-bold text-black dark:text-white text-xl">
          logPenn
        </div>
      </div>

      <div className="md:flex hidden items-center gap-5">
        {!LoggedIn && <NavigationMenuDemo>{notLogged}</NavigationMenuDemo>}
        <IoSearchOutline className="text-xl" />

        {LoggedIn && (
          <>
            <NavigationMenuDemo>{logged}</NavigationMenuDemo>
            <ModeToggle />
            <IoIosNotificationsOutline className="text-2xl" />
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  className="rounded-full h-10 border border-black aspect-square bg-[url('https://storage.googleapis.com/opensea-static/opensea-profile/10.png')] "
                  variant="link"
                ></Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold">{User.userName}</h4>
                    <h4 className="text-xs text-slate-300">{User.email}</h4>
                    <p className="text-sm mt-3">
                      The React Framework – created and maintained by @vercel.
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Joined December 2021
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </>
        )}
      </div>
      <div className="flex md:hidden">
        <Button variant="outline">
          <GiHamburgerMenu className="text-xl" />
        </Button>
      </div>
    </nav>
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
