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
  },
  {
    path: "publications",
    loadChildren: () =>
      import("./pages/publications/publications.module").then(
        m => m.PublicationsPageModule
      )
  },
  {
    path: "messages",
    loadChildren: () =>
      import("./pages/messages/messages.module").then(m => m.MessagesPageModule)
  },
  {
    path: "monprofil/:id",
    loadChildren: () =>
      import("./pages/monprofil/monprofil.module").then(
        m => m.MonprofilPageModule
      )
  },
  {
    path: "tabs",
    loadChildren: () =>
      import("./pages/tabs/tabs.module").then(m => m.TabsPageModule)
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./pages/dashboard/dashboard.module").then(
        m => m.DashboardPageModule
      )
  },
  {
    path: "likeurs",
    loadChildren: () =>
      import("./pages/likeurs/likeurs.module").then(m => m.LikeursPageModule)
  },
  {
    path: "programme/:id",
    loadChildren: () =>
      import("./pages/programme/programme.module").then(
        m => m.ProgrammePageModule
      )
  },
  {
    path: "displayville",
    loadChildren: () =>
      import("./pages/displayville/displayville.module").then(
        m => m.DisplayvillePageModule
      )
  },
  { path: "", redirectTo: "connexion", pathMatch: "full" },  {
    path: 'modification',
    loadChildren: () => import('./pages/modification/modification.module').then( m => m.ModificationPageModule)
  },
  {
    path: 'training',
    loadChildren: () => import('./training/training.module').then( m => m.TrainingPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
