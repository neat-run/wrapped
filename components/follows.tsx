import { gql, useQuery } from "@apollo/client";
import React from "react";
import { User } from "../types/common";
import { FOLLOWS } from "../utils/queries";

const imageClass = "w-7 h-7 rounded-full hover:scale-[1.5]";

interface IProps {
  user: User;
}

function Follows({ user }: IProps) {
  if (!user || !user.topFollows) return <></>;

  const followers = user.topFollows.followers;
  const following = user.topFollows.following;

  return (
    <div className="text-white text-left p-5 space-y-5">
      <p>You like to stay connected</p>
      <p>
        {following.totalCount} following, with {followers.totalCount} followers{" "}
      </p>

      <p>Your latest follows were</p>
      <div className="space-y-3">
        {following.latest.map((person, i) => (
          <div key={i} className="flex items-center space-x-2">
            <img
              className={imageClass}
              src={person.avatarUrl}
              alt={person.name + " logo"}
            />
            <div className="flex items-end space-x-2">
              <div>
                <a href={person.url} rel="noopener noreferrer">
                  {person.name}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>Folks who showed you love</p>
      <div className="space-y-3">
        {followers.latest.map((person, i) => (
          <div key={i} className="flex items-center space-x-2">
            <img
              className={imageClass}
              src={person.avatarUrl}
              alt={person.name + " logo"}
            />
            <div className="flex items-end space-x-2">
              <div>
                <a href={person.url} rel="noopener noreferrer">
                  {person.name}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Follows;
