import { NgModule } from "@angular/core";
//import { PublicationItemComponent } from "../components/publication-item/publication-item.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
//import { ProfilListItemComponent } from "../components/profil-list-item/profil-list-item.component";
import { DisplayPage } from "./display.page";
import { DisplayPageRoutingModule } from "./display-routing.module";

@NgModule({
  imports: [CommonModule, IonicModule, DisplayPageRoutingModule],
  declarations: [
    // PublicationItemComponent,
    //ProfilListItemComponent,
    DisplayPage
  ]
  // exports: [PublicationItemComponent]
})
export class DisplayPageModule {}
