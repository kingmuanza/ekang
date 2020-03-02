import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PublicationService } from "src/app/services/publication.service";
import { Publication } from "src/app/models/publication.model";
import { Subscription } from "rxjs";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Commentaire } from "src/app/models/commentaire.model";

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
    private route: ActivatedRoute
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
      this.pubService.saveCommentaire(commentaire).then(c => {
        this.commentaires.unshift(commentaire);
      });
      this.texte = null;
    }
  }
  onClick() {}
  ouvrirPublication() {}
}
