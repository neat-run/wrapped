import { gql, useQuery } from "@apollo/client";
import React from "react";

// GraphQL query to get the followers and following
const FOLLOWS = gql`
  query follows {
    viewer {
      name
      login
      followers(first: 3) {
        totalCount
        nodes {
          name
          url
          avatarUrl
        }
      }
      following(first: 3) {
        totalCount
        nodes {
          name
          avatarUrl
          url
        }
      }
    }
  }
`;

const imageClass = "w-7 h-7 rounded-full hover:scale-[1.5]";

function Follows() {
  const { data } = useQuery(FOLLOWS);

  if (!data || !data.viewer) return <></>;

  const followers = data.viewer.followers;
  const following = data.viewer.following;

  return (
    <div className="text-white text-left p-5 space-y-5">
      <p>You like to stay connected</p>
      <p>
        {following.totalCount} following, with {followers.totalCount} followers{" "}
      </p>

      <p>Your latest follows were</p>
      <div className="space-y-3">
        {following.nodes.map((person, i) => (
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
        {followers.nodes.map((person, i) => (
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
