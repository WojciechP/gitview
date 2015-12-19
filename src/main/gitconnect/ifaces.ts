import * as raw from './raw-ifaces';


export class User {
  login: string
  constructor(public raw: raw.ShortUser) {
    this.login = raw.login;
  }
}

export class Organization {
  name: string;

  constructor(public raw: raw.ShortOrg) {
    this.name = raw.login;
  }
}

export class Repo {
  name: string;
  constructor(public raw: raw.ShortRepo, public org: Organization) {
    this.name = raw.name;
  }
}

export class PullRequest {
  number: number;
  title: string;
  url: string;
  constructor(public raw: raw.ShortPull, public repo: Repo) {
    this.number = raw.number;
    this.title = raw.title;
    this.url = raw._links['html']['href'];
  }
}

export class Comment {
  author: User;
  body: string;
  timestamp: Date;
  constructor(public raw: raw.ShortComment, public pull: PullRequest) {
    this.author = new User(raw.user);
    this.body = raw.body;
    this.timestamp = new Date(raw.created_at);
  }
}

export class Commit {
  sha: string;
  timestamp: Date;
  author: String;
  message: String;
  constructor(public raw: raw.ShortCommit, public pull: PullRequest) {
    this.sha = raw.sha;
    this.timestamp = new Date(raw.commit.author.date);
    this.author = raw.author.login;
    this.message = raw.commit.message;
  }
}
