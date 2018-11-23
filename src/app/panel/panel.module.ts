import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel.component';

import { SharedModule } from '../shared/shared.module';

import { PanelService } from './panel.service';

@NgModule({
  declarations: [
    PanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    PanelService
  ],
  bootstrap: []
})
export class PanelModule { }
