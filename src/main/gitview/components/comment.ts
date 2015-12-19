import {Component, Input, View} from 'angular2/core';

import {Comment} from '../../gitconnect/ifaces';

@Component({
  selector: 'gv-comment'
})
@View({
  template:`
    <div class="comment">
      <div class="author">{{comment.author.login}}</div>
      <div class="body">{{comment.body}}</div>
    </div>`
})
export class CommentComponent {
  @Input() comment: Comment;
}
