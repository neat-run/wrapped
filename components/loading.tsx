import { useState } from "react";
import { User } from "../types/common";

interface IProps {
  user: User;
}

const messages = [
  "Loading up your information",
  "Doing some quick maths",
  "Making sure everything looks pretty",
  "Calculating the πth digit of π",
  "Cold-starting flux capacitor",
  "Linearizing distributed synergistic query cohorts",
  "Rendering Radix UI components",
  "Fetching code language icons from a CDN",
  "Slapping the side of a server somewhere",
  "Optimizing font size",
  "Finishing up",
];

/**
 * Loading component
 * @param {User} user for username etc
 */
function Loading({ user }: IProps) {
  const [message, setMessage] = useState(0);

  // Update the loading message every 0-3 s
  setTimeout(() => {
    setMessage(message + 1);
  }, 3 * Math.random() * 1000);

  return (
    <div>
      <div className="text-xl font-medium text-gray-400 animate-pulse">
        {messages[message]}...
      </div>
      {/* <ProgressBar /> */}
    </div>
  );
}

export default Loading;
