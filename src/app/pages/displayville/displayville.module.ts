import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayvillePageRoutingModule } from './displayville-routing.module';

import { DisplayvillePage } from './displayville.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayvillePageRoutingModule
  ],
  declarations: [DisplayvillePage]
})
export class DisplayvillePageModule {}
