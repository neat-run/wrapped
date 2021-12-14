import React from "react";
import { User, Stat } from "../types/common";
import Hide from "./hide";

const imageClass =
  "w-7 h-7 rounded-full hover:scale-[1.5] transition-transform";

function Follows({ user, hidden, setHidden, showHide }: Stat) {
  const stat: keyof User = "topFollows";
  if (!user || !user.topFollows) return <></>;

  const followers = user.topFollows.followers;
  const following = user.topFollows.following;

  if (hidden.includes(stat)) return <></>;

  return (
    <div className="text-white text-left p-5 space-y-7 group">
      <div className="text-gray-400">
        <h1 className="text-xl text-gray-200 font-medium mb-2">
          You like to stay connected
        </h1>
        <div className="space-x-2">
          <span className="font-mono text-2xl text-green-600">
            {following.totalCount}
          </span>
          <span className="text-xl text-gray-400">following</span>
        </div>
        <div className="space-x-2">
          <span className="font-mono text-2xl text-orange-600">
            {followers.totalCount}
          </span>
          <span className="text-xl text-gray-400">followers</span>
        </div>
      </div>

      <div>
        <h3 className="text-gray-200 mb-2 font-medium">You made new friends</h3>
        <div className="space-y-2">
          {following.latest.map((person, i) => (
            <div key={i} className="flex items-center space-x-2">
              <img
                className={imageClass}
                src={person.avatarUrl}
                alt={person.login + " logo"}
              />
              <a
                href={person.url}
                className="text-gray-400 font-medium"
                rel="noopener noreferrer"
              >
                {person.name ? person.name : person.login}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-200 mb-2 font-medium">Some showed you love</h3>
        <div className="space-y-3">
          {followers.latest.map((person, i) => (
            <div key={i} className="flex items-center space-x-2">
              <img
                className={imageClass}
                src={person.avatarUrl}
                alt={person.login + " logo"}
              />
              <a
                href={person.url}
                className="text-gray-400 font-medium"
                rel="noopener noreferrer"
              >
                {person.name ? person.name : person.login}
              </a>
            </div>
          ))}
        </div>
      </div>
      {showHide && (
        <Hide stat={stat} user={user} hidden={hidden} setHidden={setHidden} />
      )}
    </div>
  );
}

export default Follows;
