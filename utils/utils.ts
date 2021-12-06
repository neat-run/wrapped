import { Language, User, Repo } from "../types/common";
import apollo from "./apollo";
import Constants from "./constants";
import {
  TOP_LANGUAGES,
  USER_HIGHLIGHTS,
  TOP_REPOS,
  FOLLOWS,
  STARS,
  CONTRIBUTIONS,
} from "./queries";

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
  const repositories = await getTopRepsitories();
  const follows = await getTopFollows();
  const stars = await getStars();
  const contributions = await getContributionHistory();

  // Combine objects
  const userStats = {
    ...highlights,
    topLanguages: languages,
    topRepos: repositories,
    topFollows: follows,
    stars: stars,
    contributionsHistory: contributions,
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

  if (!payload || !payload.data || !payload.data.viewer) return null;

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

  if (!payload || !payload.data || !payload.data.viewer) return null;

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

/**
 * Get top repositories
 * @returns top 5 repositories with their meta data
 */
export async function getTopRepsitories(): Promise<Repo[]> {
  const payload = await apollo.query({
    query: TOP_REPOS,
  });

  if (!payload || !payload.data || !payload.data.viewer) return null;

  const data =
    payload.data.viewer.contributionsCollection.commitContributionsByRepository;

  // Filtering data to specific data points
  let repos = [];
  data.map((repo, i) => {
    repos[i] = {
      name: repo.repository.name,
      nameWithOwner: repo.repository.nameWithOwner,
      avatarUrl: repo.repository.owner.avatarUrl,
      isPrivate: repo.repository.isPrivate,
      url: repo.repository.url,
      stars: repo.repository.stargazerCount,
      contributions: repo.contributions.totalCount,
    };
  });

  return repos;
}

/**
 * Get user's latest followers/following
 * @returns total followers and following, latest 3 followers and following
 */
export async function getTopFollows() {
  const payload = await apollo.query({
    query: FOLLOWS,
  });

  if (!payload || !payload.data || !payload.data.viewer) return null;

  const follows = {
    followers: {
      totalCount: payload.data.viewer.followers.totalCount,
      latest: payload.data.viewer.followers.nodes,
    },
    following: {
      totalCount: payload.data.viewer.following.totalCount,
      latest: payload.data.viewer.following.nodes,
    },
  };

  return follows;
}

/**
 * Get total stars given and recieved
 * @returns total stars given and received
 */
export async function getStars() {
  const payload = await apollo.query({
    query: STARS,
  });

  if (!payload || !payload.data || !payload.data.viewer) return null;

  const stars = {
    given: payload.data.viewer.starredRepositories.totalCount,
    received: payload.data.viewer.repositories.nodes.reduce((prev, curr) => {
      return prev + curr.stargazers.totalCount;
    }, 0),
  };

  return stars;
}

/**
 * Get contribution history
 * @returns contribution count for each day of the year
 */
export async function getContributionHistory() {
  const payload = await apollo.query({
    query: CONTRIBUTIONS,
    variables: {
      start: Constants.DATES.JAN2021,
      end: Constants.DATES.DEC2021,
    },
  });

  if (!payload || !payload.data || !payload.data.viewer) return null;

  const weeks =
    payload.data.viewer.contributionsCollection.contributionCalendar.weeks;

  return weeks;
}
