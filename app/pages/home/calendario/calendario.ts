import {Page} from 'ionic-angular';
import {Calendario} from './../../../models/calendario/calendario';

interface Dictionary {
	[key: number]: string[];
}

@Page({
	templateUrl: 'build/pages/home/calendario/calendario.html'
})
export class CalendarioPage {

	public calendario: Calendario;
	public days: number[] = new Array();
	public eventos: any;
	public datesInterval: number[] = new Array();

	private eventosRealizados: Dictionary;

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
		this.eventosRealizados = {
			30: ['test1'],
			 1: ['test5']
		};
		this.populateDaysWeek();
	}

	itemTapped() {
	}

	listEvents(dia: number) {
		var eventos = [];
		for (var i = 0; i < this.eventos.length; i++) {
			var key = this.eventos[i];
			if (dia == key && this.calendario.eventos.hasOwnProperty(key)) {
				eventos = this.calendario.eventos[key];
				break;
			}
		}
		if (eventos.length < 1) {
			eventos[0] = ' ';
		}
		return eventos;
	}

	checkEventDone(dia: any, evento: string) {
		if (this.calendario.eventos.hasOwnProperty(dia) && this.eventosRealizados.hasOwnProperty(dia)) {
			var eventos = this.calendario.eventos[dia];
			var realizados = this.eventosRealizados[dia];
			for (var i = 0; i < realizados.length; i++) {
				for (var j = 0; j < eventos.length; j++) {
					if (eventos[j] == realizados[i] && realizados[i] == evento) {
						return true;
					}
				}
			}
		}
		return false;
	}

	checkAsDone(dia: any, evento: string) {
		// verifica dia existe
		if (this.eventosRealizados.hasOwnProperty(dia)) {
			// verifica evento existe para aquele dia
			var realizados = this.eventosRealizados[dia];
			var removed = false;
			for (var i = 0; i < realizados.length; i++) {
				// se existe evento, remove
				if (realizados[i] == evento) {
					realizados.splice(i, 1);
					removed = true;
					// atualiza array
					this.eventosRealizados[dia] = realizados;
				}
			}
			// se nao existe evento, adiciona
			if (!removed) {
				realizados.push(evento);
				// atualiza array
				this.eventosRealizados[dia] = realizados;
			} else {
				// verifica se existe mais algum evento para aquele dia, se nao remove lista
				if (realizados.length == 0) {
					delete this.eventosRealizados[dia];
				}
			}
			
		} else {
			// adiciona nova chave com array
			this.eventosRealizados[dia] = [evento];
		}
	}

	getClassDone(dia: number, evento: string) {
		if (this.checkEventDone(dia, evento)) {
			return 'strike';	
		}
		return '';
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