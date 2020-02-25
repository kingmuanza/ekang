import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { ToastController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
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
  userPays: any;
  userProfession: any;
  listProfesion: any;
  profil: Profil;

  constructor(
    public toastController: ToastController,
    private router: Router,
    public auth: AuthentificationService,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        } else {
          this.userService.getProfil(this.utilisateur).then(profil => {
            if (profil) {
              this.profil = profil;
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
    this.auth.emettre();
    this.getCountry();
    this.listProfession();
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
        if (this.utilisateur.photoURL) {
          this.router.navigate(["accueil"]);
        } else {
          this.photo();
        }
      })
      .catch(err => {
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

  chooseCountry(ev: Event) {
    this.userPays = ev.target["value"];
  }

  chooseProfession(ev: Event) {
    this.userProfession = ev.target["value"];
  }

  suivant() {
    console.log(this.utilisateur);
    let profil = new Profil(this.utilisateur);
    profil.pays = this.userPays;
    profil.profession = this.userProfession;
    this.userService.createUser(this.utilisateur).then(data => {
      this.userService.updateProfil(profil).then(() => {
        this.enregistrer();
      });
    });
  }

  listProfession() {
    this.userService.read_ProfessionList().subscribe(data => {
      this.listProfesion = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()["nom"]
          // Age: e.payload.doc.data()['Age'],
          // Address: e.payload.doc.data()['Address'],
        };
      });
    });
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.name === o2.name : o1 === o2;
  };
}
