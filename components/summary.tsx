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
  showHide?: boolean;
}

/**
 * All slides in one view for easy sharing
 */
function Summary({ user, hidden, setHidden, showHide }: IProps) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row">
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
      <div className="flex justify-center">
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
