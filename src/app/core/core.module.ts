import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { SettingsService, AuthGuardService, AuthService } from './services';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    SettingsService,
    AuthGuardService,
    AuthService
  ]
})
export class CoreModule { }
