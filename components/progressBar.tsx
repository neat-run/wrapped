import React from "react";

function ProgressBar() {
  return (
    <div>
      <div className="h-6 relative max-w-xl rounded-full overflow-hidden">
        <div className="w-[200px] h-full bg-gray-100 absolute"></div>
        <div id="bar" className={`h-full bg-purple-500 relative w-0`}></div>
      </div>
      {/* <span className="text-xs items-right font-semibold inline-block text-purple-400">
        {progress}
      </span> */}
    </div>
  );
}

export default ProgressBar;
