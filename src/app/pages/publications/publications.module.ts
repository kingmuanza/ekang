import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PublicationsPageRoutingModule } from "./publications-routing.module";

import { PublicationsPage } from "./publications.page";
import { PublicationItemComponent } from "src/app/components/publication-item/publication-item.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicationsPageRoutingModule
  ],
  declarations: [PublicationsPage, PublicationItemComponent]
})
export class PublicationsPageModule {}
