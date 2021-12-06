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
  avatarUrl?: string;
  isPrivate?: boolean;
  nameWithOwner?: string;
  url?: string;
  stars?: number;
  topLanguages?: Language[];
  contributions?: Number;
}

export interface Language {
  name: string;
  commonName: string;
  color?: string;
}
