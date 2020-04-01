import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { ProfilListItemComponent } from "./components/profil-list-item/profil-list-item.component";
import { PublicationItemComponent } from "./components/publication-item/publication-item.component";
import { LoadingComponent } from "./components/loading/loading.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [
    ProfilListItemComponent,
    PublicationItemComponent,
    LoadingComponent
  ],
  exports: [ProfilListItemComponent, PublicationItemComponent, LoadingComponent]
})
export class ShareModule {}
