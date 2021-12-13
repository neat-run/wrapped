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
    let rounded = Math.round(normalValue * 10) / 10;

    // Manually assigning bar heights because Tailwind doesn't allow
    // dynamic classes
    if (rounded == 0) heights[i] = "h-[50px]";
    else if (rounded == 0.1) heights[i] = "h-[60px]";
    else if (rounded == 0.2) heights[i] = "h-[70px]";
    else if (rounded == 0.3) heights[i] = "h-[80px]";
    else if (rounded == 0.4) heights[i] = "h-[90px]";
    else if (rounded == 0.5) heights[i] = "h-[100px]";
    else if (rounded == 0.6) heights[i] = "h-[110px]";
    else if (rounded == 0.7) heights[i] = "h-[120px]";
    else if (rounded == 0.8) heights[i] = "h-[130px]";
    else if (rounded == 0.9) heights[i] = "h-[140px]";
    else if (rounded == 1) heights[i] = "h-[150px]";
  });

  return (
    <div className="grid grid-cols-3 items-baseline">
      {chartData.values.map((value, i) => (
        <div key={i} className="text-center text-white">
          <div className="w-[125px]">
            <div
              className={`${chartData.colors[i]} w-full ${heights[i]} hover:scale-[1.1] transition-transform text-left p-2 text-sm text-gray-200 group flex flex-col justify-between`}
            >
              {value > 10 ? (
                <div>
                  <p className="text-3xl font-mono pr-0.5 leading-none">
                    {value}
                  </p>
                  <p className="invisible group-hover:visible leading-none">
                    commits
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex flex-row text-sm mt-2 ml-1 text-gray-200 font-medium items-center">
            <img
              className="w-7 h-7 mr-1 rounded-full hover:scale-[1.5] transition-transform"
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
          </div>
          {chartData.stars[i] > 3 && (
            <span className="text-yellow-400 flex items-center space-x-0.5 ml-1.5">
              <StarIcon className="mt-0.5" />
              <span>{chartData.stars[i]}</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlockChart;
