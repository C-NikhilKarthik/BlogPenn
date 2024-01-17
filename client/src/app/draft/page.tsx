"use client";

import DraftNavbar from "@/components/draft-navbar";
import React from "react";
import { AppDispatch, RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { drawerToggle } from "@/lib/features/draft-slice";
import { GoSidebarExpand } from "react-icons/go";

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
        } p-2 flex-none transition-[width,opacity] duration-500 border-r borer-r-slate-600 h-screen flex flex-col`}
      >
        <div className="p-4 w-full text-black dark:text-white flex justify-between">
          <div></div>
          <button className="" onClick={() => dispatch(drawerToggle())}>
            <GoSidebarExpand className="text-xl" />
          </button>
        </div>
      </div>
      <div className="flex flex-1 relative">
        <DraftNavbar />
      </div>
    </div>
  );
}
