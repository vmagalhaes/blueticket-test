import { Component, OnInit } from '@angular/core';

import { PanelService } from './panel.service';
import { Quotations, Currency, Bitcoin, Stock } from './quotations';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  currencies: Currency[];
  bitcoin: Bitcoin[];
  stocks: Stock[];

  constructor(
    private panelService: PanelService
  ) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.panelService
      .getQuotations()
      .subscribe((values: Quotations) => {
        console.log(values);
        this.currencies = values.currencies;
        this.bitcoin = values.bitcoin;
        this.stocks = values.stocks;
      }, (error) => {
        console.warn(error);
      });

    this.panelService
      .getTaxes()
      .subscribe((values) => {
        console.log(values);
      }, (error) => {
        console.warn(error);
      });
  }

}
