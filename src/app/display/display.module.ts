import { NgModule } from '@angular/core';
import { PublicationItemComponent } from '../components/publication-item/publication-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilListItemComponent } from '../components/profil-list-item/profil-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    PublicationItemComponent,
    ProfilListItemComponent
  ],
  exports: [
    PublicationItemComponent,
    ProfilListItemComponent
  ]
})
export class DisplayPageModule { }
