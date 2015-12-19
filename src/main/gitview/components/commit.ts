
import {Component, Input, View} from 'angular2/core';

import {Commit} from '../../gitconnect/ifaces';

@Component({
  selector: 'gv-commit'
})
@View({
  template:`
    <div class="commit">
      <span class="author">{{commit.author}}</span>
      <span class="message">{{commit.message}}</span>
      <span class="sha">{{commit.sha}}</span>
    </div>`
})
export class CommitComponent {
  @Input() commit: Commit;
}
