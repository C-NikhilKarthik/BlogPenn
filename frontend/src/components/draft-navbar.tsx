import { TbHexagonLetterB } from "react-icons/tb";
import { Button } from "./ui/button";
import { GoSidebarCollapse } from "react-icons/go";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "@/hooks/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateDraftDrawer } from "@/hooks/redux/features/auth-slice";

export default function DraftNavbar() {
  const dispatch = useDispatch<AppDispatch>();
  const draftDrawer = useSelector(
    (state: RootState) => state.authReducer.draftDrawer
  );

  return (
    <div className="w-full absolute top-0 left-0 flex z-10 p-4 justify-between">
      <div className="flex gap-2 text-black dark:text-white">
        {!draftDrawer && (
          <button
            className=""
            onClick={() => dispatch(updateDraftDrawer(true))}
          >
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
