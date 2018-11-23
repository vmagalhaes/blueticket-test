import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

interface Currency {
  name: string;
  buy: string;
  sell: string;
  variation: string;
}

import { RestClientService, SettingsService } from '../core/services';

@Injectable()
export class PanelService extends RestClientService {

  private apiPath: string;

  constructor(
    private http: HttpClient,
    private settings: SettingsService,
  ) {
    super();
    this.apiPath = this.settings.getApiPath();
  }

  getCurrenciesAndGrants(): Observable<any[]> {
    return this.http
      .get(this.collectionPath('quotations'), this.buildRequestOptions())
      .pipe(map((response) => {
        return this.extract<any[]>(response);
      }, catchError(this.handleError)));
  }

  getCDIAndSELIC(): Observable<any[]> {
    return this.http
      .get(this.collectionPath('taxes'), this.buildRequestOptions())
      .pipe(map((response) => {
        return this.extract<any[]>(response);
      }, catchError(this.handleError)));
  }

  private collectionPath(service): string {
    return `https://api.hgbrasil.com/finance/${service}/?format=json&key=e4a91234`;
  }

}
