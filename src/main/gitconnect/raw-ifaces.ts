

export interface ShortUser {
  login: string;
  id: number;
  url: string;
  avatar_url: string;

}

export interface ShortPull {
    url: string;
    id: number;
    number: number;
    state: string;
    title: string;
    description: string;
    user: ShortUser;
    body: string;
    created_at: string;
    updated_at: string;
    assignee: any; //TODO;
    commits_url: string;
    review_comments_url: string;
    comments_url: string;
    _links: any;
    base: {repo: any};

};

export interface ShortRepo {
  id: number;
  name: string;
  full_name: string;
  owner: any;
  description: string;
  url: string;
  pulls_url: string;
};

export class ShortOrg {
  login: string;
  id: number;
  url: string;
  repos_url: string;
  events_url: string;
  avatar_url: string;
  description: string;
};


export interface User {
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  plan: any;
};

export interface ShortComment {
  url: string;
  id: string;
  diff_hunk?: string;
  path?: string;
  position?: string;
  original_position?: string;
  commit_id?: string;
  original_commit_id?: string;
  user: ShortUser;
  body: string;
  created_at: string;
  updated_at: string;
}


export interface GitAudit {
  name: string;
  email: string;
  date: string;
}

export interface GitCommit {
  author: GitAudit;
  committer: GitAudit;
  message: string;
  tree: any;
  url: string;
  comment_count: number;
}

export interface ShortCommit {
  sha: string;
  commit: GitCommit;
  url: string;
  html_url: string;
  comments_url: string;
  author: ShortUser;
  committer: ShortUser;

}
