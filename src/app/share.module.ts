import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { ProfilListItemComponent } from "./components/profil-list-item/profil-list-item.component";
import { PublicationItemComponent } from "./components/publication-item/publication-item.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ProfilListItemComponent, PublicationItemComponent],
  exports: [ProfilListItemComponent, PublicationItemComponent]
})
export class ShareModule {}
