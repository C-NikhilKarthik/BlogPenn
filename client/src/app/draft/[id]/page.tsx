"use client";

import DraftNavbar from "@/components/draft-navbar";
import React from "react";
import { AppDispatch, RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { drawerToggle } from "@/lib/features/draft-slice";
import { GoSidebarExpand } from "react-icons/go";
import { MdFormatListBulletedAdd, MdAddCard } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { FaRegImages } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Draft() {
  const dispatch = useDispatch<AppDispatch>();

  const DrawerState = useSelector(
    (state: RootState) => state.drawerReducer.drawer
  );

  return (
    <div className="w-full min-h-screen flex h-full relative ">
      <div
        className={`${
          DrawerState
            ? "w-0 invisible opacity-0"
            : "opacity-100 visible w-[17rem]"
        } p-4 flex-none gap-2 transition-[width,opacity] duration-500 border-r borer-r-slate-600 h-screen flex flex-col`}
      >
        <div className="p-4 w-full text-black dark:text-white flex justify-between">
          <div></div>
          <button className="" onClick={() => dispatch(drawerToggle())}>
            <GoSidebarExpand className="text-xl" />
          </button>
        </div>
        <div className="relative flex items-center w-full">
          <span className="absolute left-3">
            <IoSearchSharp />
          </span>
          <input
            placeholder="Search drafts..."
            className="bg-transparent w-full placeholder:text-slate-600 border-slate-700 border-2 focus:outline-none rounded-full py-2 px-2 pl-8 text-sm focus:border-blue-500"
          />
        </div>

        <Button variant="ghost" className="flex justify-start gap-2">
          <MdAddCard />
          New Draft
        </Button>

        <hr className=" w-full bg-slate-600"></hr>

        <Accordion type="multiple" className="w-full px-4 text-sm">
          <AccordionItem className="border-none" value="item-1">
            <AccordionTrigger className="hover:no-underline">
              MY DRAFTS
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-none" value="item-2">
            <AccordionTrigger className="hover:no-underline">
              PUBLISHED
            </AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col p-2 pt-20 flex-1 relative">
        <DraftNavbar />
        <div className="w-full p-4 flex gap-2 h-fit">
          <Button variant="ghost" className="flex gap-2">
            <FaRegImages />
            Add Cover
          </Button>
          <Button variant="ghost" className="flex gap-2">
            <svg
              className="h-5 w-5 stroke-current"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                d="M11.25 11.953h-9m1.2-2.906h11.1c.42 0 .63 0 .79-.082a.75.75 0 0 0 .328-.328c.082-.16.082-.37.082-.79v-.6c0-.42 0-.63-.082-.79a.75.75 0 0 0-.327-.328c-.16-.082-.371-.082-.791-.082H3.45c-.42 0-.63 0-.79.082a.75.75 0 0 0-.328.327c-.082.16-.082.37-.082.79v.6c0 .42 0 .63.082.791a.75.75 0 0 0 .328.328c.16.082.37.082.79.082Z"
                stroke="stroke-current"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            Add Subtitle
          </Button>
        </div>
        <div className="w-full h-fit px-4 flex flex-row-reverse gap-2 items-center">
          <input
            placeholder="Article Title..."
            className="peer w-full focus:outline-none text-3xl font-bold p-1 bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
          <button className="rounded-full flex flex-none items-center opacity-0 peer-hover:opacity-100 aspect-square h-min p-2 peer-hover:bg-slate-700/50 bg-transparent ">
            <MdFormatListBulletedAdd />
          </button>
        </div>
      </div>
    </div>
  );
}
