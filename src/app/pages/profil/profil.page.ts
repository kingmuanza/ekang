import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { ToastController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/services/user.service";
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
    let user = {};
    user["displayName"] = this.utilisateur.displayName;
    user["photoUrl"] = this.utilisateur.photoURL;
    user["email"] = this.utilisateur.email;
    user["pays"] = this.userPays;
    user["profession"] = this.userProfession;
    this.userService.create_User(user).then(data => {});
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
}
