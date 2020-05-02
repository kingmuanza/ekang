import { Component, OnInit, ViewChild } from "@angular/core";
import { IonTabs } from "@ionic/angular";
import { NotificationService } from "src/app/services/notification.service";
import { NotificationEkang } from "src/app/models/notification.model";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { Router } from "@angular/router";
import { ScreensizeService } from "src/app/services/screensize.service";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.page.html",
  styleUrls: ["./tabs.page.scss"]
})
export class TabsPage implements OnInit {
  //  @ViewChild("tabs", { read: IonTabs, static: false }) tabsRef: IonTabs;
  @ViewChild("tabs", { read: IonTabs, static: false }) private tabsRef: IonTabs;
  notifications = new Array<NotificationEkang>();
  utilisateur: firebase.User;
  profil: Profil;
  utilisateurSubscription: Subscription;
  nbrNotification = 0;
  isDesktop: boolean;
  msg = 0;
  constructor(
    private router: Router,
    private notifService: NotificationService,
    private userService: UserService,
    public auth: AuthentificationService,
    private screensizeService: ScreensizeService
  ) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        window.location.reload();
      }

      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        this.utilisateur = utilisateur;
        if (utilisateur) {
          this.userService.getProfil(this.utilisateur).then(profil => {
            this.profil = profil;
            if (this.profil.messagesNonlus) {
              this.msg = this.profil.messagesNonlus.length;
            }

            this.getNotifications();
          });
        }
      }
    );
    this.auth.emettre();
    setTimeout(() => {
      console.log(this.tabsRef);
    }, 2000);
  }

  ionViewDidEnter() {
    console.log(this.tabsRef);
    this.tabsRef.select("accueil");
  }

  choistab() {
    /*if (this.tabsRef.getSelected() == "notifications") {
      this.nbrNotification = 0;
    } */
    // this.nbrNotification = 0;
  }

  getNotifications() {
    let tabVide = [];
    this.notifService.getMyNotifications(this.profil).then(notifications => {
      // console.log(notifications.length);

      this.notifications = notifications.filter(notification => {
        return notification.profil.utilisateur;
      });
      // let notifVu = this.notifications;

      this.notifications.forEach(notification => {
        if (notification.vuPar && notification.vuPar.length) {
          if (notification.vuPar.includes(this.utilisateur.uid)) {
            // console.log("deja vu");
          }
          if (notification.vuPar.includes(this.utilisateur.uid)) {
            tabVide.push(notification);
          }
        }
      });
      // this.notifications = tabVide;

      this.nbrNotification = this.notifications.length - tabVide.length;
    });
  }
  messageNonlus() {
    this.profil.messagesNonlus = [];
    this.userService.updateProfil(this.profil).then(data => {
      console.log(data);
      this.msg = 0;
    });
  }
}
