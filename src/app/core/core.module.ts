import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { SettingsService } from './services';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    SettingsService
  ]
})
export class CoreModule { }
