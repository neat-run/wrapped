import { gql } from "@apollo/client";

// GraphQL query to get an overview of a user's contributions
export const USER_HIGHLIGHTS = gql`
  query MyQuery($start: DateTime, $end: DateTime) {
    viewer {
      login
      avatarUrl
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

// GraphQL query to get the contribution history
export const CONTRIBUTIONS = gql`
  query contributions($start: DateTime, $end: DateTime) {
    viewer {
      name
      contributionsCollection(from: $start, to: $end) {
        contributionCalendar {
          colors
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              date
              weekday
            }
            firstDay
          }
        }
      }
    }
  }
`;

// GraphQL query to get an overview of a user's contributions
export const TOP_REPOS = gql`
  query topRepos {
    viewer {
      name
      login
      contributionsCollection {
        issueContributionsByRepository(maxRepositories: 5) {
          contributions {
            totalCount
          }
          repository {
            name
            nameWithOwner
            url
            isPrivate
            owner {
              avatarUrl
            }
            stargazerCount
          }
        }
        pullRequestContributionsByRepository(maxRepositories: 5) {
          contributions {
            totalCount
          }
          repository {
            name
            nameWithOwner
            url
            isPrivate
            owner {
              avatarUrl
            }
            stargazerCount
          }
        }
        pullRequestReviewContributionsByRepository(maxRepositories: 5) {
          contributions {
            totalCount
          }
          repository {
            name
            nameWithOwner
            url
            isPrivate
            owner {
              avatarUrl
            }
            stargazerCount
          }
        }
        commitContributionsByRepository(maxRepositories: 5) {
          contributions {
            totalCount
          }
          repository {
            name
            nameWithOwner
            url
            isPrivate
            owner {
              avatarUrl
            }
            stargazerCount
          }
        }
      }
    }
  }
`;
// GraphQL query to get stats for Stars
export const STARS = gql`
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

// GraphQL query to get the followers and following
export const FOLLOWS = gql`
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
