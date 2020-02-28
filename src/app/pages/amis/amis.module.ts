import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmisPageRoutingModule } from './amis-routing.module';

import { AmisPage } from './amis.page';
import { ProfilListItemComponent } from 'src/app/components/profil-list-item/profil-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmisPageRoutingModule
  ],
  declarations: [
    AmisPage,
    ProfilListItemComponent
  ]
})
export class AmisPageModule {}
