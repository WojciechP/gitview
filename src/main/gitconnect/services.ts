import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs';

import * as raw from './raw-ifaces';
import {User, Organization, Repo, PullRequest, Comment, Commit} from './ifaces';

const TOKEN = PUT YOUR GITHUB TOKEN HERE;

@Injectable()
export class GitconnectService {
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
    return this.http
      .get(endpoint, {headers: this.headers})
      .flatMap(r => Observable.from(r.json()));
  }

  public getUser(): Observable<User> {
    return this.get<raw.ShortUser>('https://api.github.com/user')
      .map(u => new User(u));
  }

  public getOrgs(): Observable<Organization> {
    return this.getArray<raw.ShortOrg>('https://api.github.com/user/orgs')
      .map(o => new Organization(o));
  }

  public getRepos(org: Organization): Observable<Repo> {
    return this.getArray<raw.ShortRepo>(org.raw.repos_url)
      .map(r => new Repo(r, org));
  }

  public getPulls(repo: Repo): Observable<PullRequest> {
    return this
      .getArray<raw.ShortPull>(repo.raw.pulls_url.replace('{/number}', ''))
      .map(pull => new PullRequest(pull, repo));
  }

  public getComments(pull: PullRequest): Observable<Comment> {
    return this
      .getArray<raw.ShortComment>(pull.raw.comments_url)
      .map(comment => new Comment(comment, pull));
  }

  public getCommits(pull: PullRequest): Observable<Commit> {
    return this
      .getArray<raw.ShortCommit>(pull.raw.commits_url)
      .map(commit => new Commit(commit, pull));
  }
}
