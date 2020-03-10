import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PublicationService } from "src/app/services/publication.service";
import { Publication } from "src/app/models/publication.model";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Commentaire } from "src/app/models/commentaire.model";
import { NotificationEkang } from 'src/app/models/notification.model';
import { Profil } from 'src/app/models/profil.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: "app-publications-view",
  templateUrl: "./publications-view.page.html",
  styleUrls: ["./publications-view.page.scss"]
})
export class PublicationsViewPage implements OnInit {
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;
  publication: Publication;
  jaiLike = false;
  texte: string;
  commentaires = [];

  constructor(
    private router: Router,
    public auth: AuthentificationService,
    private pubService: PublicationService,
    private route: ActivatedRoute,
    private notifService: NotificationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get("id");
      if (id) {
        this.pubService.getPublication(id).then(publication => {
          this.publication = publication;

          this.pubService
            .getCommentaires(this.publication)
            .then(commentaires => {
              console.log("comment", commentaires);

              this.commentaires = commentaires;
              this.commentaires.sort((a, b)=>{
                return new Date(b.date).getTime() - new Date(a.date).getTime() > 0
                  ? -1
                  : 1;
              })
              const listeDesIndex = new Array<string>();
              this.commentaires.forEach(comment => {
                listeDesIndex.push(comment.id);
              });
              this.publication.commentaires = listeDesIndex;
              this.pubService.savePublication(this.publication).then(()=>{

              });
            });
          this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
            utilisateur => {
              this.utilisateur = utilisateur;
              console.log(this.utilisateur);
              if (!utilisateur) {
                this.router.navigate(["connexion"]);
              } else {
                this.aiJeLike();
              }
            }
          );
          this.auth.emettre();
        });
      }
    });
  }

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

  envoyer() {
    if (this.texte) {
      
      const commentaire = new Commentaire(
        this.texte,
        this.publication,
        this.utilisateur
      );

      if(!this.publication.commentaires) {
        this.publication.commentaires = new Array<string>();
      }
      this.publication.commentaires.push(commentaire.id);

      this.pubService.saveCommentaire(commentaire).then(c => {
        this.commentaires.unshift(commentaire);
        commentaire.publication = null;
        this.publication.dernierCommentaire = commentaire;
        this.publication.commentaires.push(commentaire.id);
        this.pubService.savePublication(this.publication).then((publication)=>{
          this.publication = publication;
          // Création de la notification
          this.createNotificationCommentaire(commentaire.texte);

        });
      });
      this.texte = null;
    }
  }

  createNotificationCommentaire(texte: string) {
    const profilFlou = new Profil(this.utilisateur);
    const notification = new NotificationEkang(profilFlou, 'COMMENTAIRE');
    notification.publication = this.publication;
    notification.texte = texte;
    this.notifService.createNotification(notification).then((t)=>{

    });
  }
  createNotificationLike() {
    const profilFlou = new Profil(this.utilisateur);
    const notification = new NotificationEkang(profilFlou, 'LIKE');
    notification.publication = this.publication;
    this.notifService.createNotification(notification).then((t)=>{

    });
  }
  onClick() {}
  ouvrirPublication() {}
}
