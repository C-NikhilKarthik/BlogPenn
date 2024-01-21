"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { PiMedalFill } from "react-icons/pi";
import { useEffect, useState } from "react";

import { AppDispatch, RootState } from "@/lib/store";
import { Icons } from "@/components/icons";
import { useSelector, useDispatch } from "react-redux";
import { setToken, logIn, setLoading } from "@/lib/features/auth-slice";
import Link from "next/link";

export default function Home() {
  const loggedIn = useSelector(
    (state: RootState) => state.authReducer.user.loggedIn
  );

  const loading = useSelector((state: RootState) => state.authReducer.loading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedToken = localStorage.getItem("user");

    if (storedToken) {
      dispatch(setToken(storedToken));
      dispatch(logIn());
    }

    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <div className="min-w-screen min-h-screen h-full w-full flex items-center justify-center">
      {loading ? (
        <Icons.spinner className=" animate-spin" />
      ) : (
        <main className="flex pt-20 w-full min-h-screen h-full flex-col items-center justify-between">
          <Navbar />
          {loggedIn ? (
            <div className="w-full xl:px-20 xl:max-w-7xl max-w-3xl flex xl:flex xl:flex-row flex-col">
              <div className="w-full flex-1 flex flex-col">
                <div className="w-full gap-3 flex">
                  <Link className="w-fit" href="/">
                    <div className="rounded-full flex w-fit px-3 py-1 items-center gap-2 bg-transparent hover:bg-slate-200 hover:dark:bg-slate-800">
                      <FaWandMagicSparkles />
                      Personalized
                    </div>
                  </Link>
                  <Link className="w-fit" href="/following">
                    <div className="rounded-full flex w-fit px-3 py-1 items-center gap-2 bg-transparent hover:bg-slate-200 hover:dark:bg-slate-800">
                      <IoPeople />
                      Following
                    </div>
                  </Link>
                  <Link className="w-fit" href="/featured">
                    <div className="rounded-full flex w-fit px-3 py-1 items-center gap-2 bg-transparent hover:bg-slate-200 hover:dark:bg-slate-800">
                      <PiMedalFill />
                      Featured
                    </div>
                  </Link>
                </div>
              </div>
              <div className="w-[340px] flex-none flex flex-col"></div>
            </div>
          ) : (
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
          )}
        </main>
      )}
    </div>
  );
}
