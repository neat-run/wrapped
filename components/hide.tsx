import { useState } from "react";
import { Cross2Icon } from "@modulz/radix-icons";
import Tooltip from "./tooltip";
import { User } from "../types/common";
import { getByUsername, publishUser } from "../utils/exports";
import { deleteValue } from "../utils/supabase";

interface IProps {
  stat: keyof User;
  user: User;
  hidden: any[];
  setHidden: any;
}

function Hide({ stat, user, hidden, setHidden }: IProps) {
  // Toggle hide
  function toggleHide() {
    // Add stat to hidden array
    setHidden([...hidden, stat]);

    // Check if user's data is already written to Supabase
    let checkUser = getByUsername(user.username);
    if (checkUser) {
      // Retake screenshot for link preview
      //publishUser(user);

      // For the Highlight component, there are multiple props to be deleted
      if (stat == "commits") {
        ["commits", "pulls", "contributions", "repos", "reviews"].map(
          (value: keyof User) => deleteValue("users", value, user.username)
        );
      } else deleteValue("users", stat, user.username);
    }
  }

  return (
    <div>
      <button
        className="invisible group-hover:visible absolute p-2 hover:bg-gray-800/90 text-gray-100 rounded focus:outline-none"
        onClick={toggleHide}
      >
        Hide
      </button>
    </div>
  );
}

export default Hide;
