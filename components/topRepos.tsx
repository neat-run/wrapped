import React from "react";
import { User } from "../types/common";
import { BarChart } from "./barChart";
import { StarIcon } from "@modulz/radix-icons";
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
    labels: user.topRepos.map((repo) => repo.name),
    datasets: [
      {
        barThickness: 20,
        maxBarThickness: 20,
        minBarLength: 5,
        indexAxis: "y",
        data: user.topRepos.map((repo) => repo.contributions),
        backgroundColor: [
          "#DC2625aa",
          "#EA580Baa",
          "#D97707aa",
          "#16A349aa",
          "#4F45E4aa",
        ],
        borderColor: [
          "#DC262533",
          "#EA580B33",
          "#D9770733",
          "#16A34933",
          "#4F45E433",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Repo name with dimmed owner name
  const StyledRepoName = (nameWithOwner: string) => {
    return (
      <p>
        <span className="text-gray-400">{nameWithOwner.split("/")[0]}/</span>
        <span className="text-white font-medium">
          {nameWithOwner.split("/")[1]}
        </span>
      </p>
    );
  };

  return (
    <div className="text-left p-5 space-y-5 text-white">
      <h1 className="text-gray-400 text-xl font-medium">
        You're an absolute beast
      </h1>
      <BarChart chartData={chartData} title="Top Repositories" />
      {user.topRepos.map((repo, i) => (
        <div key={i} className="flex items-center space-x-4">
          <img
            className="w-14 h-14 rounded-full"
            src={repo.avatarUrl}
            alt={repo.name + " logo"}
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              {repo.isPrivate ? (
                StyledRepoName(repo.nameWithOwner)
              ) : (
                <a href={repo.url} rel="noopener noreferrer">
                  {StyledRepoName(repo.nameWithOwner)}
                </a>
              )}
              {repo.stars > 0 && (
                <span className="text-yellow-600 font-medium flex items-center space-x-0.5">
                  <StarIcon className="mt-0.5" />
                  <span>{repo.stars}</span>
                </span>
              )}
            </div>
            {repo.contributions > 10 && (
              <div className="flex items-end space-x-2">
                <p className="text-3xl font-bold font-mono">
                  {repo.contributions}
                </p>
                <p className="text-gray-600 text-3xl">commits</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopRepos;
