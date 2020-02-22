import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-accueil",
  templateUrl: "./accueil.page.html",
  styleUrls: ["./accueil.page.scss"]
})
export class AccueilPage implements OnInit {
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;

  constructor(private router: Router, public auth: AuthentificationService) {}

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        console.log(this.utilisateur);
        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        }
      }
    );
    this.auth.emettre();
  }

  profil() {
    this.router.navigate(["profil"]);
  }
}
