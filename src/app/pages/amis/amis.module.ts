import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AmisPageRoutingModule } from "./amis-routing.module";

import { AmisPage } from "./amis.page";
import { ProfilListItemComponent } from "src/app/components/profil-list-item/profil-list-item.component";
import { DisplayPageModule } from "src/app/display/display.module";
import { ShareModule } from "src/app/share.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmisPageRoutingModule,
    DisplayPageModule,
    ShareModule
  ],
  declarations: [AmisPage]
})
export class AmisPageModule {}
