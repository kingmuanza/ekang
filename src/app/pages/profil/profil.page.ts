import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { ToastController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.page.html",
  styleUrls: ["./profil.page.scss"]
})
export class ProfilPage implements OnInit {
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  displayName: string;
  photoURL: string;
  pays: any;
  constructor(
    public toastController: ToastController,
    private router: Router,
    public auth: AuthentificationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        } else {
          if (utilisateur.displayName) {
            this.displayName = utilisateur.displayName;
          }
          if (utilisateur.photoURL) {
            this.photoURL = utilisateur.photoURL;
          }
        }
      }
    );
    this.auth.emettre();
    this.getCountry();
  }

  enregistrer() {
    this.utilisateur
      .updateProfile({
        displayName: this.displayName,
        photoURL: this.photoURL
      })
      .then(resultat => {
        console.log(resultat);
        this.notifier("Votre profil a été mis à jour");
      })
      .catch(err => {
        console.log("erreur");
        console.log(err);
      });
  }

  async notifier(texte: string) {
    const toast = await this.toastController.create({
      message: texte,
      duration: 5000,
      animated: true,
      position: "top"
    });
    toast.present();
  }

  photo() {
    this.router.navigate(["profil", "photo"]);
  }

  getCountry() {
    this.http
      .get("https://restcountries.eu/rest/v2/region/africa")
      .subscribe(data => {
        console.log(data);
        this.pays = data;
      });
  }
}
