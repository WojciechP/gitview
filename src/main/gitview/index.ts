import {PullsComponent} from './components/pulls';
import {PullService} from './services/pulls';
import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/bootstrap';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Component({
  selector: 'gv-app'
})
@View({
  directives: [PullsComponent],
  template: `<div>
              <header>Welcome to GitView</header>
              <gv-pulls>loading projects...</gv-pulls>
            </div>`
})
export class GVApp {

}

export function init() {
  bootstrap(GVApp, [PullService, Http, HTTP_PROVIDERS]);
};
