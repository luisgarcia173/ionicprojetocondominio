import {Page, NavController, Storage, LocalStorage} from 'ionic-angular';
import {Toast} from 'ionic-native';
import {HomePage} from '../home/home';

@Page({
	templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

	// Ionic properties
	private nav: NavController;
	private localStorage: LocalStorage;

	// Page attributes
	private passcode: string;
	private quickcode: any;
	private passIcon: any;

	constructor(nav: NavController) {
		this.nav = nav;
		this.cleanObjects();
		this.localStorage = new Storage(LocalStorage);
	}

	// Pressiona teclado numerico
	pressed(entry) {
		if (this.passcode.length < 4) {
			this.passcode = this.passcode + entry;
			this.quickcode[this.passcode.length -1] = entry;

			setTimeout(() => {
				this.quickcode = [];
				this.refreshIcons();
			}, 500);

			// Validar senha
			if (this.passcode.length == 4) {
				// Verifica senha OK
				if (this.passcode === localStorage.getItem('passcode')) { //FIXIT buscar banco
					setTimeout(() => {
						this.cleanObjects();
						this.nav.push(HomePage);
					}, 500);
				} else {
					// Envia msg erro
					setTimeout(() => {
						Toast.showShortCenter('Senha incorreta.');
						this.cleanObjects();
					}, 500);
				}
			}
		}
	}

	// Remove ultimo digito
	backspace() {
		if (this.passcode.length > 0) {
			this.passcode = this.passcode.substring(0, this.passcode.length - 1);
			this.refreshIcons();
		}
	}

	refreshIcons() {
		this.passIcon = [];
		for (var i = 0; i < this.passcode.length; i++) {
			this.passIcon[i] = "cube";
		}
	}

	cleanObjects() {
		this.passcode = '';
		this.quickcode = [];
		this.passIcon = [];
	}

}
