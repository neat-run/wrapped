export interface User {
  username: string;
  avatarUrl?: string;
  commits?: number;
  pulls?: number;
  contributions?: number;
  repos?: number;
  reviews?: number;
  topRepos?: Repo[];
  topLanguages?: Language[];
  linkPreviewURL?: string;
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
