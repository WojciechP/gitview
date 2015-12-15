import {Component, View} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {PullActivityService, PullRequest} from '../services/pullActivity';
import {PullActivityComponent} from './pullActivity';

@Component({
  selector: 'gv-pulls'
})
@View({
  directives: [NgFor, PullActivityComponent],
  template: `<div>
              <div *ngFor="#pull of pulls">
                <header>
                  {{pull.repo.name}}#{{pull.number}}: {{pull.title}}
                  Activities:
                  <gv-pull-activity [activityLog]="pull.activityLog">
                  </gv-pull-activity>
                  <ul>
                    <li *ngFor="#com of pull.raw.comments">
                      {{com.user.login}}: {{com.body}}
                    </li>
                    <li *ngFor="#com of pull.raw.commits">
                      {{com.sha}}: {{com.commit.message}} by
                    </li>
                  </ul>
                </header>
              </div>
            </div>`
})
export class PullsComponent {

  pulls: Array<PullRequest>;

  constructor(pullActivityService: PullActivityService) {
    this.pulls = [];
    pullActivityService.getPullsActivity().forEach(pull => {
      this.pulls.push(pull);
    }, this);
  }
}
