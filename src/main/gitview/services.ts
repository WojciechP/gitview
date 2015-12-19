import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs';

import {PullRequest, GitconnectService} from '../gitconnect';

import {Comment, Commit} from '../gitconnect/ifaces';



export class ReviewablePull {
  private _entries: Array<PullEntry<Commit|Comment>>;
  addEntry(entry: PullEntry<Commit|Comment>) {
    this._entries.push(entry);
    return this;
  }

  get entries() {
    this._entries = this._entries.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    return this._entries;
  }
  constructor(public pull: PullRequest) {
    this._entries = [];
  }

  get lastActive(): Date {
    return new Date(this.pull.raw.updated_at);
  }
}




@Injectable()
export class ReviewService {
  constructor(private gitconnect: GitconnectService) {}
  reviewPull(pull: PullRequest): Observable<ReviewablePull> {
    let reviewablePull = new ReviewablePull(pull);
    let commits = this.gitconnect.getCommits(pull);
    return this.gitconnect.getComments(pull)
      .map(comment => reviewablePull.addEntry(PullEntry.fromComment(comment)))
      .flatMap(reviewablePull =>
        commits.map(commit => reviewablePull.addEntry(PullEntry.fromCommit(commit)))
      );
  }
}


type PullEntryContent = Comment | Commit;

export class PullEntry<T extends PullEntryContent> {
  public static fromComment(comment: Comment): PullEntry<Comment> {
    return new this<Comment>('comment', comment.timestamp, comment);
  }
  public static fromCommit(commit: Commit): PullEntry<Commit> {
    return new this<Commit>('commit', new Date(commit.raw.commit.author.date), commit);
  }

  constructor(public type: string, public timestamp: Date, public content: T) {
  }


}
