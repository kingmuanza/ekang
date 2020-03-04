import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MessagesPageRoutingModule } from "./messages-routing.module";

import { MessagesPage } from "./messages.page";
import { ProfilListItemComponent } from "src/app/components/profil-list-item/profil-list-item.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MessagesPageRoutingModule],
  declarations: [MessagesPage, ProfilListItemComponent]
})
export class MessagesPageModule {}
