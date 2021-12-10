import React from "react";
import { User, Stat } from "../types/common";
import Hide from "./hide";

function Stars({ user, hidden, setHidden, showHide }: Stat) {
  const stat: keyof User = "stars";
  if (!user || !user.stars || hidden.includes(stat)) return <></>;

  return (
    <div className="m-5 text-left text-white group">
      <h1 className="text-gray-400 font-medium text-xl mb-2">
        {
          ["You're a star", "Eyes to the sky", "Shoot for the moon"][
            ~~(Math.random() * 3)
          ]
        }
      </h1>
      <div>
        <div className="flex space-x-2 items-center">
          <p className="font-mono text-4xl text-green-600">
            +{user.stars.given}
          </p>
          <p className="text-gray-600 font-light text-3xl">starred</p>
        </div>
        <div className="flex space-x-2 items-center">
          <p className="font-mono text-4xl text-orange-600">
            +{user.stars.received}
          </p>
          <p className="text-gray-600 font-light text-3xl">stars</p>
        </div>
      </div>
      {showHide && (
        <Hide stat={stat} user={user} hidden={hidden} setHidden={setHidden} />
      )}
    </div>
  );
}

export default Stars;
