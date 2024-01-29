import DraftNavbar from "@/components/draft-navbar";
import React, { useContext, useEffect, useState } from "react";
import { GoSidebarExpand } from "react-icons/go";
import { MdFormatListBulletedAdd, MdAddCard } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { RiSave3Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { FaRegImages } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { appContext } from "@/hooks/context/appContext";
import { AppGlobal } from "@/@types/global";
import { useParams } from "react-router-dom";
import { Blog } from "@/@types/blogs";

interface Data {
  heading: string;
  content: string;
}

interface BlogDetails {
  drafts: Blog[];
}
export default function Draft() {
  const appGlobalValue = useContext(appContext);
  const { openDrawer, saveUser, setLoggedIn, setLoading, setOpenDrawer } =
    appGlobalValue as AppGlobal;

  const params = useParams();
  const [userId, setUserId] = useState<string>("");
  const [blogDetails, setBlogDetails] = useState<BlogDetails>({
    drafts: [],
  });
  const [data, setData] = useState<Data>({
    heading: "",
    content: "",
  });

  const getAllDrafts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/blog/getDraftedBlog/${userId}`
      );

      if (response) {
        if (
          response.data.status === 200 &&
          response.data.data.message !== null
        ) {
          const id = response?.data?.data?.message;
          console.log(id);
          setBlogDetails({ drafts: id });
        }
      } else {
        toast({
          title: "Error",
          description: response.data.message,
        });
      }
    } catch (err: AxiosError) {
      toast({
        title: "Error",
        description: err.response?.data.message || "An error occurred",
      });

      console.log(err);
    }
  };

  const getDraft = async () => {
    try {
      const response = (await axios.get(
        `http://localhost:5050/blog/getOneBlog/${params.id}`
      )) as {
        data: {
          status: number;
          message: string;
          data: { message: { heading: string; content: string } };
        };
      };
      if (response) {
        const PrevData = response.data.data.message;

        setData({
          heading: PrevData.heading,
          content: PrevData.content,
        });
      } else {
        toast({
          title: "Error",
          description: response.data.message,
        });
      }
    } catch (err: AxiosError) {
      toast({
        title: "Error",
        description: err.response?.data.message,
      });

      console.log(err);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const value = e.target.value;

    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const SaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5050/blog/updateBlog/${params.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        toast({
          title: "Success",
          description: "Saved Successfully",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.message,
        });
      }
    } catch (err: AxiosError) {
      toast({
        title: "Error",
        description: err.response?.data.message,
      });

      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem("user");
      if (storedToken) {
        try {
          const response = await axios.post(
            "http://localhost:5050/auth/checkToken",
            { token: storedToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.status === 200) {
            saveUser({
              id: response.data.data.decode.id,
              email: response.data.data.decode.email,
              token: storedToken,
            });

            setUserId(response.data.data.decode.id);
            setLoggedIn(true);
          } else {
            toast({
              title: "Error",
              description: response.data.data.message,
            });
          }
        } catch (err) {
          toast({
            title: "Error",
            description: err.response?.data.message || "An error occurred",
          });
          console.error(err);
        }
      }

      setLoading(false);
    };

    fetchData();
    getDraft();
    getAllDrafts();
  }, [userId]);

  return (
    <div className="w-full min-h-screen flex h-full relative ">
      <div
        className={`${
          !openDrawer
            ? "w-0 invisible opacity-0"
            : "opacity-100 visible w-[17rem]"
        } p-4 flex-none gap-2 transition-[width,opacity] duration-500 border-r borer-r-slate-600 h-screen flex flex-col`}
      >
        <div className="p-4 w-full text-black dark:text-white flex justify-between">
          <div></div>
          <button className="" onClick={() => setOpenDrawer(false)}>
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
          <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
            <path
              fill="currentColor"
              d="M14.792 9.583a.625.625 0 1 0 1.25 0h-1.25Zm-3.959 8.542a.625.625 0 1 0 0-1.25v1.25Zm2.084-11.667a.625.625 0 0 0 0-1.25v1.25ZM6.25 5.208a.625.625 0 0 0 0 1.25v-1.25Zm5 4.584a.625.625 0 1 0 0-1.25v1.25Zm-5-1.25a.625.625 0 1 0 0 1.25v-1.25Zm8.542 8.958a.625.625 0 1 0 1.25 0h-1.25Zm1.25-5a.625.625 0 0 0-1.25 0h1.25Zm-3.125 1.875a.625.625 0 1 0 0 1.25v-1.25Zm5 1.25a.625.625 0 0 0 0-1.25v1.25ZM6.25 3.125h6.667v-1.25H6.25v1.25ZM14.792 5v4.583h1.25V5h-1.25Zm-3.959 11.875H6.25v1.25h4.583v-1.25ZM4.375 15V5h-1.25v10h1.25Zm1.875 1.875A1.875 1.875 0 0 1 4.375 15h-1.25c0 1.726 1.4 3.125 3.125 3.125v-1.25Zm6.667-13.75c1.035 0 1.875.84 1.875 1.875h1.25c0-1.726-1.4-3.125-3.125-3.125v1.25ZM6.25 1.875A3.125 3.125 0 0 0 3.125 5h1.25c0-1.036.84-1.875 1.875-1.875v-1.25Zm6.667 3.333H6.25v1.25h6.667v-1.25ZM11.25 8.542h-5v1.25h5v-1.25Zm4.792 8.958V15h-1.25v2.5h1.25Zm0-2.5v-2.5h-1.25V15h1.25Zm-3.125.625h2.5v-1.25h-2.5v1.25Zm2.5 0h2.5v-1.25h-2.5v1.25Z"
            ></path>
          </svg>
          New Draft
        </Button>

        <hr className=" w-full bg-slate-600"></hr>

        <Accordion type="multiple" className="w-full text-sm">
          <AccordionItem className="border-none" value="item-1">
            <AccordionTrigger className="hover:no-underline">
              MY DRAFTS ({blogDetails?.drafts?.length})
            </AccordionTrigger>
            <AccordionContent>
              {blogDetails?.drafts?.map((draft) => (
                <button className="flex rounded w-full bg-slate-800 py-[6px] px-3 hover:bg-slate-800 text-white justify-between">
                  <div className="flex gap-2">
                    <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
                      <path
                        stroke="currentColor"
                        d="M11.66 2.65v3.183a.834.834 0 0 0 .834.834h3.19M11.66 2.649a1.667 1.667 0 0 0-.69-.149H6.667a2.5 2.5 0 0 0-2.5 2.5v10a2.5 2.5 0 0 0 2.5 2.5h6.666a2.5 2.5 0 0 0 2.5-2.5V7.358c0-.241-.052-.476-.15-.691m-4.022-4.018c.18.082.345.196.488.338l3.195 3.191c.143.143.257.309.34.489M7.5 10h5m-5 3.333h3.333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.25"
                      ></path>
                    </svg>
                    {draft?.heading}
                  </div>
                </button>
              ))}
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
        <div className="w-full pr-2 items-center flex justify-between">
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

          <Button
            type="submit"
            form="Form"
            variant="outline"
            className="flex gap-2"
          >
            <RiSave3Fill />
            Save
          </Button>
        </div>

        <form
          id="Form"
          onSubmit={SaveDraft}
          className="w-full h-fit px-4 flex flex-row-reverse gap-2 items-center"
        >
          <input
            onChange={(e) => handleChange(e)}
            name="heading"
            value={data.heading}
            placeholder="Article Title..."
            className="peer w-full focus:outline-none text-3xl font-semibold p-1 bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />

          <button className="rounded-full flex flex-none items-center opacity-0 peer-hover:opacity-100 aspect-square h-min p-2 peer-hover:bg-slate-700/50 bg-transparent ">
            <MdFormatListBulletedAdd />
          </button>
        </form>
      </div>
    </div>
  );
}
