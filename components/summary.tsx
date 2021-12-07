import UserHighlights from "./userHighlights";
import TopRepos from "./topRepos";
import TopLanguages from "./topLanguages";
import Contributions from "./contributions";
import Follows from "./follows";
import Stars from "./stars";
import { User } from "../types/common";

interface IProps {
  user: User;
}

/**
 * All slides in one view for easy sharing
 */
function Summary({ user }: IProps) {
  return (
    <div className="m-12 mt-16 flex rounded-xl bg-gray-900/80 border border-gray-500">
      <div className="flex w-1/5">
        <UserHighlights user={user} />
      </div>
      <div className="flex flex-col w-4/5">
        <div className="flex">
          <TopRepos user={user} />
          <div className="flex flex-col">
            <TopLanguages user={user} />
            <Stars user={user} />
          </div>
          <Follows user={user} />
        </div>
        <Contributions user={user} />
      </div>
    </div>
  );
}

export default Summary;
