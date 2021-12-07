import React from "react";
import { User } from "../types/common";

interface IProps {
  user: User;
}

function Stars({ user }: IProps) {
  if (!user || !user.stars) return <></>;

  return (
    <div className="p-5 text-left space-y-5 text-white">
      <h1 className="text-gray-400 font-medium text-xl">You're a star</h1>
      <div className="flex space-x-2 items-center">
        <p className="font-mono text-4xl text-green-600">+{user.stars.given}</p>
        <p className="text-gray-600 font-light text-3xl">given</p>
      </div>
      <div className="flex space-x-2 items-center">
        <p className="font-mono text-4xl text-orange-600">
          +{user.stars.received}
        </p>
        <p className="text-gray-600 font-light text-3xl">received</p>
      </div>
    </div>
  );
}

export default Stars;
