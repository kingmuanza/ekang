import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ElementRef,
  ViewChild
} from "@angular/core";
import { Publication } from "src/app/models/publication.model";
import { PublicationService } from "src/app/services/publication.service";
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { Commentaire } from "src/app/models/commentaire.model";
import { Profil } from "src/app/models/profil.model";
import { NotificationEkang } from "src/app/models/notification.model";
import { NotificationService } from "src/app/services/notification.service";
import { element } from "protractor";
import { UserService } from "src/app/services/user.service";
import { ModalController, ActionSheetController } from "@ionic/angular";
import { LikeursPage } from "src/app/pages/likeurs/likeurs.page";

@Component({
  selector: "app-publication-item",
  templateUrl: "./publication-item.component.html",
  styleUrls: ["./publication-item.component.scss"]
})
export class PublicationItemComponent implements OnInit, OnChanges {
  @Input() public publication: Publication;
  @Input() public utilisateur: firebase.User;
  @Input() public montrerLeDernierCommentaire?: boolean;
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  jaiLike = false;
  commentaire: Commentaire;
  auteur: boolean;
  isShown: boolean = true;
  constructor(
    private router: Router,
    private pubService: PublicationService,
    private userService: UserService,
    private notifService: NotificationService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    if (this.publication && this.utilisateur) {
      if (
        this.publication.profil &&
        this.publication.profil.utilisateur &&
        this.publication.profil.utilisateur.uid == this.utilisateur.uid
      ) {
        this.auteur = true;
      } else {
        this.auteur = false;
      }
      this.aiJeLike();
      if (this.publication && this.publication.dernierCommentaire) {
        this.userService
          .getProfilByID(this.publication["utilisateur"]["uid"])
          .then(profil => {
            // console.log('Mise à jour du profil');
            this.publication.profil = profil;
            this.publication.utilisateur = profil.utilisateur;
          });

        this.commentaire = this.publication.dernierCommentaire;
        this.userService
          .getProfilByID(this.commentaire.utilisateur.uid)
          .then(profil => {
            // console.log('Mise à jour du profil');
            this.commentaire.utilisateur = profil.utilisateur;
          });
      }
    }
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.publication && this.utilisateur) {
      this.aiJeLike();
      if (this.publication.profil && this.publication.profil.utilisateur) {
        this.userService
          .getProfilByID(this.publication.profil.utilisateur.uid)
          .then(profil => {
            // console.log('Mise à jour du profil');
            this.publication.profil = profil;
            this.publication.utilisateur = profil.utilisateur;
          });
      }
    }
    if (this.publication && this.publication.dernierCommentaire) {
      this.commentaire = this.publication.dernierCommentaire;
    }
    //   console.log('this.montrerLeDernierCommentaire');
    // console.log(this.montrerLeDernierCommentaire);
  }

  getLibelleDate(d: Date) {
    const date = new Date(d);
    const aujourdhui = new Date();
    const milli = aujourdhui.getTime() - date.getTime();
    const seconds = milli / 1000;
    const minutes = seconds / 60;
    const heures = minutes / 60;
    const jours = heures / 24;

    if (jours > 1) {
      return "" + Math.floor(jours) + "j";
    } else {
      if (heures > 1) {
        return "il y a " + Math.floor(heures) + "h";
      } else {
        if (minutes > 1) {
          return "il y a " + Math.floor(minutes) + " min";
        } else {
          return 'A l\'instant';
        }
      }
    }
  }

  voirAmi() {
    this.router.navigate([
      "amis",
      "amis-view",
      this.publication.utilisateur.uid
    ]);
  }

  // Permet d'extraire un lien d'une URL
  urlify(text): string {
    const retour = this.getHashTag(text);
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return retour.replace(urlRegex, url => {
      return '<a target="_blank" href="' + url + '">' + url + "</a>";
    });
  }

  checkImage(urlImage) {
    // console.log("voici", urlImage);

    return urlImage;
  }

  getNameFromEmailInIdentification(email: string) {
    let profil: Profil;
    if (this.publication) {
      if (this.publication.identifications) {
        this.publication.identifications.forEach(element => {
          if (element.utilisateur.email === email) {
            profil = element;
          }
        });
      }
    }
    return profil;
  }

  getHashTag(text: string) {
    let textDeRetour = "";
    const mots = text.split(" ");
    mots.forEach(mot => {
      if (mot[0] && mot[0] === "#") {
        // console.log('il ya un hashtag');
        textDeRetour = textDeRetour + '<b class="vert">' + mot + "</b> ";
      } else {
        if (mot[0] && mot[0] === "@") {
          if (mot[1] && mot[1] === "@") {
            const email = mot.split("@@")[1];
            // console.log('email');
            // console.log(email);
            const profil = this.getNameFromEmailInIdentification(email);
            textDeRetour =
              textDeRetour +
              '<a href="amis/amis-view/' +
              profil.utilisateur.uid +
              '" class="vert">' +
              profil.utilisateur.displayName +
              "</a> ";
          }
        } else {
          textDeRetour = textDeRetour + mot + " ";
        }
      }
    });
    // console.log(textDeRetour);
    return textDeRetour;
  }

  async voir() {
    console.log(this.publication.likeurs);
    if (this.publication.likeurs.length) {
      const modal = await this.modalController.create({
        component: LikeursPage,
        componentProps: {
          likeurs: this.publication.likeurs
        }
      });
      return await modal.present();
    }
    /* */
  }

  aiJeLike() {
    if (this.publication.likeurs) {
      this.publication.likeurs.forEach(likeur => {
        if (likeur === this.utilisateur.uid) {
          this.jaiLike = true;
        }
      });
    }
  }

  like() {
    this.pubService.like(this.utilisateur, this.publication).then(p => {
      this.publication = p;
      this.jaiLike = true;
      this.createNotificationLike();
    });
  }

  unlike() {
    if (this.publication.likeurs) {
      this.publication.likeurs = this.publication.likeurs.filter(likeur => {
        if (likeur === this.utilisateur.uid) {
          return false;
        }
        return true;
      });
    }
    this.jaiLike = false;
    this.pubService.unlike(this.utilisateur, this.publication).then(p => {
      this.publication = p;
      this.jaiLike = false;
    });
  }

  ouvrirPublication() {
    this.router.navigate([
      "publications",
      "publications-view",
      this.publication.id
    ]);
  }

  // Prévenir l'utilisateur qu'on l'a mentionné
  createNotificationLike() {
    const profilFlou = new Profil(this.utilisateur);
    const notification = new NotificationEkang(profilFlou, "LIKE");
    notification.publication = this.publication;
    this.notifService.createNotification(notification).then(t => {});
  }
  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }

  Delete() {
    console.log(this.publication.profil.utilisateur.uid);
    console.log(this.utilisateur.uid);
    this.pubService.deletePublication(this.publication.id).then(data => {
      console.log(data);
      this.isShown = false;
    });
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "ôssu",
      buttons: [
        {
          text: "Supprimer",
          role: "destructive",
          icon: "trash",
          handler: () => {
            this.Delete();
            // console.log(this.publication);
          }
        },
        {
          text: "Modifier",
          icon: "share",
          handler: () => {
            console.log("Share clicked");
          }
        },

        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
