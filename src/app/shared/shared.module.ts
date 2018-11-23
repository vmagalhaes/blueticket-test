import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ConvertCoinPipe } from './pipes/convert-coin.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ConvertCoinPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ConvertCoinPipe
  ],
  providers: [
    ConvertCoinPipe
  ]
})
export class SharedModule { }
