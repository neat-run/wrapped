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
  topFollows?: Follows;
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

export interface Follows {
  following: { totalCount: Number; latest: Actor[] };
  followers: { totalCount: Number; latest: Actor[] };
}

export interface Actor {
  avatarUrl: string;
  name: string;
  url: string;
}
