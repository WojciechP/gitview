import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs';
import {Injectable} from 'angular2/core';

import {RawUser, RawShortOrg, RawShortUser, RawShortPull, RawShortRepo, RawShortComment, RawShortCommit} from '../raw-types';


const TOKEN = 'e8ce0f4b6b0abffdd17c1adefced8b72cec467fd';

@Injectable()
export class RawGithubService {
  private token: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.token = TOKEN;
    this.headers = new Headers();
    this.headers.append('Authorization', 'token ' + this.token);
  }

  private get<T>(endpoint): Observable<T> {
    return this.http.get(endpoint, {headers: this.headers}).map(r => <T>r.json());
  }

  private getArray<T>(endpoint): Observable<T> {
    return this.http.get(endpoint, {headers: this.headers})
      .flatMap(r => Observable.from(r.json()));
  }

  getUser(): Observable<RawUser> {
    return this.get<RawUser>('https://api.github.com/user');
  }

  getOrgs(): Observable<RawShortOrg> {
    return this.getArray<RawShortOrg>('https://api.github.com/user/orgs');
  };

  getOrgsFromUrl(orgsUrl): Observable<RawShortOrg> {
    return this.getArray<RawShortOrg>(orgsUrl);
  }

  getRepos(reposUrl: string): Observable<RawShortRepo> {
    return this.getArray<RawShortRepo>(reposUrl);
  }

  getPulls(pullsUrl: string): Observable<RawShortPull> {
    return this.getArray<RawShortPull>(pullsUrl);
  }

  getComments(commentsUrl: String): Observable<Array<RawShortComment>> {
    return this.get<Array<RawShortComment>>(commentsUrl);
  }

  getCommits(commitsUrl: string): Observable<Array<RawShortCommit>> {
    return this.get<Array<RawShortCommit>>(commitsUrl);
  }
};
