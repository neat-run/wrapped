import { useState } from "react";
import Highlights from "./highlights";
import TopRepos from "./topRepos";
import TopLanguages from "./topLanguages";
import Contributions from "./contributions";
import Follows from "./follows";
import Stars from "./stars";
import { User } from "../types/common";

interface IProps {
  user: User;
  hidden: any[];
  setHidden: any;
}

/**
 * All slides in one view for easy sharing
 */
function Summary({ user, hidden, setHidden }: IProps) {
  return (
    <div
      id="wrap"
      className="m-12 flex rounded-xl bg-gray-900/80 border border-gray-500"
    >
      <div className="flex w-1/5">
        <Highlights user={user} hidden={hidden} setHidden={setHidden} />
      </div>
      <div className="flex flex-col w-4/5">
        <div className="flex">
          <TopRepos user={user} hidden={hidden} setHidden={setHidden} />
          <div className="flex flex-col">
            <TopLanguages user={user} hidden={hidden} setHidden={setHidden} />
            <Stars user={user} hidden={hidden} setHidden={setHidden} />
          </div>
          <Follows user={user} hidden={hidden} setHidden={setHidden} />
        </div>
        <Contributions user={user} hidden={hidden} setHidden={setHidden} />
      </div>
    </div>
  );
}

export default Summary;
