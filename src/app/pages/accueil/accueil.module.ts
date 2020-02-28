import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccueilPageRoutingModule } from './accueil-routing.module';

import { AccueilPage } from './accueil.page';
import { PublicationItemComponent } from 'src/app/components/publication-item/publication-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccueilPageRoutingModule
  ],
  declarations: [AccueilPage, PublicationItemComponent]
})
export class AccueilPageModule {}
