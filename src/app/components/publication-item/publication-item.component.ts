import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Publication } from "src/app/models/publication.model";
import { PublicationService } from "src/app/services/publication.service";
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { Commentaire } from 'src/app/models/commentaire.model';
import { Profil } from 'src/app/models/profil.model';
import { NotificationEkang } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: "app-publication-item",
  templateUrl: "./publication-item.component.html",
  styleUrls: ["./publication-item.component.scss"]
})
export class PublicationItemComponent implements OnInit, OnChanges {
  @Input() publication: Publication;
  @Input() utilisateur: firebase.User;
  jaiLike = false;
  commentaire: Commentaire;

  constructor(private router: Router,
    private pubService: PublicationService,
    private notifService: NotificationService) { }

  ngOnInit() {
    if (this.publication && this.utilisateur) {
      this.aiJeLike();
      if (this.publication && this.publication.dernierCommentaire) {
        this.commentaire = this.publication.dernierCommentaire
      }
    }
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    //  console.log("this.publication");
    console.log(this.publication);
    // console.log("this.utilisateur");
    // console.log(this.utilisateur);
    if (this.publication && this.utilisateur) {
      this.aiJeLike();
    }
    if (this.publication && this.publication.dernierCommentaire) {
      this.commentaire = this.publication.dernierCommentaire
    }
  }

  voirAmi() {
    this.router.navigate(['amis', 'amis-view', this.publication.utilisateur.uid]);
  }

  // Permet d'extraire un lien d'une URL
  urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
      return '<a target="_blank" href="' + url + '">' + url + '</a>';
    });
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
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

  onClick() { }


  // Prévenir l'utilisateur qu'on l'a mentionné
  createNotificationLike() {
    const profilFlou = new Profil(this.utilisateur);
    const notification = new NotificationEkang(profilFlou, 'LIKE');
    notification.publication = this.publication;
    this.notifService.createNotification(notification).then((t) => {

    });
  }
}
