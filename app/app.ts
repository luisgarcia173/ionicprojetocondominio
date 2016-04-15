import 'es6-shim';
import {App, Platform, Storage, LocalStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  private rootPage: any = LoginPage;
  private localStorage: LocalStorage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
    this.initializeApp();
  }

  initializeApp() {
    this.localStorage = new Storage(LocalStorage);
    this.localStorage.set('passcode', '0000');
  }

}
