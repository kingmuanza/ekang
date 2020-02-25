import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmisViewPageRoutingModule } from './amis-view-routing.module';

import { AmisViewPage } from './amis-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmisViewPageRoutingModule
  ],
  declarations: [AmisViewPage]
})
export class AmisViewPageModule {}
