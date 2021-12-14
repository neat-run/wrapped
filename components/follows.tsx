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
    <div className="p-5 text-left text-white space-y-7 group">
      <div className="text-gray-400">
        <h1 className="mb-2 text-xl font-medium text-gray-200">
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
        <h3 className="mb-2 font-medium text-gray-200">You made new friends</h3>
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
                className="font-medium text-gray-400"
                rel="noopener noreferrer"
              >
                {person.name ? person.name : person.login}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-gray-200">Some showed you love</h3>
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
                className="font-medium text-gray-400"
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
