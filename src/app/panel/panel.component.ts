import { Component, OnInit } from '@angular/core';
import { PanelService } from './panel.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(
    private panelService: PanelService
  ) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.panelService
      .getCurrenciesAndGrants()
      .subscribe((values) => {
        console.log(values);
      }, (error) => {
        console.warn(error);
      });

    this.panelService
      .getCDIAndSELIC()
      .subscribe((values) => {
        console.log(values);
      }, (error) => {
        console.warn(error);
      });
  }

}
