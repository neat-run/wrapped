import React from "react";
import { User } from "../types/common";

const imageClass =
  "w-7 h-7 rounded-full hover:scale-[1.5] transition-transform";

interface IProps {
  user: User;
}

function Follows({ user }: IProps) {
  if (!user || !user.topFollows) return <></>;

  const followers = user.topFollows.followers;
  const following = user.topFollows.following;

  return (
    <div className="text-white text-left p-5 space-y-7">
      <div className="text-gray-400 text-5xl">
        <h1 className="text-xl font-medium mb-2">You like to stay connected</h1>
        <div className="space-x-2">
          <span className="font-mono text-green-600">
            {following.totalCount}
          </span>
          <span className="font-light">followers</span>
        </div>
        <div className="space-x-2">
          <span className="font-mono text-orange-600">
            {followers.totalCount}
          </span>
          <span className="font-light">following</span>
        </div>
      </div>

      <div>
        <h3 className="text-gray-400 text-xl font-medium mb-2">
          You made new friends
        </h3>
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
                className="text-white"
                rel="noopener noreferrer"
              >
                {person.name ? person.name : person.login}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-400 text-xl font-medium mb-2">
          Some even showed you love
        </h3>
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
                className="text-white"
                rel="noopener noreferrer"
              >
                {person.name ? person.name : person.login}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Follows;
