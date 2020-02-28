import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicationsViewPageRoutingModule } from './publications-view-routing.module';

import { PublicationsViewPage } from './publications-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicationsViewPageRoutingModule
  ],
  declarations: [PublicationsViewPage]
})
export class PublicationsViewPageModule {}
