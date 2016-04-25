
export class Pagamento {

	public id: number;
	public descricao: string;
	public valor: number;
	public status: boolean;
	public icon: string;
	public frequencia: string;
	public ultimo: Date;

	constructor() {}

	static getIcons() {
		return ['trash', 'cut', 'bug'];
	}

	static getFrequencies() {
		return ['pontual','diario','semanal','quinzenal','mensal','trimestral','semestral','anual'];
	}

	static buildModel(id: number, descricao: string, valor: number, status: boolean, icon: string, frequencia: string, ultimo: Date) {
		var p = new Pagamento();
		p.id = id;
		p.descricao = descricao;
		p.valor = valor;
		p.status = status;
		p.icon = icon;
		p.frequencia = frequencia;
		p.ultimo = ultimo;
		return p;
	}

}