import React from "react";
import { gql, useQuery } from "@apollo/client";

const TOP_REPOS = gql`
  query {
    viewer {
      contributionsCollection(
        from: "2021-01-01T00:00:00.000+00:00"
        to: "2021-12-29T00:00:00.000+00:00"
      ) {
        totalCommitContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        totalIssueContributions
        totalRepositoriesWithContributedCommits
        restrictedContributionsCount
        totalRepositoryContributions
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

function TopRepos() {
  const { data } = useQuery(TOP_REPOS);
  console.log(data);

  return <div></div>;
}

export default TopRepos;
