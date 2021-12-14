import React from "react";
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
  showHide?: boolean;
}

/**
 * All slides in one view for easy sharing
 */
function Summary({ user, hidden, setHidden, showHide }: IProps) {
  return (
    <div className="flex flex-col justify-center items-center lg:w-[1245px] lg:h-[700px]">
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col">
          <Highlights
            user={user}
            hidden={hidden}
            setHidden={setHidden}
            showHide={showHide}
          />
          <TopRepos
            user={user}
            hidden={hidden}
            setHidden={setHidden}
            showHide={showHide}
          />
        </div>

        <div className="flex flex-col">
          <TopLanguages
            user={user}
            hidden={hidden}
            setHidden={setHidden}
            showHide={showHide}
          />
          <Stars
            user={user}
            hidden={hidden}
            setHidden={setHidden}
            showHide={showHide}
          />
        </div>
        <Follows
          user={user}
          hidden={hidden}
          setHidden={setHidden}
          showHide={showHide}
        />
      </div>
      <div className="flex justify-start sm:justify-center text-left">
        <Contributions
          user={user}
          hidden={hidden}
          setHidden={setHidden}
          showHide={showHide}
        />
      </div>
    </div>
  );
}

export default Summary;
