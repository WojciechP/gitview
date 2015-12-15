
import {Observable} from 'rxjs';
import {Injectable} from 'angular2/core';
import {PullService, PullShort} from './pulls';
import {RawShortComment, RawShortCommit, RawShortRepo} from '../raw-types';



export interface IPullActivity {
  date: Date;
  type: string;
};

export class Comment implements IPullActivity {
  public date: Date;
  public type = "comment";
  public content: string;
  constructor(private raw: RawShortComment) {
    this.date = new Date(raw.created_at);
    this.content = raw.body;
  }
}

export class Commit implements IPullActivity {
  public date: Date;
  public type = "commit";
  constructor(private raw: RawShortCommit) {
    this.date = new Date(raw.commit.author.date);
  }
}

export class PullRequest {
  activityLog: Array<IPullActivity>;
  repo: RawShortRepo;
  number: number;
  title: string;
  constructor (public raw: PullShort) {
    let comments: Array<IPullActivity> = raw.comments.map(raw => new Comment(raw));
    let commits = raw.commits.map(raw => new Commit(raw));
    this.activityLog = comments.concat(commits);
    this.repo = raw.raw.base.repo;
    this.number = raw.number;
    this.title = raw.raw.title;
  }
}

@Injectable()
export class PullActivityService {

  constructor(private pullService: PullService) {}

  getPullsActivity(): Observable<PullRequest> {
    return this.pullService.getPulls().map(pullShort => new PullRequest(pullShort));
  }
}
