import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthentificationService } from "src/app/services/authentification.service";
import { ToastController } from "@ionic/angular";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-connexion",
  templateUrl: "./connexion.page.html",
  styleUrls: ["./connexion.page.scss"]
})
export class ConnexionPage implements OnInit {
  connexionForm: FormGroup; // Formulaire de connexion
  inactif = false; // Empeche l'utilisateur de cliquer deux fois sur le bouton SUBMIT
  mauvaisCredentials = false;
  connexionReussie = false;

  constructor(
    public auth: AuthentificationService,
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private router: Router,
    public userservice: UserService
  ) {}

  ngOnInit() {
    this.initConnexionForm();
  }

  initConnexionForm(): void {
    this.connexionForm = this.formBuilder.group({
      login: ["", [Validators.required, Validators.email]],
      passe: ["", [Validators.required]]
    });
  }

  onConnexionFormSubmit(): void {
    this.inactif = true; // bouton inactif
    console.log("onConnexionFormSubmit");
    const value = this.connexionForm.value;
    const login = value.login;
    const passe = value.passe;
    this.auth
      .connexion(login, passe)
      .then(utilisateur => {
        // console.log(utilisateur);

        this.inactif = false; // bouton actif
        this.mauvaisCredentials = false;
        this.connexionReussie = true;
        if (utilisateur) {
          this.chercherUtilisateur(utilisateur);
        } else {
          console.log("Login ou mot de passe incorrect");
        }
      })
      .catch(e => {
        this.inactif = false;
        console.log("Login ou mot de passe incorrect");
        this.mauvaisCredentials = true;
        this.notifier("Login ou mot de passe incorrect");
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

  chercherUtilisateur(utilisateur: firebase.User) {
    this.userservice
      .getProfil(utilisateur)
      .then(profil => {
        if (profil) {
          // this.router.navigate(["accueil"]);
          this.router.navigate(["tabs"]);
        } else {
          this.router.navigate(["profil"]);
        }
      })
      .catch(e => {
        this.notifier("Problème de connexion");
      });
  }

  inscription(): void {
    this.router.navigate(["inscription"]);
  }
}
