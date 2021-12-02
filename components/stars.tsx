import { gql, useQuery } from "@apollo/client";
import React from "react";

// GraphQL query to get stats for Stars
const STARS = gql`
  query stars {
    viewer {
      name
      login
      starredRepositories {
        totalCount
      }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        orderBy: { direction: DESC, field: STARGAZERS }
      ) {
        totalCount
        nodes {
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

function Stars() {
  const { data } = useQuery(STARS);

  if (!data || !data.viewer) return <></>;

  const totalStarsGiven = data.viewer.starredRepositories.totalCount;
  const totalStarsReceived = data.viewer.repositories.nodes.reduce(
    (prev, curr) => {
      return prev + curr.stargazers.totalCount;
    },
    0
  );

  return (
    <div className="p-5 text-left space-y-5 text-white">
      <p>You're a star</p>
      <p>
        {totalStarsGiven} given, {totalStarsReceived} received
      </p>
    </div>
  );
}

export default Stars;
