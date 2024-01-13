"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { TbHexagonLetterB } from "react-icons/tb";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import {
  FaGoogle,
  FaGithub,
  FaApple,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";
import "dotenv/config"; // Correct import for dotenv

import { logIn, setToken } from "@/lib/features/auth-slice";
import { AppDispatch, RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();

  const { toast } = useToast();
  const [part, setPart] = useState(0);
  const formData = new FormData();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const value = e.target.value;

    formData.append(field, value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    console.log("here");
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      const response = await axios.post(
        "http://localhost:5050/api/auth/login",
        Object.fromEntries(formData.entries()), // Convert FormData to plain JS object
        {
          headers: {
            "Content-Type": "application/json",
            // accept: "application/json",
          },
        }
      );

      if (response.data) {
        dispatch(setToken(response.data.token));
        localStorage.setItem("user", response.data.token);
        dispatch(logIn());
        router.push("/");

        toast({
          title: "Success",
          description: "Login successful",
        });
      }
    } catch (err: AxiosError) {
      toast({
        title: "Error",
        description: err.response.data.message,
      });

      console.log(err);
    }
  };

  return (
    <div className="w-full flex md:flex-row flex-col h-full md:h-screen">
      <div className="flex-none bg-cover md:h-full md:w-72 w-full h-72 bg-center bg-[url('https://cdn.hashnode.com/res/hashnode/image/upload/v1695109216925/GH1o67-ZP.png?auto=format&width=500')]"></div>
      <div className="flex-auto flex md:flex-row flex-col items-center relative">
        <div className="flex p-12 max-w-[32rem] flex-col w-full gap-20 border border-slate-200 dark:border-slate-700 backdrop-blur justify-between rounded-3xl -top-40 md:top-auto md:-left-40 bg-white dark:bg-slate-900 relative">
          <div className="flex w-full justify-center items-center">
            <TbHexagonLetterB className="text-black dark:text-white text-5xl" />
            <div className="font-bold text-black dark:text-white text-2xl">
              logPenn
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <div
              className={`transition duration-500 flex w-[200%] relative ${
                part === 0 ? "translate-x-0" : "-translate-x-1/2"
              }`}
            >
              <div className="flex gap-6 w-full flex-col items-center px-3">
                <div className="font-semibold text-xl">Log in or Sign up</div>

                <button className="rounded-full items-center w-full justify-center flex bg-blue-600 hover:bg-blue-500 text-white border-transparent focus:dark:bg-blue-600 focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed disabled:dark:bg-blue-900 disabled:dark:text-slate-400 text-base py-3 px-6 gap-2">
                  <FaGoogle />
                  Continue with Google
                </button>
                <div className="w-full flex gap-4 justify-between">
                  <button className="border border-slate-400 dark:text-white text-slate-950 rounded-full py-3 w-full justify-center flex">
                    <FaGithub />
                  </button>

                  <button className="border border-slate-400 dark:text-white text-slate-950 rounded-full py-3 w-full justify-center flex">
                    <FaApple />
                  </button>

                  <button className="border border-slate-400 dark:text-white text-slate-950 rounded-full py-3 w-full justify-center flex">
                    <FaLinkedin />
                  </button>

                  <button className="border border-slate-400 dark:text-white text-slate-950 rounded-full py-3 w-full justify-center flex">
                    <FaFacebook />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setPart(1);
                  }}
                  className="text-blue-600 text-sm flex gap-1 items-center"
                >
                  Sign in with email
                  <MdNavigateNext className="text-lg" />
                </button>
              </div>

              <div className="flex w-full flex-col gap-6 items-center">
                <div className="font-semibold text-xl">Sign in with email</div>
                <form
                  onSubmit={onSubmit}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="w-full flex items-center relative p-1">
                    <input
                      type="email"
                      name="email"
                      required
                      onChange={(e) => handleChange(e)}
                      className="peer bg-transparent border-slate-200 focus:outline-none focus:border-blue-400 py-3 px-5 border rounded-full w-full"
                    />
                    <span className="pointer-events-none peer-focus:text-xs dark:bg-slate-900 dark:text-slate-500 peer-focus:-translate-y-[100%] peer-valid:text-xs peer-valid:-translate-y-[100%] transition-all bg-white p-1 absolute text-slate-700 left-6 text-sm">
                      Enter your email address
                    </span>
                  </div>

                  <div className="w-full flex items-center relative p-1">
                    <input
                      type="password"
                      name="password"
                      required
                      onChange={(e) => handleChange(e)}
                      className="peer bg-transparent border-slate-200 focus:outline-none focus:border-blue-400 py-3 px-5 border rounded-full w-full"
                    />
                    <span className="pointer-events-none peer-focus:text-xs dark:bg-slate-900 dark:text-slate-500 peer-focus:-translate-y-[100%] peer-valid:text-xs peer-valid:-translate-y-[100%] transition-all bg-white p-1 absolute text-slate-700 left-6 text-sm">
                      Enter your password
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="rounded-full mt-3 flex bg-blue-600 hover:bg-blue-500 text-white border-transparent focus:dark:bg-blue-600 focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:focus:ring-offset-slate-800 disabled:bg-blue-200 disabled:cursor-not-allowed disabled:dark:bg-blue-900 disabled:dark:text-slate-400 text-base py-3 px-6 w-full items-center justify-center"
                    data-id="googleAuth"
                  >
                    Continue
                  </button>
                </form>
                <button
                  onClick={() => {
                    setPart(0);
                  }}
                  className="text-blue-600 text-sm flex gap-1 items-center"
                >
                  <GrFormPrevious className="text-lg text-blue-600" />
                  Sign in with email
                </button>
              </div>
            </div>
          </div>
          <div className="text-xs text-[rgb(100,116,139)] text-center">
            By logging in or signing up using the options above, you agree to
            BlogPenn&apos;s Terms & Conditions and Privacy Policy
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="rounded-full hover:bg-slate-100 py-2 px-3 absolute top-20 right-20 items-center flex gap-2"
        >
          <GrFormPrevious className="text-lg" />
          Go back
        </button>
      </div>
    </div>
  );
}
