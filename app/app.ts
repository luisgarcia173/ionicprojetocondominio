import 'es6-shim';
import {App, IonicApp, Platform, MenuController, Storage, LocalStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';


@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  private rootPage: any = LoginPage;
  private localStorage: LocalStorage;
  private menu: MenuController;
  private pages: any;
  private app: IonicApp;

  constructor(platform: Platform, app: IonicApp, menu: MenuController) {

    this.menu = menu;
    this.app = app;
    this.pages = [
      { icon: 'lock', title: 'Alterar Senha', component: '' },
      { icon: 'power', title: 'Logout', component: LoginPage }
    ];

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
    this.initializeApp();
  }

  initializeApp() {
    this.localStorage = new Storage(LocalStorage);
    this.localStorage.set('passcode', '0000');
  }

  openPage(page) {
    this.menu.close();
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }

}
