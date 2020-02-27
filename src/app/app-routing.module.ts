import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/connexion/connexion.module").then(
        m => m.ConnexionPageModule
      )
  },
  {
    path: "folder/:id",
    loadChildren: () =>
      import("./folder/folder.module").then(m => m.FolderPageModule)
  },
  {
    path: "connexion",
    loadChildren: () =>
      import("./pages/connexion/connexion.module").then(
        m => m.ConnexionPageModule
      )
  },
  {
    path: "inscription",
    loadChildren: () =>
      import("./pages/inscription/inscription.module").then(
        m => m.InscriptionPageModule
      )
  },
  {
    path: "accueil",
    loadChildren: () =>
      import("./pages/accueil/accueil.module").then(m => m.AccueilPageModule)
  },
  {
    path: "profil",
    loadChildren: () =>
      import("./pages/profil/profil.module").then(m => m.ProfilPageModule)
  },

  {
    path: "principale",
    loadChildren: () =>
      import("./pages/principale/principale.module").then(
        m => m.PrincipalePageModule
      )
  },
  {
    path: "amis",
    loadChildren: () =>
      import("./pages/amis/amis.module").then(m => m.AmisPageModule)
  },
  {
    path: "notifications",
    loadChildren: () =>
      import("./pages/notifications/notifications.module").then(
        m => m.NotificationsPageModule
      )
  },
  {
    path: "recherche",
    loadChildren: () =>
      import("./pages/recherche/recherche.module").then(
        m => m.RecherchePageModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
