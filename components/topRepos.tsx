import { gql, useQuery } from "@apollo/client";
import React from "react";
import { BarChart } from "./barChart";

// GraphQL query to get an overview of a user's contributions
const TOP_REPOS = gql`
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

function TopRepos() {
  const { data } = useQuery(TOP_REPOS);

  if (!data || !data.viewer) return <></>;

  const repos =
    data.viewer.contributionsCollection.commitContributionsByRepository;

  // Formatting data in chart-friendly format
  const chartData = {
    labels: repos.map((repo) => repo.repository.name),
    datasets: [
      {
        barThickness: 15,
        maxBarThickness: 20,
        minBarLength: 5,
        indexAxis: "y",
        data: repos.map((repo) => repo.contributions.totalCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(54, 162, 235, 0.8)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-5 text-left space-y-5 text-white">
      <p>You're an absolute beast</p>
      <BarChart chartData={chartData} title="Top Repositories" />
      {repos.map((repo, i) => (
        <div key={i} className="flex items-center space-x-2">
          <img
            className="w-10 h-10 rounded-full"
            src={repo.repository.owner.avatarUrl}
            alt={repo.repository.name + " logo"}
          />
          <div className="flex items-end space-x-2">
            <div>
              {repo.repository.isPrivate ? (
                <p>{repo.repository.nameWithOwner}</p>
              ) : (
                <a href={repo.repository.url} rel="noopener noreferrer">
                  {repo.repository.nameWithOwner}
                </a>
              )}
              <p className="text-xs">⭐ {repo.repository.stargazerCount}</p>
              <p className="text-3xl font-bold">
                {repo.contributions.totalCount}
              </p>{" "}
              commits
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopRepos;
