import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.page.html",
  styleUrls: ["./messages.page.scss"]
})
export class MessagesPage implements OnInit {
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  monProfil: Profil;
  profils = new Array<Profil>();
  profilsResultats = new Array<Profil>();
  amis = new Array<Profil>();
  propositions = new Array<Profil>();

  saisie = "";

  constructor(
    private userService: UserService,
    private router: Router,
    public auth: AuthentificationService
  ) {}

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        this.userService.getProfil(this.utilisateur).then(monProfil => {
          this.monProfil = monProfil;
        });
        console.log(this.utilisateur);
        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        } else {
          this.userService.getProfils().then(profils => {
            console.log(profils);

            this.profilsResultats = profils.filter(profil => {
              return profil.utilisateur.uid !== this.utilisateur.uid;
            });
            this.setAmis();
          });
        }
      }
    );
    this.auth.emettre();
  }

  setAmis() {
    // Mes amis
    this.amis = this.profilsResultats.filter(profil => {
      return this.sontIlsAmis(profil);
    });
    console.log("mes amis", this.amis);

    this.propositions = this.profilsResultats.filter(profil => {
      return !this.sontIlsAmis(profil);
    });
  }

  sontIlsAmis(profil: Profil) {
    if (this.monProfil && profil) {
      if (this.monProfil.abonnements) {
        const resultats = this.monProfil.abonnements.find(index => {
          return index === profil.utilisateur.uid;
        });
        if (resultats) {
          return true;
        }
      }
    }
    return false;
  }

  isOnline(user: Profil) {
    //return this.chatService.isUserOnline(user);
    let curentDate = new Date().getTime();
    if (user.lastConnexionDate) {
      let date = user.lastConnexionDate;
      // console.log(curentDate - date);

      if (curentDate - date <= 60000) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  voir() {
    //this.router.navigate(['amis', 'amis-view', this.publication.utilisateur.uid]);
    this.router.navigate(["messages", "chat"]);
  }
}
