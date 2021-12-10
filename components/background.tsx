import React from "react";

/**
 * Backdrop to display cards. Could be changed to colours, gradient, image, etc.
 * This is extremely hacky. A better solution is needed.
 */
function Background({ currentSlide }) {
  // To move the circles around within bounds
  const circleClass = () => {
    const numberCircles = 4;

    // The operator ~~ is a higher-performance equivalent of Math.floor()
    const randomPosition = () => ~~(Math.random() * numberCircles);
    const circleOffset = (position: number) => {
      switch (position) {
        case 0:
          return "translate-x-48 translate-y-32";
        case 1:
          return "translate-x-24 translate-y-0";
        case 2:
          return "translate-x-96 translate-y-48";
        case 3:
          return "translate-x-96 -translate-y-24";
      }
    };
    return circleOffset(randomPosition());
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]">
      <div
        className={`${circleClass()} bg-indigo-600 w-72 h-72 transition-transform ease-in-out duration-700 rounded-full blur-3xl`}
      ></div>
      <div
        className={`${circleClass()} bg-purple-600 w-48 h-48 transition-transform ease-in-out duration-700 rounded-full blur-3xl`}
      ></div>
    </div>
  );
}

export default Background;
