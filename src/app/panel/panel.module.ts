import { NgModule } from '@angular/core';

import { PanelComponent } from './panel.component';

import { PanelService } from './panel.service';

@NgModule({
  declarations: [
    PanelComponent
  ],
  imports: [],
  providers: [
    PanelService
  ],
  bootstrap: []
})
export class PanelModule { }
