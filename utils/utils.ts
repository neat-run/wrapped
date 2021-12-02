import { Language, User } from "../types/common";
import apollo from "./apollo";
import Constants from "./constants";
import { TOP_LANGUAGES, USER_HIGHLIGHTS } from "./queries";

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
  const languages = await getTopLanguages();

  // Combine objects
  const userStats = {
    ...highlights,
    topLanguages: languages,
  };
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
    username: payload.data.viewer.login,
    avatarUrl: payload.data.viewer.avatarUrl,
    commits: collection.totalCommitContributions,
    contributions: collection.contributionCalendar.totalContributions,
    pulls: collection.totalPullRequestContributions,
    repos: collection.totalRepositoriesWithContributedCommits,
    reviews: collection.totalPullRequestReviewContributions,
  };

  return highlights;
}

/**
 * Fetch languages of most-contributed-to repos
 * @returns array of languages with name, logo color, etc
 */
export async function getTopLanguages(): Promise<Language[]> {
  const payload = await apollo.query({
    query: TOP_LANGUAGES,
    variables: {
      start: Constants.DATES.JAN2021,
      end: Constants.DATES.DEC2021,
    },
  });

  if (!payload || !payload.data) return null;

  let languages = payload.data.viewer.topRepositories.nodes
    .reduce((repos, repo) => {
      if (!repo || !repo.primaryLanguage) return [...repos];

      // Get language logo colour
      let color = repo.primaryLanguage.color;

      // Get language name
      let commonName = repo.primaryLanguage.name;

      // Translate the given name to one compatible with the icon library
      let name = commonName.toLowerCase();
      if (Constants.COMMON_LANGUAGES.has(name))
        name = Constants.COMMON_LANGUAGES.get(name);

      // Only add unique languages
      if (repos && repos.some((r) => r.name == name)) return [...repos];
      return [...repos, { name, commonName, color }];
    }, [])
    .slice(0, 5);

  return languages;
}
