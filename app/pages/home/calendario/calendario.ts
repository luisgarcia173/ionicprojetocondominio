import {Page} from 'ionic-angular';
import {Calendario} from './../../../models/calendario/calendario';

@Page({
	templateUrl: 'build/pages/home/calendario/calendario.html'
})
export class CalendarioPage {

	public calendario: Calendario;
	public days: number[] = new Array();
	public eventos: any;

	public datesInterval: number[] = new Array();

	constructor() {
		this.calendario = new Calendario();
		this.calendario.inicio = '29/04/2016';
		this.calendario.fim = '05/05/2016';
		this.calendario.eventos = {
			30: ['test1','test2','test3'], 
		  29: ['test4'], 
		   1: ['test5'], 
		   4: ['test6']
		};

		this.eventos = Object.keys(this.calendario.eventos);
		this.populateDaysWeek();
	}

	itemTapped() {
	}

	listarEventos(dia: number) {
		var eventos = [];
		for (var i = 0; i < this.eventos.length; i++) {
			var key = this.eventos[i];
			if (dia == key && this.calendario.eventos.hasOwnProperty(key)) {
				eventos = this.calendario.eventos[key];
				break;
			}
		}
		return eventos;
	}

	getWeekDay(day: number) {
		var weekDay = new Array(7);
		weekDay[0] = 'Domingo';
		weekDay[1] = 'Segunda';
		weekDay[2] = 'Terça';
		weekDay[3] = 'Quarta';
		weekDay[4] = 'Quinta';
		weekDay[5] = 'Sexta';
		weekDay[6] = 'Sábado';
		return weekDay[day];
	}

	populateDaysWeek() {
		var dtIni    = this.parseDateString(this.calendario.inicio);
		var dtFin    = this.parseDateString(this.calendario.fim);
		var daysDiff = this.daysBetween(dtFin, dtIni);

		for (var i = 0; i <= daysDiff; i++) {
			var auxDate = new Date(dtIni.getTime());
			auxDate.setDate(auxDate.getDate() + i);
			this.datesInterval.push(auxDate.getDay());
			this.days.push(auxDate.getDate());
		}
	}

	parseDateString(date: string) {
		var dateAux = date.split("/");
		var newDate = dateAux[1] + "/" + dateAux[0] + "/" + dateAux[2];
		return new Date(Date.parse(newDate));
	}

	daysBetween(startDate: Date, endDate: Date) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((startDate.getTime() - endDate.getTime()) / millisecondsPerDay);
	}

}