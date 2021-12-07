import UserHighlights from "./userHighlights";
import TopRepos from "./topRepos";
import TopLanguages from "./topLanguages";
import Contributions from "./contributions";
import Follows from "./follows";
import Stars from "./stars";
import Toolbar from "./tooltip";
import { User } from "../types/common";

interface IProps {
  user: User;
}

function Summary({ user }: IProps) {
  return (
    <div>
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 mt-5 p-10">
        <div className="flex space-x-5 rounded-xl bg-gray-900/80 border border-gray-500">
          <UserHighlights user={user} />
          <TopRepos user={user} />
          <TopLanguages user={user} />
          <Follows user={user} />
          <Stars user={user} />
        </div>
        <Contributions user={user} />
      </div>
    </div>
  );
}

export default Summary;
