import { gql, useQuery } from "@apollo/client";
import React from "react";
import Constants from "../utils/constants";
import Tooltip from "../components/tooltip";

// GraphQL query to get the contribution history
const CONTRIBUTIONS = gql`
  query contributions($start: DateTime, $end: DateTime) {
    viewer {
      name
      contributionsCollection(from: $start, to: $end) {
        contributionCalendar {
          colors
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              date
              weekday
            }
            firstDay
          }
        }
      }
    }
  }
`;

function Contributions() {
  const { data } = useQuery(CONTRIBUTIONS, {
    variables: { start: Constants.DATES.JAN2021, end: Constants.DATES.DEC2021 },
  });

  if (!data || !data.viewer) return <></>;
  let contributions = [];
  let colors = {};

  // Creating local variable to simplify calling in .map()
  const weeks = data.viewer.contributionsCollection.contributionCalendar.weeks;

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
    if (rounded === 0) colors[value] = "bg-gray-200 bg-opacity-20";
    if (rounded === 0.25) colors[value] = "bg-green-200 bg-opacity-80";
    if (rounded === 0.5) colors[value] = "bg-green-300 bg-opacity-80";
    if (rounded === 0.75) colors[value] = "bg-green-400 bg-opacity-80";
    if (rounded === 1) colors[value] = "bg-green-500 bg-opacity-80";
  });

  return (
    <div>
      <div className="text-white text-left p-2">You show up daily</div>
      <div className="p-2 pt-0 grid gap-1 text-white grid-rows-7 grid-flow-col">
        {weeks.map((week, i) =>
          week.contributionDays.map((day, j) => (
            <Tooltip
              key={j}
              content={`${day.contributionCount} contributions on ${day.date}`}
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
