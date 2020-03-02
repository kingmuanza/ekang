import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Publication } from "src/app/models/publication.model";
import { PublicationService } from "src/app/services/publication.service";
import * as firebase from "firebase";
import { Router } from "@angular/router";

@Component({
  selector: "app-publication-item",
  templateUrl: "./publication-item.component.html",
  styleUrls: ["./publication-item.component.scss"]
})
export class PublicationItemComponent implements OnInit, OnChanges {
  @Input() publication: Publication;
  @Input() utilisateur: firebase.User;
  jaiLike = false;

  constructor(private router: Router, private pubService: PublicationService) {}

  ngOnInit() {
    if (this.publication && this.utilisateur) {
      this.aiJeLike();
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

  ouvrirPublication() {
    this.router.navigate([
      "publications",
      "publications-view",
      this.publication.id
    ]);
  }

  onClick() {}
}
