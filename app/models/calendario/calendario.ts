
export class Calendario {

	public inicio: string;
	public fim: string;
	public eventos: Dictionary;

	constructor() { }

}

interface Dictionary {
	[key: number]: string[];
}