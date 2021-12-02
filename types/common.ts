export interface User {
  username: string;
  commits?: number;
  pulls?: number;
  contributions?: number;
  topRepos?: Repo[];
  topLanguages?: Language[];
}

export interface Repo {
  name: string;
  owner: string;
  stars?: number;
  avatarUrl?: string;
  topLanguages?: Language[];
}

export interface Language {
  name: string;
  commonName: string;
  color?: string;
}
