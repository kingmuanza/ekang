import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PublicationService } from "src/app/services/publication.service";
import { Publication } from "src/app/models/publication.model";
import { Subscription } from "rxjs";
//import { AuthentificationService } from "src/app/services/authentification.service";

import { Profil } from "src/app/models/profil.model";
import { NotificationService } from "src/app/services/notification.service";
import { UserService } from "src/app/services/user.service";
import * as firebase from "firebase";
import { AuthentificationService } from "src/app/services/authentification.service";
@Component({
  selector: "app-programme",
  templateUrl: "./programme.page.html",
  styleUrls: ["./programme.page.scss"]
})
export class ProgrammePage implements OnInit {
  profil: Profil;
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  displayName: string;
  photoURL: string;
  photoCni: string;
  photoDemande: String;
  phoneNumber: any;
  pays: any;
  userPays: any;
  userProfession: any;
  userVille: any;
  userContinent: any;
  listProfesion: any;
  villes: any;
  continents: any;
  utilisateurEmail: any;
  file: any;
  constructor(
    private router: Router,
    public auth: AuthentificationService,
    // private pubService: PublicationService,
    private route: ActivatedRoute,
    private notifService: NotificationService,
    public userservice: UserService,
    private userServ: UserService
  ) {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;

        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        } else {
          this.userServ.getProfil(this.utilisateur).then(profil => {
            if (profil["tel"]) {
              this.phoneNumber = profil["tel"];
            }
            if (profil) {
              this.profil = profil;
              this.userPays = this.profil.pays;
              this.userProfession = this.profil.profession;
            }
          });
          if (utilisateur.displayName) {
            this.displayName = utilisateur.displayName;
          }
          if (utilisateur.photoURL) {
            this.photoURL = utilisateur.photoURL;
          }

          if (utilisateur.email) {
            this.utilisateurEmail = utilisateur.email;
          }
        }
      }
    );
    this.auth.emettre();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get("id");
      // this.takeUserProfil(id);
    });
  }

  takeUserProfil(uid) {
    this.userservice
      .getProfilByID(uid)
      .then(profil => {
        console.log(profil);
        if (profil["tel"]) {
          this.phoneNumber = profil["tel"];
        }
        if (profil) {
          this.profil = profil;
          this.userPays = this.profil.pays;
          this.userProfession = this.profil.profession;
        }
      })
      .catch(err => {});
  }
  uploadFile(event: any) {
    console.log(event.target.files);

    this.file = event.target.files.item(0);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.photoCni = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  uploadDocs(event: any) {
    this.photoDemande = event.target.files.item(0);
    if (event.target.files && event.target.files[0]) {
      //  var reader = new FileReader();
      console.log(this.photoDemande);
    }
  }
  suivant() {}
}
