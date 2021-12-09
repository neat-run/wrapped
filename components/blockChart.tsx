import { StarIcon } from "@modulz/radix-icons";

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
  //   const bros = ["h-[20px]", "h-[50px]", "h-[80px]"];

  let heights = [];
  const maxValue = Math.max(...chartData.values);

  chartData.values.map((value) => {
    let normalValue = value / maxValue;
    heights.push(`h-[${Math.round(normalValue * 100)}px]`);
  });

  console.log(heights);
  return (
    <div className="grid grid-cols-3 items-baseline">
      {chartData.values.map((value, i) => (
        <div key={i} className="w-full text-center text-white">
          <div
            className={`${chartData.colors[i]} w-full ${heights[i]} hover:scale-y-[1.1] text-left pl-1 text-xs text-gray-100 group`}
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

          <div className="flex flex-row text-sm mt-3 items-center space-x-2 justify-center">
            <img
              className="w-5 h-5 rounded-full hover:scale-[1.3]"
              src={chartData.avatarUrl[i]}
              alt={chartData.names[i] + " logo"}
            />
            {chartData.isPrivate[i] ? (
              <span>{StyledRepoName(chartData.namesWithOwner[i])}</span>
            ) : (
              <a href={chartData.url[i]}>
                {StyledRepoName(chartData.namesWithOwner[i])}
              </a>
            )}
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
