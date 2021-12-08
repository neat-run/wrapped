import React from "react";
import { User } from "../types/common";
import BuildingChart from "./blockChart";
interface IProps {
  user: User;
}

/**
 * Display the user's top repositories
 * @returns {element} div with text
 */
function TopRepos({ user }: IProps) {
  if (!user || !user.topRepos) return <></>;

  // Formatting data in chart-friendly format
  const chartData = {
    names: user.topRepos.map((repo) => repo.name),
    namesWithOwner: user.topRepos.map((repo) => repo.nameWithOwner),
    isPrivate: user.topRepos.map((repo) => repo.isPrivate),
    url: user.topRepos.map((repo) => repo.url),
    avatarUrl: user.topRepos.map((repo) => repo.avatarUrl),
    stars: user.topRepos.map((repo) => repo.stars),
    values: user.topRepos.map((repo) => repo.contributions),
    colors: ["bg-purple-500/80", "bg-purple-400/80", "bg-purple-300/80"],
  };

  return (
    <div className="text-left p-5 space-y-5 text-white">
      <h1 className="text-gray-400 text-xl font-medium">
        You're an absolute beast
      </h1>
      <BuildingChart chartData={chartData} />
    </div>
  );
}

export default TopRepos;
