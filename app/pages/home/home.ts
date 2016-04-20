import {Page} from 'ionic-angular';
import {RelatoriosPage} from './relatorio/relatorio';
import {CondominosPage} from './condomino/condomino';
import {PagamentosPage} from './pagamento/pagamento';
import {CalendarioPage} from './calendario/calendario';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

	private tabHome    : any;
	private tabPeople  : any;
	private tabCash    : any;
	private tabCalendar: any;

  constructor() {
	  this.tabHome     = RelatoriosPage;
	  this.tabPeople   = CondominosPage;
	  this.tabCash     = PagamentosPage;
	  this.tabCalendar = CalendarioPage;
  }

}
