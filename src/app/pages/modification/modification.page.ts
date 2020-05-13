import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { Publication } from "src/app/models/publication.model";
import { Router } from "@angular/router";
import { Profil } from "src/app/models/profil.model";

@Component({
  selector: "app-modification",
  templateUrl: "./modification.page.html",
  styleUrls: ["./modification.page.scss"],
})
export class ModificationPage implements OnInit {
  public publication: Publication;
  texte: any;
  constructor(
    navParams: NavParams,
    public modalController: ModalController,
    private router: Router
  ) {
    this.publication = navParams.get("publication");
    console.log(this.publication);
  }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  urlify(text): string {
    const retour = this.getHashTag(text);
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return retour.replace(urlRegex, (url) => {
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
        this.publication.identifications.forEach((element) => {
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
    mots.forEach((mot) => {
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
}
