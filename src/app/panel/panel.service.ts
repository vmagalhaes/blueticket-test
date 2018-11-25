import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import * as _ from 'lodash';
import * as $ from 'jquery';

import { RestClientService } from '../core/services';
import { Quotation } from './quotations';
import { Tax } from 'src/app/panel/taxes';

@Injectable()
export class PanelService extends RestClientService {


  constructor() {
    super();
  }

  getQuotations(): Observable<Quotation> {
    return Observable.create((observer: Observer<Quotation>) => {
      $.ajax(this.collectionPath('quotations'), {
        type: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }).then((response: any) => {
        observer.next(this.unmarshalQuotations(response.results));
      }, (jqXHR: any) => {
        observer.error(jqXHR.responseText);
      });
    });
  }

  getTaxes(): Observable<Tax> {
    return Observable.create((observer: Observer<Tax>) => {
      $.ajax(this.collectionPath('taxes'), {
        type: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }).then((response: any) => {
        observer.next(response.results[0]);
      }, (jqXHR: any) => {
        observer.error(jqXHR.responseText);
      });
    });
  }

  private unmarshalQuotations(quotations): Quotation {
    return {
      bitcoin: [
        _.assign(quotations.bitcoin.bitstamp,        { key: 'bitstamp'}),
        _.assign(quotations.bitcoin.blockchain_info, { key: 'blockchain_info'}),
        _.assign(quotations.bitcoin.coinbase,        { key: 'coinbase'}),
        _.assign(quotations.bitcoin.foxbit,          { key: 'foxbit'}),
        _.assign(quotations.bitcoin.mercadobitcoin,  { key: 'mercadobitcoin'}),
        _.assign(quotations.bitcoin.omnitrade,       { key: 'omnitrade'})
      ],
      currencies: [
        _.assign(quotations.currencies.ARS, { key: 'ARS'}),
        _.assign(quotations.currencies.BTC, { key: 'BTC'}),
        _.assign(quotations.currencies.EUR, { key: 'EUR'}),
        _.assign(quotations.currencies.GBP, { key: 'GBP'}),
        _.assign(quotations.currencies.USD, { key: 'USD'})
      ],
      stocks: [
        _.assign(quotations.stocks.CAC,      { key: 'CAC'}),
        _.assign(quotations.stocks.IBOVESPA, { key: 'IBOVESPA'}),
        _.assign(quotations.stocks.NASDAQ,   { key: 'NASDAQ'}),
        _.assign(quotations.stocks.NIKKEI,   { key: 'NIKKEI'})
      ]
    };
  }

  private collectionPath(service): string {
    return `https://api.hgbrasil.com/finance/${service}/?format=json-cors&key=e4a91234`;
  }

}
