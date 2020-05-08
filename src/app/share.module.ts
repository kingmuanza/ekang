import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { ProfilListItemComponent } from "./components/profil-list-item/profil-list-item.component";
import { PublicationItemComponent } from "./components/publication-item/publication-item.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { AccordionComponent } from "./components/accordion/accordion.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [
    ProfilListItemComponent,
    PublicationItemComponent,
    LoadingComponent,
    AccordionComponent
  ],
  exports: [
    ProfilListItemComponent,
    PublicationItemComponent,
    LoadingComponent,
    AccordionComponent
  ]
})
export class ShareModule {}
