import { User } from "../types/common";
import apollo from "./apollo";
import Constants from "./constants";
import { USER_HIGHLIGHTS } from "./queries";

/**
 * Determines whether the app is being run in development
 * @returns {boolean} whether we're in the development environment
 */
export function isDev(): boolean {
  return process.env && process.env.NODE_ENV === "development";
}

/**
 * Gets and serializes all user stats
 * @returns username, commits, top repos, etc
 */
export async function getUserStats(): Promise<User | null> {
  const highlights = await getUserHighlights();

  // Combine objects
  const userStats = { username: "testuser", ...highlights };
  return userStats;
}

/**
 * Get user developer highlights
 * @returns total commits, pulls, reviews, etc
 */
export async function getUserHighlights() {
  const payload = await apollo.query({
    query: USER_HIGHLIGHTS,
    variables: {
      start: Constants.DATES.JAN2021,
      end: Constants.DATES.DEC2021,
    },
  });

  if (!payload || !payload.data) return null;

  const collection = payload.data.viewer.contributionsCollection;
  const highlights = {
    commits: collection.totalCommitContributions,
    contributions: collection.contributionCalendar.totalContributions,
    pulls: collection.totalPullRequestContributions,
    repos: collection.totalRepositoriesWithContributedCommits,
    reviews: collection.totalPullRequestReviewContributions,
  };

  return highlights;
}
