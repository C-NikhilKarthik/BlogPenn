import { useContext } from "react";
import { TbHexagonLetterB } from "react-icons/tb";
import { Button } from "./ui/button";
import { GoSidebarCollapse } from "react-icons/go";
import { appContext } from "@/hooks/context/appContext";
import { AppGlobal } from "@/@types/global";
import { Link } from "react-router-dom";

export default function DraftNavbar() {
  const appGlobalValue = useContext(appContext);
  const { openDrawer, setOpenDrawer } = appGlobalValue as AppGlobal;

  return (
    <div className="w-full absolute top-0 left-0 flex z-10 p-4 justify-between">
      <div className="flex gap-2 text-black dark:text-white">
        {!openDrawer && (
          <button className="" onClick={() => setOpenDrawer(true)}>
            <GoSidebarCollapse className="text-xl" />
          </button>
        )}
        <Link to="/">
          <TbHexagonLetterB className=" text-4xl" />
        </Link>
      </div>

      <div className="flex gap-2">
        <Button variant="outline">Preview</Button>

        <Button>Submit article</Button>
      </div>
    </div>
  );
}
