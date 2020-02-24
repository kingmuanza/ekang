import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { ToastController } from "@ionic/angular";
import * as firebase from "firebase";
@Component({
  selector: "app-photo",
  templateUrl: "./photo.page.html",
  styleUrls: ["./photo.page.scss"]
})
export class PhotoPage implements OnInit {
  @ViewChild("fileButton", { static: false }) fileButton;
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  //photoURL: string;
  photoURL = "../../../../assets/img/user.png";
  file: any;
  constructor(
    public toastController: ToastController,
    private router: Router,
    public auth: AuthentificationService
  ) {}

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        if (!utilisateur) {
          this.router.navigate(["connexion"]);
        } else {
          if (utilisateur.photoURL) {
            this.photoURL = utilisateur.photoURL;
          }
        }
      }
    );
    this.auth.emettre();
  }

  galerie() {
    // firebase.firestore().
    this.fileButton.nativeElement.click();
  }
  uploadFile(event: any) {
    console.log(event.target.files);

    this.file = event.target.files.item(0);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.photoURL = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  save() {
    var storageRef = firebase
      .storage()

      .ref(this.utilisateur.email + "/profilePicture/" + this.file.name);

    var task = storageRef.put(this.file);
    task.then(data => {
      console.log("ok", data);
      const imageUrl = storageRef.getDownloadURL().then(url => {
        this.utilisateur
          .updateProfile({
            photoURL: url
          })
          .then(() => {
            this.auth.updateUser(this.utilisateur);
            this.notifier("Votre profil a été mis à jour");
            this.router.navigate(["profil"]);
          })
          .catch(err => {
            console.log("erreur");
            console.log(err);
          });
      });
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
}
