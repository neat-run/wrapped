import React from "react";
import { gql, useQuery } from "@apollo/client";
import Constants from "../utils/constants";

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
    variables: { start: Constants.DATES.JAN2021, end: Constants.DATES.DEC2021 },
  });

  if (!data || !data.viewer) return <></>;

  const contributions = data.viewer.contributionsCollection;

  return (
    <div className="p-5 text-left space-y-5 text-white">
      <div>
        You have no commitment issues
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
        You code far and wide
        <p className="text-5xl font-bold">
          {contributions.totalRepositoriesWithContributedCommits}
        </p>
        repos
      </div>
    </div>
  );
}

export default UserHighlights;
