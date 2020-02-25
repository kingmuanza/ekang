import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { Profil } from 'src/app/models/profil.model';

@Component({
  selector: 'app-amis',
  templateUrl: './amis.page.html',
  styleUrls: ['./amis.page.scss'],
})
export class AmisPage implements OnInit {

  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  photoURL: string;
  displayName: string;
  profils = new Array<Profil>();
  profilsResultats = new Array<Profil>();

  saisie = '';

  constructor(private userService: UserService, private router: Router, public auth: AuthentificationService) { }

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        console.log(this.utilisateur);
        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        } else {

          if (utilisateur.photoURL) {
            this.photoURL = utilisateur.photoURL;
          }
          if (utilisateur.displayName) {
            this.displayName = utilisateur.displayName;
          }
        }
      }
    );
    this.auth.emettre();
    this.userService.getProfils().then((profils) => {
      this.profils = profils;
      this.profilsResultats = profils;
    });
  }

  rechercher(ev) {
    console.log(this.saisie);
    this.profilsResultats = this.profils
    this.profilsResultats = this.profilsResultats.filter((element) => {
      return element.utilisateur.displayName.toLocaleLowerCase().indexOf(this.saisie.toLowerCase()) !== -1;
    })

  }

}
