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
    <div className="flex flex-col justify-center items-center xl:w-[1245px] xl:h-[700px]">
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
      <div className="flex flex-row absolute bottom-2 right-4">
        <a
          href="https://wrapped.run"
          className="text-gray-400/80 font-mono group mr-1"
        >
          <span className="text-indigo-500 group-hover:text-indigo-300">
            wrapped
          </span>
          .run
        </a>
        <div className="text-gray-500/80">
          by{" "}
          <a href="https://neat.run" className="text-gray-500/80">
            neat.run
          </a>
        </div>
      </div>
    </div>
  );
}

export default Summary;
