import {Page, Modal, NavController, ViewController, NavParams, Platform, Storage, SqlStorage} from 'ionic-angular';
import {Pagamento} from './../../../models/pagamento/pagamento';


@Page({
	templateUrl: 'build/pages/home/pagamento/pagamento.html'
})
export class PagamentosPage {

	private pagamentos: Pagamento[];
	private pagamento: Pagamento;
	private nav: NavController;
	private platform: Platform;
	private storage: Storage;

	constructor(nav: NavController, platform: Platform) {
		this.nav = nav;
		this.platform = platform;

		this.platform.ready().then(() => {
			this.storage = new Storage(SqlStorage);
			this.selectAllPayments();
		});
	}

	itemTapped(pagamento: Pagamento) {
		this.pagamento = pagamento;
		this.formPagamento();
	}

	formPagamento() {
		let modal = Modal.create(PagamentoForm, { 'pagamento': this.pagamento, 'list': this});
    this.nav.present(modal);
    this.pagamento = new Pagamento();
	}

	selectAllPayments() {
		this.platform.ready().then(() => {
			this.storage.query("SELECT * FROM pagamento").then((data) => {
				this.pagamentos = [];
				if (data.res.rows.length > 0) {
					for (var i = 0; i < data.res.rows.length; i++) {
						var p = data.res.rows.item(i);
						this.pagamentos.push({ id: p.id, descricao: p.descricao, valor: p.valor, status: p.status, icon: p.icon, frequencia: p.frequencia, ultimo: p.ultimo });
					}
				}
			}, (error) => {
				console.log("ERROR -> " + JSON.stringify(error.err));
			});
		});
	}

}

@Page({
	templateUrl: 'build/pages/home/pagamento/pagamento-form.html'
})
export class PagamentoForm {

	private view: ViewController;
	private params: NavParams;
	private pagamento: Pagamento;
	private platform: Platform;
	private storage: Storage;
	private list: PagamentosPage;

	public icons = Pagamento.getIcons();
	public frequencies = Pagamento.getFrequencies();
	
	constructor(view: ViewController, params: NavParams, platform: Platform) {
		this.view = view;
		this.params = params;
		this.platform = platform;
		this.platform.ready().then(() => {
			this.storage = new Storage(SqlStorage);
		});

		this.list = this.params.get("list");
		if (typeof this.params.get("pagamento") !== "undefined") {
			this.pagamento = this.params.get("pagamento");
		} else {
			this.pagamento = new Pagamento();
		}
	}

	dismiss() {
		this.view.dismiss();
  }

  save() {
		this.platform.ready().then(() => {
			this.storage.query("INSERT INTO pagamento (descricao, valor, icon, frequencia, status) VALUES (?, ?, ?, ?, ?)", [this.pagamento.descricao, this.pagamento.valor, this.pagamento.icon, this.pagamento.frequencia, '0']).then((data) => {
				console.log("ADDED -> " + JSON.stringify(data.res));
				this.dismiss();
				this.list.selectAllPayments();
			}, (error) => {
				console.log("ERROR -> " + JSON.stringify(error.err));
			});
		});
  }

}