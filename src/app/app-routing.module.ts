import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelComponent } from './panel/panel.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  {
    path: 'panel',
    component: PanelComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
