import { StarIcon } from "@modulz/radix-icons";
import Tooltip from "./tooltip";

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

// Block chart component
const BlockChart = ({ chartData }) => {
  // Generating values for bar height
  let heights = [];
  const max = Math.max(...chartData.values);
  chartData.values.map((value, i) => {
    let normalValue = value / max;

    // Rounding to the nearest 0.1
    let rounded = Math.ceil(normalValue / 0.1) * 0.1;

    // Manually assigning bar heights because Tailwind doesn't allow
    // dynamic classes
    if (rounded === 0) heights[i] = "h-[50px]";
    else if (rounded === 0.1) heights[i] = "h-[60px]";
    else if (rounded === 0.2) heights[i] = "h-[70px]";
    else if (rounded === 0.3) heights[i] = "h-[80px]";
    else if (rounded === 0.4) heights[i] = "h-[90px]";
    else if (rounded === 0.5) heights[i] = "h-[100px]";
    else if (rounded === 0.6) heights[i] = "h-[110px]";
    else if (rounded === 0.7) heights[i] = "h-[120px]";
    else if (rounded === 0.8) heights[i] = "h-[130px]";
    else if (rounded === 0.9) heights[i] = "h-[140px]";
    else if (rounded === 1) heights[i] = "h-[150px]";
  });

  return (
    <div className="grid grid-cols-3 items-baseline">
      {chartData.values.map((value, i) => (
        <div key={i} className="w-[125px] text-center text-white">
          <div
            className={`${chartData.colors[i]} w-full ${heights[i]} hover:scale-y-[1.1] transition-transform text-left pl-1 text-xs text-gray-100 group`}
          >
            {value > 10 ? (
              <span>
                <span className="text-3xl text-gray-200 pr-0.5">{value}</span>
                <span className="invisible group-hover:visible text-gray-300">
                  commits
                </span>
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-row text-sm mt-3 items-center space-x-2 justify-center text-gray-300">
            <img
              className="w-7 h-7 rounded-full hover:scale-[1.5] transition-transform"
              src={chartData.avatarUrl[i]}
              alt={chartData.names[i] + " logo"}
            />
            <Tooltip content={chartData.namesWithOwner[i]}>
              {chartData.isPrivate[i] ? (
                <span>{chartData.names[i]}</span>
              ) : (
                <a href={chartData.url[i]}>{chartData.names[i]}</a>
              )}
            </Tooltip>

            {chartData.stars[i] > 3 && (
              <span className="text-yellow-600 font-medium flex items-center space-x-0.5">
                <StarIcon className="mt-0.5" />
                <span>{chartData.stars[i]}</span>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockChart;
