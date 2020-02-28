import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicationsEditPageRoutingModule } from './publications-edit-routing.module';

import { PublicationsEditPage } from './publications-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PublicationsEditPageRoutingModule
  ],
  declarations: [PublicationsEditPage]
})
export class PublicationsEditPageModule {}
