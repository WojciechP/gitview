

export class RawShortUser {
  login: string;
  id: number;
  url: string;
  avatar_url: string;

}

export class RawShortPull {
    url: string;
    id: number;
    number: number;
    state: string;
    title: string;
    description: string;
    user: RawShortUser;
    body: string;
    created_at: string;
    updated_at: string;
    assignee: any; //TODO;
    commits_url: string;
    review_comments_url: string;
    _links: any;
};

export class RawShortRepo {
  id: number;
  name: string;
  full_name: string;
  owner: any;
  description: string;
  url: string;
  pulls_url: string;
};

export class RawShortOrg {
  login: string;
  id: number;
  url: string;
  repos_url: string;
  events_url: string;
  avatar_url: string;
  description: string;
};


export class RawUser {
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

export interface RawShortComment {
  url: string;
  id: string;
  diff_hunk?: string;
  path?: string;
  position?: string;
  original_position?: string;
  commit_id?: string;
  original_commit_id?: string;
  user: RawShortUser;
  body: string;
  created_at: string;
  updated_at: string;
}
