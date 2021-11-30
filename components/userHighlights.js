import React from "react";
import { gql, useQuery } from "@apollo/client";

const jan2021 = "2021-01-01T00:00:00.000+00:00";
const dec2021 = "2021-12-29T00:00:00.000+00:00";

// GraphQL query to get an overview of a user's contributions
const USER_HIGHLIGHTS = gql`
  query MyQuery($start: DateTime, $end: DateTime) {
    viewer {
      contributionsCollection(from: $start, to: $end) {
        totalCommitContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        totalIssueContributions
        totalRepositoriesWithContributedCommits
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

/**
 * Fetch and display the user's top
 * @returns {element} div with text
 */
function UserHighlights() {
  const { data } = useQuery(USER_HIGHLIGHTS, {
    variables: { start: jan2021, end: dec2021 },
  });

  if (!data || !data.viewer) return <></>;

  const contributions = data.viewer.contributionsCollection;

  return (
    <div className="p-5 m-5 text-left space-y-5">
      <div>
        You don't have commitment issues
        <p className="text-5xl font-bold">
          {contributions.totalCommitContributions}
        </p>
        commits
      </div>
      <div>
        You carry your weight
        <p className="text-5xl font-bold">
          {contributions.contributionCalendar.totalContributions}
        </p>
        contributions
      </div>
      <div>
        You get around
        <p className="text-5xl font-bold">
          {contributions.totalRepositoriesWithContributedCommits}
        </p>
        repos
      </div>
    </div>
  );
}

export default UserHighlights;
