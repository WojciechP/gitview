import {Component, Input, View} from 'angular2/core';

import {Comment} from '../../gitconnect/ifaces';
import {RelativeDate} from './relative-date';

let marked = require('marked');

@Component({
  selector: 'gv-comment'
})
@View({
  pipes: [RelativeDate],
  template:`
    <div class="comment">
      <span class="date">{{comment.timestamp | relativeDate}}</span>
      <div class="author">{{comment.author.login}}</div>
      <div class="body" [innerHtml]="body"></div>
    </div>`
})
export class CommentComponent {
  @Input() comment: Comment;
  get body(): String {
    return marked(this.comment.body);
  }
}
