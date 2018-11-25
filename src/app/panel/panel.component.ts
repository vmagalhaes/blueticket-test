import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

import { Chart } from 'chart.js';

import { PanelService } from './panel.service';
import { Quotation, Currency, Bitcoin, Stock } from './quotations';
import { Tax } from './taxes';
import * as _ from 'lodash';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  currencies: Currency[];
  bitcoin: Bitcoin[];
  stocks: Stock[];

  taxes: Tax;

  modal: HTMLElement;
  chart = [];
  chartTitle: string;

  constructor(
    private panelService: PanelService
  ) { }

  ngOnInit() {
    this.persistData();
    this.initGraphicModal();
  }

  onRowClick(key, type, name) {
    this.chartTitle = name;

    let storage = JSON.parse(localStorage.getItem('data_quotations'));    
    const labels = _.map(storage.quotations, quotation => `${new Date(quotation.date).getHours()}h`);
    let data = _.map(storage.quotations, (quotation) => {
      if (type === 'stocks') {
        return _.find(quotation.values[type], ['key', key]).variation;
      } else {
        return _.find(quotation.values[type], ['key', key]).buy;
      }
    });

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          { 
            data: data,
            borderColor: "#3cba9f",
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

    this.modal.style.display = 'block';
  }

  getValues() {
    this.panelService
      .getQuotations()
      .subscribe((values: Quotation) => {
        let data = JSON.parse(localStorage.getItem('data_quotations'));

        if (!!!_.find(data.quotations, (quotation) => {
          return new Date(quotation.date).getHours() === new Date().getHours();
        })) {
          data.quotations.push({ date: new Date(), values: values });
          
          localStorage.setItem('data_quotations',
            JSON.stringify({
              quotations: data.quotations
            }));
        }

        this.currencies = values.currencies;
        this.bitcoin = values.bitcoin;
        this.stocks = values.stocks;
      }, (error) => {
        console.warn(error);
      });

    this.panelService
      .getTaxes()
      .subscribe((values: Tax) => {
        let data = JSON.parse(localStorage.getItem('data_taxes'));
  
        if (!!!_.find(data.taxes, (tax) => {
          return new Date(tax.date).getHours() === new Date().getHours();
        })) {
          data.taxes.push({ date: new Date(), values: values });
          
          localStorage.setItem('data_taxes',
            JSON.stringify({
              taxes: data.taxes
            }));
        }

        this.taxes = values;
        this.taxes.date = new Date(this.taxes.date).toLocaleDateString('pt-BR');
      }, (error) => {
        console.warn(error);
      });
  }

  private initGraphicModal() {
    this.modal = document.getElementById('graphic');

    window.onclick = (event) => {
      if (event.target == this.modal) {
        this.modal.style.display = 'none';
      }
    }
  }

  private persistData() {
    let data = JSON.parse(localStorage.getItem('data_quotations'));

    if (!data) {
      localStorage.setItem('data_taxes',
        JSON.stringify({
          taxes: []
        }));

      localStorage.setItem('data_quotations',
        JSON.stringify({
          quotations: []
        }));
    }

    this.getValues();    

    interval(1000 * 60 * 60)
      .subscribe((val) => {
        this.getValues();
      }, (error) => {
        console.warn(error);
      });
  }

}
