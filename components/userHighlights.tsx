import React, { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import Constants from "../utils/constants";
import { User } from "../types/common";

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

interface Props {
  hostUser?: User;
}

/**
 * Fetch and display the user's top
 * @returns {element} div with text
 */
function UserHighlights({ hostUser }: Props) {
  // Fetch the current user's stats
  const { data } = useQuery(USER_HIGHLIGHTS, {
    variables: {
      start: Constants.DATES.JAN2021,
      end: Constants.DATES.DEC2021,
    },
  });

  // Serialize stats
  const stats = useMemo(() => {
    if (hostUser) return hostUser;
    else if (data && data.viewer) {
      const collection = data.viewer.contributionsCollection;
      return {
        commits: collection.totalCommitContributions,
        contributions: collection.contributionCalendar.totalContributions,
        pulls: collection.totalPullRequestContributions,
        repos: collection.totalRepositoriesWithContributedCommits,
        reviews: collection.totalPullRequestReviewContributions,
      };
    }
  }, [data]);

  return (
    <div className="p-5 text-left space-y-5 text-white">
      <div>
        You have no commitment issues
        <p className="text-5xl font-bold">{stats?.commits}</p>
        commits
      </div>
      <div>
        You carry your weight
        <p className="text-5xl font-bold">{stats?.contributions}</p>
        total contributions
      </div>
      <div>
        You code far and wide
        <p className="text-5xl font-bold">{stats?.repos}</p>
        repos
      </div>
      <div>
        PRs are your forte
        <p className="text-5xl font-bold">{stats?.pulls}</p>
        contributions
      </div>
      <div>
        Your team loves you for your
        <p className="text-5xl font-bold">{stats?.reviews}</p>
        PR reviews
      </div>
    </div>
  );
}

export default UserHighlights;
