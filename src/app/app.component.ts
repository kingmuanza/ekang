import { Component, OnInit, HostListener } from "@angular/core";

import {
  Platform,
  MenuController,
  ActionSheetController
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import * as firebase from "firebase";
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { AuthentificationService } from "./services/authentification.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { ScreensizeService } from "./services/screensize.service";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public actionSheetController: ActionSheetController;
  public appPages = [
    /* {
      title: "Accueil",
      url: "accueil",
      icon: "home"
    },*/
    {
      title: "Notifications",
      url: "tabs/notifications",
      icon: "notifications"
    },
    {
      title: "Mes publications",
      url: "publications",
      icon: "paper-plane"
    },
    {
      title: "Mes amis",
      url: "tabs/amis",
      icon: "people"
    },
    {
      title: "Mes favoris",
      url: "/folder/Favorites",
      icon: "heart"
    },
    {
      title: "Messages",
      url: "messages",
      icon: "chatbox-ellipses"
    },
    {
      title: "Rechercher",
      // url: '/folder/Archived',
      url: "recherche",
      icon: "search"
    },
    {
      title: "Admin",
      url: "dashboard",
      icon: "today"
    }
  ];
  public labels = ["Déconnexion"];
  verificateur = true;
  utilisateur: firebase.User;
  utilisateurSubscription = new Subscription();
  constructor(
    public auth: AuthentificationService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private router: Router,
    private screensizeService: ScreensizeService
  ) {
    this.initializeApp();
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        if (utilisateur) {
          const variable = utilisateur.photoURL;
          const variable2 = utilisateur.email;
        }
      }
    );
  }

  initializeApp() {
    firebase.initializeApp(FIREBASE_CONFIG);
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screensizeService.onResize(this.platform.width());
      this.screensizeService.checkConnexionPage().subscribe(data => {
        console.log(data);
        if (data === "connexionPage") {
          // this.verificateur = true;
        }
      });
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        page => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }

  profil() {
    this.router.navigate(["profil"]);
    this.menu.close();
  }

  defaultName(utilisateur: firebase.User) {
    return utilisateur.email.split("@")[0];
  }
  seDeconnecter() {
    this.auth.deconnexion().then(data => {
      console.log(data);

      this.router.navigate(["connexion"]);
    });
  }

  ouvrir() {
    this.router.navigate(["monprofil", this.utilisateur.uid]);
    // console.log(this.profil);
  }
  @HostListener("window:resize", ["$event"])
  public onResize(event) {
    // console.log(event.target.innerWidth);

    this.screensizeService.onResize(event.target.innerWidth);
  }
}
