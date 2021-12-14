import React from "react";
import { User, Stat } from "../types/common";
import Hide from "./hide";

/**
 * Fetch and display the user's top highlights
 * @returns {element} div with text
 */
function Highlights({ user, hidden, setHidden, showHide }: Stat) {
  const stat: keyof User = "commits";

  if (hidden.includes(stat)) return <></>;

  // Size the text according to the number
  const numberToFontSize = (count: number): string => {
    let order = Math.floor(Math.log(count));

    // Medium to 9xl (maximum in Tailwind)
    if (!order || order === 0) return "text-md";
    else if (order <= 2) return `text-xl`;
    // Even values don't seem to work in text-[N]xl
    else if (order <= 9) return `text-${order - (order % 2) - 1}xl`;
    else return "text-9xl";
  };

  // Stats to render
  let stats = [
    {
      count: user.commits,
      fontSize: "text-lg",
      tagline: "You have no commitment issues",
      title: "Total commits",
      colour: "text-blue-600",
    },
    {
      count: user.contributions,
      fontSize: "text-lg",
      tagline: "You put in the work",
      title: "Total contributions",
      colour: "text-yellow-600",
    },
    {
      count: user.repos,
      fontSize: "text-lg",
      tagline: "You code far and wide",
      title: "Repositories",
      colour: "text-orange-600",
    },
    {
      count: user.pulls,
      fontSize: "text-lg",
      tagline: "You pull your own weight",
      title: "Pull requests",
      colour: "text-indigo-600",
    },
    {
      count: user.reviews,
      fontSize: "text-lg",
      tagline: "You're a good friend",
      title: "Pull reviews",
      colour: "text-green-600",
    },
  ];

  // Get font size for each stat
  stats.map((stat) => (stat.fontSize = numberToFontSize(stat.count)));

  return (
    <div className="p-5 text-left group">
      <h1 className="text-gray-200 font-medium text-xl mb-2">
        {["Highlights", "Overview", "In a nutshell"][~~(Math.random() * 3)]}
      </h1>

      <div className="grid grid-cols-3 items-end gap-5 text-white">
        {stats.map(
          (stat) =>
            stat &&
            stat.count && (
              <div key={stat.title}>
                <p
                  className={`${stat.fontSize} ${stat.colour} font-mono tracking-wide`}
                >
                  {stat.count}
                </p>
                <p className="text-gray-400 leading-none">{stat.title}</p>
              </div>
            )
        )}
      </div>
      {showHide && (
        <Hide stat={stat} user={user} hidden={hidden} setHidden={setHidden} />
      )}
    </div>
  );
}

export default Highlights;
