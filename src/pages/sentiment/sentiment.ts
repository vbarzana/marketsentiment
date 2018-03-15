import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import * as _ from 'lodash';
import * as moment from 'moment';

@IonicPage({
  name: 'sentiment'
})
@Component({
  selector: 'page-sentiment',
  templateUrl: 'sentiment.html'
})
export class SentimentPage {
  data: object[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.loadTrendingSymbols();
  }

  async loadTrendingSymbols() {
    var data = _.castArray(_.get(await this.rest.loadTrendingSymbolsFromStockTwits(), 'data.symbols')).sort(function (a, b) {
      return parseInt(_.get(a, 'watchlist_count'), 10) >= parseInt(_.get(b, 'watchlist_count'), 10) ? -1 : 1;
    });
    this.data = _.filter(data, function (symbolData) {
      return !_.isEmpty(symbolData.historical) && _.first(symbolData.historical).open <= 30;
    });
  }

  getDateClass(dateItem) {
    return (new Date(dateItem).getDate() === new Date().getDate()) ? 'news-from-today' : '';
  }

  extractHostName(link){
    return _.replace(_.first(_.split(_.last(_.split(link, '://')), '/')), 'www.', '');
  }
}
