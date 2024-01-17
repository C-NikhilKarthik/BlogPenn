import React from "react";
import { TbHexagonLetterB } from "react-icons/tb";
import { Button } from "./ui/button";
import { AppDispatch, RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { drawerToggle } from "@/lib/features/draft-slice";
import { GoSidebarCollapse } from "react-icons/go";

export default function DraftNavbar() {
  const dispatch = useDispatch<AppDispatch>();

  const DrawerState = useSelector(
    (state: RootState) => state.drawerReducer.drawer
  );

  return (
    <div className="w-full absolute top-0 left-0 flex z-10 p-4 justify-between">
      <div className="flex gap-2 text-black dark:text-white">
        {DrawerState && (
          <button className="" onClick={() => dispatch(drawerToggle())}>
            <GoSidebarCollapse className="text-xl" />
          </button>
        )}
        <TbHexagonLetterB className=" text-4xl" />
      </div>

      <div className="flex gap-2">
        <Button variant="outline">Preview</Button>

        <Button>Submit article</Button>
      </div>
    </div>
  );
}
