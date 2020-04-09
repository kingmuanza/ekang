import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikeursPageRoutingModule } from './likeurs-routing.module';

import { LikeursPage } from './likeurs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LikeursPageRoutingModule
  ],
  declarations: [LikeursPage]
})
export class LikeursPageModule {}
