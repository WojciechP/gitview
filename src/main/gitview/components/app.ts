import {Component, View} from 'angular2/core';

import {PullsComponent} from './pulls';


@Component({
  selector: 'gv-app'
})
@View({
  directives: [PullsComponent],
  template: `
    Pulls: <gv-pulls>(loading)</gv-pulls>
    `
})
export class AppComponent {

}
