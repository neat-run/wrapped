import React from "react";
import { User } from "../types/common";
import BuildingChart from "./blockChart";
import Hide from "./hide";
interface IProps {
  user: User;
  hidden: any[];
  setHidden: any;
}

/**
 * Display the user's top repositories
 * @returns {element} div with text
 */
function TopRepos({ user, hidden, setHidden }: IProps) {
  const stat: keyof User = "topRepos";
  if (!user || !user.topRepos || hidden.includes(stat)) return <></>;

  // Formatting data in chart-friendly format
  const chartData = {
    names: user.topRepos.map((repo) => repo.name),
    namesWithOwner: user.topRepos.map((repo) => repo.nameWithOwner),
    isPrivate: user.topRepos.map((repo) => repo.isPrivate),
    url: user.topRepos.map((repo) => repo.url),
    avatarUrl: user.topRepos.map((repo) => repo.avatarUrl),
    stars: user.topRepos.map((repo) => repo.stars),
    values: user.topRepos.map((repo) => repo.contributions),
    colors: ["bg-orange-500/80", "bg-green-500/80", "bg-purple-500/80"],
  };

  return (
    <div className="text-left p-5 space-y-5 text-white group">
      <h1 className="text-gray-400 text-xl font-medium">
        {
          [
            "You're an absolute beast",
            "You get around",
            "You code far and wide",
          ][~~(Math.random() * 3)]
        }
      </h1>
      <BuildingChart chartData={chartData} />
      <Hide stat={stat} user={user} hidden={hidden} setHidden={setHidden} />
    </div>
  );
}

export default TopRepos;
