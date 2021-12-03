import React from "react";
import { User } from "../types/common";

interface Props {
  user: User;
}

/**
 * Fetch and display the user's top
 * @returns {element} div with text
 */
function UserHighlights({ user }: Props) {
  // Size the text according to the number
  const numberToFontSize = (count: number): string => {
    let order = Math.floor(Math.log(count));

    // Medium to 7xl (maximum in Tailwind)
    if (!order || order === 0) return "text-md";
    else if (order <= 7) return `text-${order}xl`;
    else return "text-7xl";
  };

  // Stats to render
  let stats = [
    {
      count: user.commits,
      fontSize: "text-lg",
      tagline: "You have no commitment issues",
      title: "Total commits",
    },
    {
      count: user.contributions,
      fontSize: "text-lg",
      tagline: "You put in the work",
      title: "Total contributions",
    },
    {
      count: user.repos,
      fontSize: "text-lg",
      tagline: "You code far and wide",
      title: "Repositories",
    },
    {
      count: user.pulls,
      fontSize: "text-lg",
      tagline: "You pull your own weight",
      title: "Pull requests",
    },
    {
      count: user.reviews,
      fontSize: "text-lg",
      tagline: "You're a good friend",
      title: "PR reviews",
    },
  ];

  // Get font size for each stat
  stats.map((stat) => (stat.fontSize = numberToFontSize(stat.count)));

  return (
    <div className="p-5 text-left space-y-5 text-white">
      {stats.map(
        (stat) =>
          stat &&
          stat.count && (
            <div key={stat.title}>
              <p className="text-gray-400">{stat.tagline}</p>
              <p
                className={`${numberToFontSize(
                  stat.count
                )} font-extrabold tracking-wide`}
              >
                {stat.count}
              </p>
              <p className="font-medium font-mono text-lg leading-none">
                {stat.title}
              </p>
            </div>
          )
      )}
    </div>
  );
}

export default UserHighlights;
