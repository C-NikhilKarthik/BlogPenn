"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Register() {
  const [date, setDate] = React.useState<Date>();
  return (
    <div className="w-full h-full relative min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
      <div className="bg-cover w-full absolute top-0 h-full bg-right-top bg-[url('https://tailwindcss.com/_next/static/media/docs-dark@tinypng.1bbe175e.png')]"></div>
      <form className="bg-slate-950/30 z-10 grid h-min lg:grid-cols-2 grid-cols-1  gap-4 max-w-[900px] w-full px-2 py-6 rounded">
        <div className="text-2xl w-full px-4 lg:col-span-2 text-slate-200 font-semibold">
          Register
        </div>
        <div className="w-full flex items-center relative p-1">
          <input
            type="text"
            name="FirstName"
            required
            // onChange={(e) => handleChange(e)}
            className="peer bg-[hsl(222.2_84%_4.9%)] text-slate-400 hover:bg-slate-800 border-slate-800 focus:outline-none focus:border-blue-400 py-2 px-5 border rounded w-full"
          />
          <span className="pointer-events-none peer-focus:text-xs dark:text-slate-400 peer-focus:-translate-y-[100%] peer-valid:text-xs peer-valid:-translate-y-[100%] transition-all bg-transparent/10 backdrop-blur p-1 absolute text-slate-700 left-6 text-sm">
            First Name
          </span>
        </div>

        <div className="w-full flex items-center relative p-1">
          <input
            type="text"
            name="LastName"
            required
            // onChange={(e) => handleChange(e)}
            className="peer bg-[hsl(222.2_84%_4.9%)] text-slate-400 hover:bg-slate-800 border-slate-800 focus:outline-none focus:border-blue-400 py-2 px-5 border rounded w-full"
          />
          <span className="pointer-events-none peer-focus:text-xs dark:text-slate-400 peer-focus:-translate-y-[100%] peer-valid:text-xs peer-valid:-translate-y-[100%] transition-all bg-transparent/10 backdrop-blur p-1 absolute text-slate-700 left-6 text-sm">
            Last Name
          </span>
        </div>

        <div className="w-full flex items-center relative p-1">
          <input
            type="text"
            name="userName"
            required
            // onChange={(e) => handleChange(e)}
            className="peer bg-[hsl(222.2_84%_4.9%)] text-slate-400 hover:bg-slate-800 border-slate-800 focus:outline-none focus:border-blue-400 py-2 px-5 border rounded w-full"
          />
          <span className="pointer-events-none peer-focus:text-xs dark:text-slate-400 peer-focus:-translate-y-[100%] peer-valid:text-xs peer-valid:-translate-y-[100%] transition-all bg-transparent/10 backdrop-blur p-1 absolute text-slate-700 left-6 text-sm">
            User Name
          </span>
        </div>

        <div className="w-full flex items-center relative p-1">
          <input
            type="email"
            name="email"
            required
            // onChange={(e) => handleChange(e)}
            className="peer bg-[hsl(222.2_84%_4.9%)] text-slate-400 hover:bg-slate-800 border-slate-800 focus:outline-none focus:border-blue-400 py-2 px-5 border rounded w-full"
          />
          <span className="pointer-events-none peer-focus:text-xs dark:text-slate-400 peer-focus:-translate-y-[100%] peer-valid:text-xs peer-valid:-translate-y-[100%] transition-all bg-transparent/10 backdrop-blur p-1 absolute text-slate-700 left-6 text-sm">
            Email
          </span>
        </div>

        <div className="w-full flex items-center relative p-1">
          <input
            type="password"
            name="password"
            required
            // onChange={(e) => handleChange(e)}
            className="peer bg-[hsl(222.2_84%_4.9%)] text-slate-400 hover:bg-slate-800 border-slate-800 focus:outline-none focus:border-blue-400 py-2 px-5 border rounded w-full"
          />
          <span className="pointer-events-none peer-focus:text-xs dark:text-slate-400 peer-focus:-translate-y-[100%] peer-valid:text-xs peer-valid:-translate-y-[100%] transition-all bg-transparent/10 backdrop-blur p-1 absolute text-slate-700 left-6 text-sm">
            Password
          </span>
        </div>

        <div className="w-full flex items-center relative p-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start w-full text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto z-50 p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-full flex lg:col-span-2 p-1 justify-end">
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
}
