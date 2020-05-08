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
import * as firebase from "firebase";
import { SmsService } from "src/app/services/sms.service";

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
  phoneNumber: any;
  pays: any;
  userPays: any;
  userProfession: any;
  // userVille: any;
  userContinent: any;
  listProfesion: any;
  profil: Profil;
  villes: any;
  continents: any;
  utilisateurEmail: any;
  id: any;
  paysAfrique = [];
  paysEurope = [];
  paysAmerique = [];
  paysAsie = [];
  afrique: any;
  europe: any;
  amerique: any;
  asie: any;
  automaticClose = false;
  continent: any[];
  closeIndex: any;
  closeChildIndex: any;
  checkPays: boolean = false;
  userVille: string = "Localisation géographique";
  temporaire: any;
  constructor(
    public toastController: ToastController,
    private router: Router,
    public auth: AuthentificationService,
    public notifService: NotificationService,
    private http: HttpClient,
    private userService: UserService,
    private villeService: VilleService,
    private smsService: SmsService
  ) {
    console.log("onInit");
    this.continent = [
      { name: "Afrique", children: [] },
      { name: "Asie", children: [] },
      { name: "Amerique", children: [] },
      { name: "Europe", children: [] },
      { name: "Oceanie", children: [] }
    ];
    this.continent[0].open = false;
    this.getCountry();
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        console.log(utilisateur.uid);
        this.id = utilisateur.uid;

        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        } else {
          this.userService.getProfil(this.utilisateur).then(profil => {
            console.log("le prof", profil);
            console.log(profil["tel"]);
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
          if (this.profil.tel) {
            // this.phoneNumber = this.profil.tel;
          }
          if (utilisateur.email) {
            this.utilisateurEmail = utilisateur.email;
          }
        }
      }
    );

    this.listProfession();
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
    if (this.phoneNumber) {
      // let num= parseInt(this.phoneNumber)
      /*  this.utilisateur.updatePhoneNumber(this.phoneNumber).then(() => {
        console.log("phone update");
      }); */
      // this.verification(this.phoneNumber);
    }
    return new Promise((resolve, reject) => {
      this.utilisateur
        .updateProfile({
          displayName: this.displayName,
          photoURL: this.photoURL
        })
        .then(resultat => {
          console.log("resultat nouveau profil");
          //console.log(resultat);
          // console.log(this.utilisateur);
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
    this.enregistrer().then(utilisateur => {
      // console.log(utilisateur);
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
      if (this.phoneNumber) {
        profil.tel = this.phoneNumber;
      }
      profil.utilisateur = utilisateur;
      this.userService.createUser(this.utilisateur).then(data => {
        this.userService.updateProfil(profil).then(() => {
          this.createNotification(profil, "UPDATE_PROFIL");
          this.envoyerSms(this.phoneNumber, this.displayName);
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
    /*  this.http
      .get("https://restcountries.eu/rest/v2/region/africa")
      .subscribe(data => {
        console.log(data);
        this.pays = data;
      }); */

    this.villeService.getPays().then(data => {
      console.log(data);

      data.forEach(elt => {
        if (elt["continent"] == "Afrique") {
          this.afrique = elt["pays"];
          this.afrique.forEach(elt => {
            this.paysAfrique.push({ name: elt });
          });

          const indice = this.continent.findIndex(
            elt => elt.name === "Afrique"
          );
          this.continent[indice]["children"] = this.paysAfrique;
        }
        if (elt["continent"] == "Europe") {
          this.europe = elt["pays"];
          this.europe.forEach(elt => {
            this.paysEurope.push({ name: elt });
          });
          const indice = this.continent.findIndex(elt => elt.name === "Europe");
          this.continent[indice]["children"] = this.paysEurope;
        }
        if (elt["continent"] == "Amerique") {
          this.amerique = elt["pays"];
          this.amerique.forEach(elt => {
            this.paysAmerique.push({ name: elt });
          });
          const indice = this.continent.findIndex(
            elt => elt.name === "Amerique"
          );
          this.continent[indice]["children"] = this.paysAmerique;
        }
        if (elt["continent"] == "Oceanie") {
          this.asie = elt["pays"];
          this.asie.forEach(elt => {
            this.paysAsie.push({ name: elt });
          });

          const indice = this.continent.findIndex(
            elt => elt.name === "Oceanie"
          );
          this.continent[indice]["children"] = this.paysAsie;
        }
      });

      this.takeVille();
    });
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
      data.forEach(v => {
        v["expanded"] = false;
      });
      this.villes = data;
      this.paysAfrique.forEach(p => {
        if (p.name === "Cameroon") {
          p["ville"] = this.villes;
        } else {
          p["ville"] = [
            { nom: "ville1" },
            { nom: "ville2" },
            { nom: "ville3" },
            { nom: "ville4" }
          ];
        }
      });

      this.paysEurope.forEach(p => {
        if (p.name === "Cameroon") {
          p["ville"] = this.villes;
        } else {
          p["ville"] = [
            { nom: "ville1" },
            { nom: "ville2" },
            { nom: "ville3" },
            { nom: "ville4" }
          ];
        }
      });

      this.paysAmerique.forEach(p => {
        if (p.name === "Cameroon") {
          p["ville"] = this.villes;
        } else {
          p["ville"] = [
            { nom: "ville1" },
            { nom: "ville2" },
            { nom: "ville3" },
            { nom: "ville4" }
          ];
        }
      });
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
  verification(phoneNumber) {
    var applicationVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    var provider = new firebase.auth.PhoneAuthProvider();
    provider
      .verifyPhoneNumber(phoneNumber, applicationVerifier)
      .then(function(verificationId) {
        var verificationCode = window.prompt(
          "Please enter the verification " +
            "code that was sent to your mobile device."
        );
        return firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        );
      })
      .then(phoneCredential => {
        this.utilisateur.updatePhoneNumber(phoneCredential).then(data => {
          console.log(data);
        });
      });
  }
  envoyerSms(telephone, userName) {
    console.log("jenvoi sms");
    let Numbero = parseInt(`${telephone}`);
    this.smsService.sendSms(Numbero, userName).subscribe(data => {
      console.log(data);
    });
  }

  toggleSection(index) {
    this.closeIndex = index;
    this.continent[index].open = !this.continent[index].open;

    if (this.automaticClose && this.continent[index].open) {
      this.continent
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => (item.open = false));
    }
  }

  toggleItem(index, childIndex, pays) {
    console.log("pays", pays);
    this.closeIndex = index;
    this.closeChildIndex = childIndex;
    if (this.temporaire && this.temporaire === pays.name) {
      console.log("rien");
    } else {
      this.villeService.getVillePays({ pays: pays.name }).then(data => {
        console.log(data);
        // this.listVilles = data;
        this.temporaire = pays.name
        pays["ville"] = data;
      });
    }
    this.continent[index].children[childIndex].open = !this.continent[index]
      .children[childIndex].open;
  }

  displayVille($event, item) {
    console.log(item);

    console.log($event);

    this.userPays = $event["pays"];
    this.userVille = $event["ville"];
    this.userContinent = item["name"];
    this.continent[this.closeIndex].children[this.closeChildIndex].open = !this
      .continent[this.closeIndex].children[this.closeChildIndex].open;

    this.continent[this.closeIndex].open = !this.continent[this.closeIndex]
      .open;

    this.checkPays = false;
  }
}
