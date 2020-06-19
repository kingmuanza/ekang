import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";

/*const routes: Routes = [
  {
    path: '',
    component: TabsPage
  }
]; */

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "accueil",
        loadChildren: () =>
          import("../accueil/accueil.module").then(m => m.AccueilPageModule)
      },
      {
        path: "connexion",
        loadChildren: () =>
          import("../connexion/connexion.module").then(
            m => m.ConnexionPageModule
          )
      },
      {
        path: "messages",
        loadChildren: () =>
          import("../messages/messages.module").then(m => m.MessagesPageModule)
      },
      {
        path: "amis",
        loadChildren: () =>
          import("../amis/amis.module").then(m => m.AmisPageModule)
      },
      {
        path: "notifications",
        loadChildren: () =>
          import("../notifications/notifications.module").then(
            m => m.NotificationsPageModule
          )
      },
      {
        path: "recherche",
        loadChildren: () =>
          import("../recherche/recherche.module").then(
            m => m.RecherchePageModule
          )
      },
      {
        path: "amis",
        loadChildren: () =>
          import("../amis/amis.module").then(m => m.AmisPageModule)
      },
      {
        path: "programme/:id",
        loadChildren: () =>
          import("../programme/programme.module").then(
            m => m.ProgrammePageModule
          )
      },
      {
        path: "",
        loadChildren: () =>
          import("../connexion/connexion.module").then(
            m => m.ConnexionPageModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
