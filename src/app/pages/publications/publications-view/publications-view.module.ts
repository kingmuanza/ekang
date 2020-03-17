import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PublicationsViewPageRoutingModule } from "./publications-view-routing.module";

import { PublicationsViewPage } from "./publications-view.page";
//import { DisplayPageModule } from "src/app/display/display.module";
import { ShareModule } from "src/app/share.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // DisplayPageModule,
    ShareModule,
    PublicationsViewPageRoutingModule
  ],
  declarations: [PublicationsViewPage]
})
export class PublicationsViewPageModule {}
