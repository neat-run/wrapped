import React, { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";

// GraphQL query to get an overview of a user's contributions
const TOP_LANGUAGES = gql`
  query {
    viewer {
      repositoriesContributedTo(
        first: 20
        includeUserRepositories: true
        orderBy: { field: NAME, direction: DESC }
        contributionTypes: [COMMIT, PULL_REQUEST, REPOSITORY]
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

interface Language {
  name: string;
  commonName: string;
  color: string;
}

const COMMON_LANGUAGES = new Map<string, string>([["shell", "bash"]]);

function TopLanguages() {
  // Fetch languages of most-contributed-to repos
  const { data } = useQuery(TOP_LANGUAGES);

  const topThree = useMemo<Array<Language>>(() => {
    // Fetch top languages
    if (!data || !data.viewer || !data.viewer.repositoriesContributedTo)
      return [];

    let languages = data.viewer.repositoriesContributedTo.nodes
      .reduce((repos, repo) => {
        // Get language logo colour
        let color = repo.primaryLanguage.color;

        // Get language name
        let commonName = repo.primaryLanguage.name;

        // Translate the given name to one compatible with the icon library
        let name = commonName.toLowerCase();
        if (COMMON_LANGUAGES.has(name)) name = COMMON_LANGUAGES.get(name);

        // Only add unique languages
        if (repos && repos.some((r) => r.name == name)) return [...repos];
        return [...repos, { name, commonName, color }];
      }, [])
      .slice(0, 3);

    return languages;
  }, [data]);

  if (!data || !data.viewer) return <></>;

  return (
    <div className="p-5 m-5 text-left space-y-5 text-white">
      <p>You type many tongues</p>
      {topThree.map((language, i) => (
        <div key={i} className="flex items-center space-x-2">
          <p
            className={`devicon-${language.name}-plain text-4xl`}
            style={{ color: language.color }}
          />
          <p>{language.commonName}</p>
        </div>
      ))}
    </div>
  );
}

export default TopLanguages;
