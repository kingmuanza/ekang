import { Component, OnInit } from "@angular/core";
import { NotificationService } from "src/app/services/notification.service";
import { NotificationEkang } from "src/app/models/notification.model";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.page.html",
  styleUrls: ["./notifications.page.scss"]
})
export class NotificationsPage implements OnInit {
  notifications = new Array<NotificationEkang>();
  utilisateur: firebase.User;
  profil: Profil;
  utilisateurSubscription: Subscription;
  constructor(
    private router: Router,
    private notifService: NotificationService,
    private userService: UserService,
    public auth: AuthentificationService
  ) {}

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        if (utilisateur) {
          this.userService.getProfil(this.utilisateur).then(profil => {
            this.profil = profil;
            this.getNotifications();
          });
        } else {
          this.router.navigate(["connexion"]);
        }
      }
    );
    this.auth.emettre();
  }

  voirProfil(notification: NotificationEkang) {
    this.router.navigate([
      "amis",
      "amis-view",
      notification.profil.utilisateur.uid
    ]);
  }
  voirPublication(notification: NotificationEkang) {
    if (notification.vuPar && notification.vuPar.length) {
      notification.vuPar.push(this.utilisateur.uid);
    } else {
      notification.vuPar = [];
      notification.vuPar.push(this.utilisateur.uid);
    }

    this.notifService.createNotification(notification).then(data => {
      // console.log("update!!!ok");
    });
    if (notification.publication) {
      this.router.navigate([
        "publications",
        "publications-view",
        notification.publication.id
      ]);
    } else {
    }
  }

  async getProfilUpdate(notification: NotificationEkang): Promise<Profil> {
    const profil = await this.userService.getProfilByID(
      notification.profil.utilisateur.uid
    );
    return profil;
  }

  getNotifications() {
    this.notifService.getMyNotifications(this.profil).then(notifications => {
      this.notifications = notifications.filter(notification => {
        return notification.profil.utilisateur;
      });

      this.notifications = notifications.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime() > 0
          ? -1
          : 1;
      });
      this.updateNotification();
    });
  }

  async updateNotification() {
    for (let i = 0; i < this.notifications.length; i++) {
      const notification = this.notifications[i];
      notification.profil = await this.getProfilUpdate(notification);
    }
  }

  marqueCommeVu() {}

  couperTexte(texte: string) {
    if (texte.length > 50) {
      return texte.substring(0, 48) + "...";
    }
    return texte;
  }

  // Vérifier que la notification me concerne
  notificationIsForMe() {}
}
