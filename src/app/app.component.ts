import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import * as firebase from "firebase";
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { AuthentificationService } from "./services/authentification.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: "Accueil",
      url: "accueil",
      icon: "home"
    },
    {
      title: "Notifications",
      url: "notifications",
      icon: "notifications"
    },
    {
      title: "Mes publications",
      url: "publications",
      icon: "paper-plane"
    },
    {
      title: "Mes amis",
      url: "amis",
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
      title: "Mon profil",
      url: "profil",
      icon: "person"
    }
  ];
  public labels = ["Déconnexion"];

  utilisateur: firebase.User;
  utilisateurSubscription = new Subscription();
  constructor(
    public auth: AuthentificationService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
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

  defaultName(utilisateur: firebase.User) {
    return utilisateur.email.split("@")[0];
  }
}
