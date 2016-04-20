import {Page} from 'ionic-angular';

@Page({
	templateUrl: 'build/pages/home/pagamento/pagamento.html'
})
export class PagamentosPage {

	private pagamentos: Pagamento[] = PAGAMENTOS_MOCK;
	private pagamento: Pagamento;

	constructor() {
		
	}

	itemTapped(pagamento: Pagamento) {
		this.pagamento = pagamento;
		console.log(pagamento);
	}

}

export class Pagamento {

	public id: number;
	public descricao: string;
	public valor: number;
	public status: boolean;
	public icon: string;
	public frequencia: string;
	public ultimo: Date;

}

// Constant - move to mock.ts
var PAGAMENTOS_MOCK: Pagamento[] = [
  { id: 1, descricao: "Faxineira", valor: 200.00, status: true, icon: "trash", frequencia: "quinzenal", ultimo: new Date(2016,3,20) },
  { id: 1, descricao: "Jardineiro", valor: 150.00, status: true, icon: "cut", frequencia: "mensal", ultimo: new Date(2016,3,15) },
  { id: 1, descricao: "Detetização", valor: 300.00, status: true, icon: "bug", frequencia: "trimestral", ultimo: new Date(2016,3,18) }
];

// Combos
enum frequencia {
	pontual, diario, semanal, quinzenal, mensal, trimestral, semestral, anual
}
enum icones {
	trash, cut, bug
}