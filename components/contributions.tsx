import React from "react";
import { User, Stat } from "../types/common";
import Tooltip from "../components/tooltip";
import Hide from "./hide";

// Format a date as Mmm dd, yyyy
const formatDate = (date: string): string => {
  let dateString = new Date(date).toDateString();
  let parts = dateString.split(" ").slice(1, 3);

  // If date starts with 0 drop it eg. Jan 4 -> Jan 4
  if (parts[1] && parts[1][0] == "0") {
    parts[1] = parts[1][1];
  }

  let formattedDate = parts.join(" ");
  return formattedDate;
};

// Calculate and format date of most contributions
const getMaxDate = (contributions: number[]) => {
  const max = Math.max(...contributions);
  const maxDayIndex = contributions.findIndex((x) => x == max);
  const maxDate = formatDate(new Date(2021, 0, maxDayIndex).toDateString());
  const maxDatePosition =
    maxDayIndex > 240 ? "left-2/3" : maxDayIndex > 120 ? "left-1/3" : "left-0";

  return { max, maxDate, maxDatePosition };
};

/**
 * Graph of user contributions since Jan 1
 */
function Contributions({ user, hidden, setHidden, showHide }: Stat) {
  const stat: keyof User = "contributionsHistory";
  if (!user || !user.contributionsHistory || hidden.includes(stat))
    return <></>;

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

  // Get max contribution value and its date
  const { max, maxDate, maxDatePosition } = getMaxDate(contributions);

  // Get array of unique contribution values (ascending)
  const unique = contributions.filter((x, i, a) => a.indexOf(x) === i).sort();

  // Divide each value with max and round to nearest quarter
  unique.map((value) => {
    let normalized = value / max;
    let rounded = Math.ceil(normalized / 0.25) * 0.25;

    // Assign color for each case
    if (value === max) colors[value] = "bg-yellow-400/90";
    else if (rounded === 0) colors[value] = "bg-gray-200/20";
    else if (rounded === 0.25) colors[value] = "bg-green-800/90";
    else if (rounded === 0.5) colors[value] = "bg-green-600/90";
    else if (rounded === 0.75) colors[value] = "bg-green-400/90";
    else if (rounded === 1) colors[value] = "bg-green-300/90";
  });

  return (
    <div className="p-5 max-w-4xl flex flex-col items-start group">
      <h1 className="mb-2 text-gray-200 text-xl font-medium text-left whitespace-nowrap">
        {
          [
            "You show up daily",
            "You have no commitment issues",
            "Your grind never stops",
          ][~~(Math.random() * 3)]
        }
      </h1>
      <div className="grid gap-0.5 grid-cols-7 grid-flow-row sm:grid-rows-7 sm:grid-flow-col">
        {/* Placeholders to account for the year starting on a Friday */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-3 h-3 bg-gray-200/20" />
        ))}
        {/* Weeks */}
        {weeks.map((week) =>
          week.contributionDays.map((day, j) => (
            <Tooltip
              key={j}
              content={`${day.contributionCount} contributions on ${formatDate(
                day.date
              )}`}
            >
              <div
                key={j}
                className={`h-3 w-3 ${
                  colors[day.contributionCount]
                } hover:scale-[2]`}
              />
            </Tooltip>
          ))
        )}
      </div>
      <div className="flex flex-row">
        {showHide && (
          <Hide stat={stat} user={user} hidden={hidden} setHidden={setHidden} />
        )}
      </div>
      {maxDate && (
        <div
          className={`mt-2 flex text-gray-400 items-center space-x-2 sm:relative ${maxDatePosition}`}
        >
          <span>Your top day: {maxDate}</span>
        </div>
      )}
    </div>
  );
}

export default Contributions;
