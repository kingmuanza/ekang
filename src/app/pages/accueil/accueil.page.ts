import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as firebase from "firebase";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Router } from "@angular/router";
import { Profil } from "src/app/models/profil.model";
import { PublicationService } from "src/app/services/publication.service";
import { Publication } from "src/app/models/publication.model";
import { NotificationEkang } from "src/app/models/notification.model";
import { NotificationService } from "src/app/services/notification.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-accueil",
  templateUrl: "./accueil.page.html",
  styleUrls: ["./accueil.page.scss"]
})
export class AccueilPage implements OnInit {
  @ViewChild("one", { static: true }) allslide: ElementRef;
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  photoURL: string;
  displayName: string;
  userProgram: boolean;
  pubs: boolean = false;
  profil: Profil;
  publications = new Array<Publication>();
  notifications = new Array<NotificationEkang>();
  all = new Array<Publication | NotificationEkang>();
  phoneNumber: any;
  jeScrool: boolean;
  sliderConfig = {
    //slidesPerView: 1.6,
    //spaceBetween: 10,
    centeredSlides: true
  };
  constructor(
    private router: Router,
    private pubService: PublicationService,
    private notifService: NotificationService,
    public auth: AuthentificationService,
    public userservice: UserService
  ) {}

  ngOnInit() {
    this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
      utilisateur => {
        // console.log(utilisateur);

        this.utilisateur = utilisateur;
        if (!utilisateur) {
          this.router.navigate(["connexion"]);
          console.log("utilisateur");
          //* this.router.navigate(["tabs"]);
        } else {
          this.utlisateurLastConnexion(utilisateur);
          this.takeUserProfil(utilisateur.uid);
          if (utilisateur.photoURL) {
            this.photoURL = utilisateur.photoURL;
          }
          if (utilisateur.displayName) {
            this.displayName = utilisateur.displayName;
          }
        }
        this.getPublications();
      }
    );
    this.auth.emettre();
  }

  onScroll(event) {
    // used a couple of "guards" to prevent unnecessary assignments if scrolling in a direction and the var is set already:
    if (event.detail.deltaY > 0 && this.jeScrool) return;
    if (event.detail.deltaY < 0 && !this.jeScrool) return;
    if (event.detail.deltaY > 0) {
      // console.log("scrolling down, hiding footer...");
      this.jeScrool = true;
    } else {
      // console.log("scrolling up, revealing footer...");
      this.jeScrool = false;
    }
  }
  ngAfterViewInit() {
    // console.log(this.allslide);
    // this.allslide.nativeElement.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
  }

  voirProfil() {
    this.router.navigate(["profil"]);
  }
  nouveau() {
    this.router.navigate(["publications", "publications-edit"]);
  }
  onClick() {}

  getPublications() {
    this.pubService.getPublications().then(publications => {
      if (publications) {
        this.pubs = true;
        this.publications = publications;
        this.all = this.publications;
        // console.log('this.publications');
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
  utlisateurLastConnexion(utilisateur: firebase.User) {
    // console.log(new Date(utilisateur.metadata.lastSignInTime).getTime());
    this.userservice.getProfil(utilisateur).then(profil => {
      profil.lastConnexionDate = new Date(
        utilisateur.metadata.lastSignInTime
      ).getTime();

      this.userservice.updateProfil(profil).then(() => {
        //console.log("update!!");
      });
    });
  }

  goToProfile() {
    this.router.navigate(["profil"]);
  }

  goToProgramme() {
    this.router.navigate(["programme", this.utilisateur.uid]);
  }
  takeUserProfil(uid) {
    this.userservice
      .getProfilByID(this.utilisateur.uid)
      .then(profil => {
        // console.log("========hello===");
        // console.log(profil);

        this.phoneNumber = profil["tel"];
      })
      .catch(err => {});
  }
}
