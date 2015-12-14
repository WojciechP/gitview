import {Observable} from 'rxjs';

import {RawGithubService} from './raw';
import {RawShortPull, RawShortOrg, RawShortRepo} from '../raw-types';


export class PullShort {
  constructor(public raw: RawShortPull) {}
}


export class PullService {
  constructor(private rawService: RawGithubService) {}

  /* Emits an event for every open PR */
  getPulls(): Observable<PullShort> {
    let rawUser = this.rawService.getUser();
    let rawOrgs = rawUser.flatMap<RawShortOrg>(u => this.rawService.getOrgs(u.organizations_url));
    let rawRepos = rawOrgs.flatMap<RawShortRepo>(org => this.rawService.getRepos(org.repos_url));
    let rawPulls = rawRepos.flatMap<RawShortPull>(repo => this.rawService.getPulls(repo.pulls_url));
    return rawPulls.map(rawPull => new PullShort(rawPull));



  }
}
