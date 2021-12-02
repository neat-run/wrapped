import { gql } from "@apollo/client";

// GraphQL query to get an overview of a user's contributions
export const USER_HIGHLIGHTS = gql`
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
