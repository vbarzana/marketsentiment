import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';

@Injectable()
export class RestProvider {
  // private url: string = 'http://localhost:1337/googlefinance/loadCompanyNews';
  private url: string = 'googlefinance/loadCompanyNews';

  constructor(public http: HttpClient) {
  }

  async loadCompanyNews(symbols: any = null, from: any = null, to: any = null): Promise<Object> {
    if (_.isArray(symbols)) {
      symbols = symbols.join(',');
    }
    try {
      let loadNewsUrl = `${this.url}?s=${symbols}` + (from ? `&from=${from}` : '') + (to ? `&to=${to}` : '');
      return await this.http.get(loadNewsUrl).toPromise();
    } catch (err) {
      console.log(err);
      return {};
    }

  }
}
