
import {Component, Input, View} from 'angular2/core';

import {Commit} from '../../gitconnect/ifaces';
import {RelativeDate} from './relative-date';

@Component({
  selector: 'gv-commit'
})
@View({
  pipes: [RelativeDate],
  template:`
    <div class="commit">
      <span class="date">{{commit.timestamp | relativeDate}}</span>
      <span class="author">{{commit.author}}</span>
      <span class="message">{{commit.message}}</span>
      <span class="sha">{{commit.sha}}</span>
    </div>`
})
export class CommitComponent {
  @Input() commit: Commit;
}
