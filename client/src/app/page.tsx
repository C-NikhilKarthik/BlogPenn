"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";

import { AppDispatch, RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { setToken, logIn } from "@/lib/features/auth-slice";
import { Sheet } from "@/components/ui/sheet";

export default function Home() {
  const loggedIn = useSelector(
    (state: RootState) => state.authReducer.user.loggedIn
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      setToken(
        localStorage.getItem("user") ? localStorage.getItem("user")! : ""
      )
    );
    if (localStorage.getItem("user")) {
      dispatch(logIn());
    }
  });
  return (
    <Sheet>
      <main className="flex min-h-screen h-full flex-col items-center justify-between">
        <Navbar />
        <div className="h-screen w-full items-center justify-center font-mono text-sm flex flex-col">
          <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <div className="text-4xl font-bold">
              Unleash your inner creativity
            </div>

            <div className="text-2xl font-semibold">
              Design and publish your blog with ease!
            </div>
          </div>
        </div>
      </main>
    </Sheet>
  );
}
