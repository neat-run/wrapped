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

// GraphQL query to get a user's top languages
export const TOP_LANGUAGES = gql`
  query TopLangs($start: DateTime) {
    viewer {
      topRepositories(
        since: $start
        first: 20
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          nameWithOwner
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;
