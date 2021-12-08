import { useEffect, useState } from "react";
import { User } from "../types/common";
import ProgressBar from "./progressBar";

interface IProps {
  user: User;
}

const messages = [
  "Loading up your information",
  "Doing some quick maths",
  "Making sure everything looks pretty",
];

/**
 * Loading component
 * @param {User} user for username etc
 */
function Loading({ user }: IProps) {
  const [message, setMessage] = useState(0);

  setTimeout(() => {
    setMessage(message + 1);
  }, 1.5 * 1000);

  return (
    <div>
      <div className="text-xl font-medium text-gray-400 animate-pulse">
        {messages[message]}
      </div>
      {/* <ProgressBar /> */}
    </div>
  );
}

export default Loading;
