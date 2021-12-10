import React from "react";
import { User } from "../types/common";
import Hide from "./hide";

interface IProps {
  user: User;
  hidden: any[];
  setHidden: any;
}

function Stars({ user, hidden, setHidden }: IProps) {
  const stat: keyof User = "stars";
  if (!user || !user.stars || hidden.includes(stat)) return <></>;

  return (
    <div className="p-5 text-left text-white group">
      <h1 className="text-gray-400 font-medium text-xl mb-2">You're a star</h1>
      <div>
        <div className="flex space-x-2 items-center">
          <p className="font-mono text-4xl text-green-600">
            +{user.stars.given}
          </p>
          <p className="text-gray-600 font-light text-3xl">given</p>
        </div>
        <div className="flex space-x-2 items-center">
          <p className="font-mono text-4xl text-orange-600">
            +{user.stars.received}
          </p>
          <p className="text-gray-600 font-light text-3xl">received</p>
        </div>
      </div>
      <Hide stat={stat} user={user} hidden={hidden} setHidden={setHidden} />
    </div>
  );
}

export default Stars;
