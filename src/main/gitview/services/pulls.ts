import {Observable} from 'rxjs';

import {RawGithubService} from './raw';
import {RawShortPull, RawShortOrg, RawShortRepo, RawShortComment, RawShortCommit} from '../raw-types';
import {Injectable} from 'angular2/core';


export class PullShort {
  get number() {
    return this.raw.number;
  }

  constructor(
    public raw: RawShortPull,
    public repo: RawShortRepo,
    public comments: Array<RawShortComment>,
    public commits: Array<RawShortCommit>) {}
}

class RepoShort {
  constructor(public raw: RawShortRepo) {}

}

@Injectable()
export class PullService {
  constructor(private rawService: RawGithubService) {}

  /* Emits an event for every open PR */
  getPulls(): Observable<PullShort> {
    let rawUser = this.rawService.getUser();
    let rawOrgs = this.rawService.getOrgs();
    let rawRepos: Observable<RawShortRepo> = rawOrgs.flatMap(org => {
      return this.rawService.getRepos(org.repos_url);
    });
    let rawPulls = rawRepos.flatMap(repo => {
      let url = repo.pulls_url.replace('{/number}', '');
      return this.rawService.getPulls(url).flatMap<PullShort>(pull => {
        let comments = this.rawService.getComments(pull._links['comments']['href']);
        let commits = this.rawService.getCommits(pull._links['commits']['href']);

        return comments.flatMap(comments => {
          return commits.map(commits => new PullShort(pull, repo, comments, commits))
        });
      });
    });
    return rawPulls;

  }
}
