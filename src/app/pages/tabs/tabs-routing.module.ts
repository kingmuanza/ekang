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
        path: "messages",
        loadChildren: () =>
          import("../messages/messages.module").then(m => m.MessagesPageModule)
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
        path: "",
        loadChildren: () =>
          import("../accueil/accueil.module").then(m => m.AccueilPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
