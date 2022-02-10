import React from "react";

/**
 * Show the source of generated images to allow viewers to make their own
 */
function Watermark() {
  return (
    <div className="flex flex-row absolute bottom-2 right-4">
      <a
        href="https://wrapped.run"
        className="text-gray-400/80 font-mono group mr-1"
      >
        <span className="text-indigo-500 group-hover:text-indigo-300">
          wrapped
        </span>
        .run
      </a>
      <div className="text-gray-500/80">
        by{" "}
        <a href="https://neat.run" className="text-gray-500/80 group">
          <span className="font-medium text-gray-400/80 group-hover:text-gray-200/80">
            neat
          </span>
          .run
        </a>
      </div>
    </div>
  );
}

export default Watermark;
