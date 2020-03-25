import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { ToastController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { NotificationEkang } from "src/app/models/notification.model";
import { NotificationService } from "src/app/services/notification.service";
import { VilleService } from "src/app/services/ville.service";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.page.html",
  styleUrls: ["./profil.page.scss"]
})
export class ProfilPage implements OnInit, AfterViewInit {
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  displayName: string;
  photoURL: string;
  pays: any;
  userPays: any;
  userProfession: any;
  userVille: any;
  userContinent: any;
  listProfesion: any;
  profil: Profil;
  villes: any;
  continents: any;

  constructor(
    public toastController: ToastController,
    private router: Router,
    public auth: AuthentificationService,
    public notifService: NotificationService,
    private http: HttpClient,
    private userService: UserService,
    private villeService: VilleService
  ) {
    console.log("onInit");
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        } else {
          this.userService.getProfil(this.utilisateur).then(profil => {
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
        }
      }
    );
    this.getCountry();
    this.listProfession();
    this.takeVille();
    this.takeContinent();
    this.auth.emettre();
  }

  ngOnInit() {
    this.auth.emettre();
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    // this.auth.emettre();
  }

  // Création d'une notification
  createNotification(profil: Profil, type: string) {
    const notification = new NotificationEkang(profil, type);
    this.notifService.createNotification(notification).then(() => {
      console.log("La notification a été crée");
    });
  }

  // Mettre à jour le profil dans l'authentification firebaseUsrer
  enregistrer(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      this.utilisateur
        .updateProfile({
          displayName: this.displayName,
          photoURL: this.photoURL
        })
        .then((resultat) => {
          console.log('resultat nouveau profil');
          console.log(resultat);
          console.log(this.utilisateur);
          this.notifier("Votre profil a été mis à jour");
          resolve(this.utilisateur);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  // Mettre à jour le profil dans FIRESTORE
  suivant() {

    this.enregistrer().then((utilisateur) => {
      console.log(utilisateur);
      let profil = new Profil(utilisateur);
      if (this.profil) {
        profil = this.profil;
      }
      profil.pays = this.userPays;
      profil.profession = this.userProfession;
      if (this.userVille) {
        profil.ville = this.userVille;
      }
      if (this.userContinent) {
        profil.continent = this.userContinent;
      }
      profil.utilisateur = utilisateur;
      this.userService.createUser(this.utilisateur).then(data => {
        this.userService.updateProfil(profil).then(() => {
          this.createNotification(profil, "UPDATE_PROFIL");
          if (this.utilisateur.photoURL) {
            this.router.navigate(["accueil"]);
          } else {
            this.photo();
          }
        });
      });
    });
  }

  // Présenter un message à l'écran
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
  chooseContinent(ev: Event) {
    this.userContinent = ev.target["value"];
  }

  chooseCountry(ev: Event) {
    this.userPays = ev.target["value"];
  }

  chooseProfession(ev: Event) {
    this.userProfession = ev.target["value"];
  }

  chooseVille(ev: Event) {
    this.userVille = ev.target["value"];
  }

  listProfession() {
    this.userService.read_ProfessionList().then(data => {
      this.listProfesion = data;
      console.log(data);
    });
  }

  takeVille() {
    this.villeService.getVilles().then(data => {
      this.villes = data;
    });
  }
  takeContinent() {
    this.villeService.getContinent().then(data => {
      // console.log(data);
      this.continents = data;
    });
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.name === o2.name : o1 === o2;
  };
}
