
import {bootstrap} from 'angular2/bootstrap';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {GitconnectService} from '../gitconnect/services';
import {AppComponent} from './components';
import {ReviewService} from './services';

export function init() {
  bootstrap(AppComponent, [ReviewService, GitconnectService, Http, HTTP_PROVIDERS]);
}
