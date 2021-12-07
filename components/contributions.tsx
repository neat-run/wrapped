import React from "react";
import { User } from "../types/common";
import Tooltip from "../components/tooltip";

interface IProps {
  user: User;
}

function Contributions({ user }: IProps) {
  if (!user || !user.contributionsHistory) return <></>;

  let contributions = [];
  let colors = {};

  // Creating local variable to simplify calling in .map()
  const weeks = user.contributionsHistory;

  // Get array of contribution counts
  weeks.map((week) => {
    week.contributionDays.map((day) =>
      contributions.push(day.contributionCount)
    );
  });

  // Get max contribution value
  const max = Math.max(...contributions);

  // Get array of unique contribution values (ascending)
  const unique = contributions.filter((x, i, a) => a.indexOf(x) === i).sort();

  // Divide each value with max and round to nearest quarter
  unique.map((value) => {
    let normalized = value / max;
    let rounded = Math.ceil(normalized / 0.25) * 0.25;

    // Assign color for each case
    if (rounded === 0) colors[value] = "bg-gray-200/20";
    if (rounded === 0.25) colors[value] = "bg-green-200/80";
    if (rounded === 0.5) colors[value] = "bg-green-400/80";
    if (rounded === 0.75) colors[value] = "bg-green-600/80";
    if (rounded === 1) colors[value] = "bg-green-800/80";
  });

  return (
    <div className="space-y-5 p-5 max-w-4xl mx-auto">
      <div className="text-gray-400 text-xl font-medium text-left px-2">
        You show up daily
      </div>
      <div className="p-2 pt-0 grid gap-1 text-white grid-rows-7 grid-flow-col">
        {weeks.map((week, i) =>
          week.contributionDays.map((day, j) => (
            <Tooltip
              key={j}
              content={`${day.contributionCount} contributions on ${new Date(
                day.date
              )
                .toDateString()
                .split(" ")
                .slice(1, 4)
                .join(" ")}`}
            >
              <div
                key={j}
                className={`h-3 w-3 ${
                  colors[day.contributionCount]
                } hover:scale-[1.5] text-xs`}
              ></div>
            </Tooltip>
          ))
        )}
      </div>
    </div>
  );
}

export default Contributions;
