import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicationDisplayPageRoutingModule } from './publication-display-routing.module';

import { PublicationDisplayPage } from './publication-display.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicationDisplayPageRoutingModule
  ],
  declarations: [PublicationDisplayPage]
})
export class PublicationDisplayPageModule {}
