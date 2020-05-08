import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProfilPageRoutingModule } from "./profil-routing.module";

import { ProfilPage } from "./profil.page";
import { ShareModule } from "src/app/share.module";
//import { AccordionComponent } from "src/app/components/accordion/accordion.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilPageRoutingModule,
    ShareModule
  ],
  declarations: [ProfilPage]
})
export class ProfilPageModule {}
