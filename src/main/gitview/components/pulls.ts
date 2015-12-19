import {Component, View} from 'angular2/core';
import {NgIf, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';

import {PullRequest, Repo, Comment} from '../../gitconnect/ifaces';
import {GitconnectService} from '../../gitconnect/services';
import {ReviewablePull, ReviewService} from '../services';
import {CommentComponent} from './comment';
import {CommitComponent} from './commit';


@Component({
  selector: 'gv-pulls'
})
@View({
  directives: [CommitComponent, CommentComponent, NgSwitch, NgSwitchWhen, NgSwitchDefault],
  template: `
    <ul class="pulls">
      <li *ngFor="#pull of pulls">
        <header>
          <span class="repo">{{pull.pull.repo.name}}</span>
          <a href="{{pull.pull.url}}">
            <span class="number">{{pull.pull.number}}</span>
            <span class="title">{{pull.pull.title}}</span>
          </a>
        </header>
        <ul class="entries">
          <li *ngFor="#entry of pull.entries" [ngSwitch]="entry.type">
            <template [ngSwitchWhen]="'comment'">
              <gv-comment [comment]="entry.content"></gv-comment>
            </template>
            <template [ngSwitchWhen]="'commit'">
              <gv-commit [commit]="entry.content"></gv-commit>
            </template>
            <template ngSwitchDefault>Unknown type</template>
          </li>
        </ul>
      </li>
    </ul>`
})
export class PullsComponent {
  pulls: Array<ReviewablePull>

  upsertPull(pull: ReviewablePull) {
    this.pulls = this.pulls.filter(t => t.pull.raw.id != pull.pull.raw.id);
    this.pulls.push(pull);
    this.pulls = this.pulls.sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime())

  }

  constructor(private gitConnect: GitconnectService, private reviews: ReviewService) {
    this.pulls = [];
    gitConnect.getOrgs()
      .flatMap<Repo>(org => gitConnect.getRepos(org))
      .flatMap<PullRequest>(repo => gitConnect.getPulls(repo))
      .flatMap<ReviewablePull>(pull => reviews.reviewPull(pull))
      .forEach(this.upsertPull, this);

  }
}
