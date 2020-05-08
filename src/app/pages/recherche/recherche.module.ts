import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RecherchePageRoutingModule } from "./recherche-routing.module";

import { RecherchePage } from "./recherche.page";
//import { AccordionComponent } from "src/app/components/accordion/accordion.component";
import { AccordionpaysComponent } from "src/app/components/accordionpays/accordionpays.component";
import { ShareModule } from "src/app/share.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecherchePageRoutingModule,
    ShareModule
  ],
  declarations: [RecherchePage, AccordionpaysComponent]
})
export class RecherchePageModule {}
