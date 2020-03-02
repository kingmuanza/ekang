import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Router } from "@angular/router";
import { Profil } from "src/app/models/profil.model";
import { PublicationService } from "src/app/services/publication.service";
import { Publication } from "src/app/models/publication.model";
import { NotificationEkang } from "src/app/models/notification.model";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-accueil",
  templateUrl: "./accueil.page.html",
  styleUrls: ["./accueil.page.scss"]
})
export class AccueilPage implements OnInit {
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  photoURL: string;
  displayName: string;
  profil: Profil;
  publications = new Array<Publication>();
  notifications = new Array<NotificationEkang>();
  all = new Array<Publication | NotificationEkang>();
  constructor(
    private router: Router,
    private pubService: PublicationService,
    private notifService: NotificationService,
    public auth: AuthentificationService
  ) {}

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
        this.getNotifications();
      }
    );
    this.auth.emettre();
  }

  voirProfil() {
    this.router.navigate(["profil"]);
  }
  nouveau() {
    this.router.navigate(["publications", "publications-edit"]);
  }
  onClick() {}

  getNotifications() {
    this.all = new Array<Publication | NotificationEkang>();
    this.notifService.getNotifications().then(notifications => {
      this.notifications = notifications;
      console.log("notifications");
      console.log(notifications);
      this.all = this.all.concat(this.notifications);
      this.getPublications();
    });
  }
  getPublications() {
    this.pubService.getPublications().then(publications => {
      if (publications) {
        this.publications = publications;
        this.all = this.all.concat(this.publications);
        // console.log('this.publications');
        console.log(this.publications);
        this.all = this.all.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime() > 0
            ? -1
            : 1;
        });
      }
    });
  }

  like(publication: Publication) {
    this.pubService.like(this.utilisateur, publication).then(p => {
      publication = p;
    });
  }
}
