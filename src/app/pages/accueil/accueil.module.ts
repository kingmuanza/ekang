import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AccueilPageRoutingModule } from "./accueil-routing.module";

import { AccueilPage } from "./accueil.page";
import { DisplayPageModule } from "src/app/display/display.module";
import { PublicationItemComponent } from "src/app/components/publication-item/publication-item.component";
import { ShareModule } from "src/app/share.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // DisplayPageModule,
    AccueilPageRoutingModule,
    DisplayPageModule,
    ShareModule
    // PublicationItemComponent
  ],
  declarations: [AccueilPage]
})
export class AccueilPageModule {}
