import React from "react";
import { User } from "../types/common";

interface IProps {
  user: User;
}

function Stars({ user }: IProps) {
  if (!user || !user.stars) return <></>;

  return (
    <div className="p-5 text-left space-y-5 text-white">
      <p>You're a star</p>
      <p>
        {user.stars.given} given, {user.stars.received} received
      </p>
    </div>
  );
}

export default Stars;
