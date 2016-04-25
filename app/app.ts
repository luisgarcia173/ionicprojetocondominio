import 'es6-shim';
import {App, IonicApp, Platform, MenuController, Storage, LocalStorage, SqlStorage} from 'ionic-angular';
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
  private storage: Storage;
  private platform: Platform;

  constructor(platform: Platform, app: IonicApp, menu: MenuController) {

    this.platform = platform;
    this.menu = menu;
    this.app = app;
    this.pages = [
      { icon: 'lock', title: 'Alterar Senha', component: '' },
      { icon: 'power', title: 'Logout', component: LoginPage }
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.localStorage = new Storage(LocalStorage);
    if ('' === localStorage.getItem('passcode')) {
      this.localStorage.set('passcode', '0000');
    }
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      // DB Tables
      this.createPagamentoDB();
    });
  }

  createPagamentoDB() {
    this.storage = new Storage(SqlStorage);
    this.storage.query('DROP TABLE pagamento');
    this.storage.query('CREATE TABLE IF NOT EXISTS pagamento (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, valor REAL, status INTEGER, icon TEXT, frequencia TEXT, ultimo REAL)')
      .then((data) => {
        console.log("TABLE pagamento CREATED -> " + JSON.stringify(data.res));
      }, (error) => {
        console.log("ERROR -> " + JSON.stringify(error.err));
      }
    );
    // MOCK
    this.storage.query("INSERT INTO pagamento (descricao, valor, icon, frequencia, status, ultimo) VALUES ('Faxineira', 200.00, 'trash', 'quinzenal',1, 1460948400000)");
    this.storage.query("INSERT INTO pagamento (descricao, valor, icon, frequencia, status, ultimo) VALUES ('Jardineiro', 150.00, 'cut', 'mensal',1, 1461034800000)");
    this.storage.query("INSERT INTO pagamento (descricao, valor, icon, frequencia, status, ultimo) VALUES ('Detetização', 300.00, 'bug', 'trimestral',1, 1461294000000)");
  }

  openPage(page) {
    this.menu.close();
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }

}
