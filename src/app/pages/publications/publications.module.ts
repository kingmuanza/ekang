import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PublicationsPageRoutingModule } from "./publications-routing.module";

import { PublicationsPage } from "./publications.page";
import { DisplayPageModule } from "src/app/display/display.module";
import { ShareModule } from "src/app/share.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // DisplayPageModule,
    ShareModule,
    PublicationsPageRoutingModule
  ],
  declarations: [PublicationsPage]
})
export class PublicationsPageModule {}
