import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmisViewPageRoutingModule } from './amis-view-routing.module';

import { AmisViewPage } from './amis-view.page';
import { DisplayPageModule } from 'src/app/display/display.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayPageModule,
    AmisViewPageRoutingModule
  ],
  declarations: [AmisViewPage]
})
export class AmisViewPageModule {}
