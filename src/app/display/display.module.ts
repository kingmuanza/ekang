import { NgModule } from "@angular/core";
import { PublicationItemComponent } from "../components/publication-item/publication-item.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { DisplayPage } from "./display.page";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [PublicationItemComponent, DisplayPage],
  exports: [PublicationItemComponent]
})
export class DisplayPageModule {}
