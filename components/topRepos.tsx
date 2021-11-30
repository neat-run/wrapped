import { gql, useQuery } from "@apollo/client";
import React from "react";

// GraphQL query to get an overview of a user's contributions
const TOP_REPOS = gql`
  query {
    viewer {
      repositoriesContributedTo(
        first: 5
        orderBy: { field: STARGAZERS, direction: DESC }
        contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
      ) {
        totalCount
        nodes {
          nameWithOwner
          commitComments {
            totalCount
          }
          owner {
            avatarUrl
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

function TopRepos() {
  const { data } = useQuery(TOP_REPOS);

  if (!data || !data.viewer) return <></>;
  console.log(data.viewer);

  return (
    <div className="p-5 m-5 text-left space-y-5">
      <p>You're an absolute beast</p>
      {data.viewer.repositoriesContributedTo.nodes.map((repo, i) => (
        <div key={i} className="flex items-center space-x-2">
          <img
            className="w-20 h-20 rounded-full"
            src={repo.owner.avatarUrl}
            alt={repo.nameWithOwner + " logo"}
          />
          <div className="flex items-end space-x-2">
            <p>
              {repo.nameWithOwner}
              <p className="text-3xl font-bold">{repo.stargazers.totalCount}</p>
              stars
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopRepos;
