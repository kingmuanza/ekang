import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MonprofilPageRoutingModule } from "./monprofil-routing.module";

import { MonprofilPage } from "./monprofil.page";
import { ShareModule } from "src/app/share.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonprofilPageRoutingModule,
    ShareModule
  ],
  declarations: [MonprofilPage]
})
export class MonprofilPageModule {}
