import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalePageRoutingModule } from './principale-routing.module';

import { PrincipalePage } from './principale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalePageRoutingModule
  ],
  declarations: [PrincipalePage]
})
export class PrincipalePageModule {}
