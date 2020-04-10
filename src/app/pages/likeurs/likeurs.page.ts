import { Component, OnInit, Input } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { Publication } from "src/app/models/publication.model";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-likeurs",
  templateUrl: "./likeurs.page.html",
  styleUrls: ["./likeurs.page.scss"]
})
export class LikeursPage implements OnInit {
  // @Input() firstName: string;
  public publication: Publication;
  tabLikeurs = [];
  tab: any;
  constructor(
    navParams: NavParams,
    public modalController: ModalController,
    private userService: UserService,
    private router: Router
  ) {
    // console.log(navParams.get("likeurs"));
    this.tab = navParams.get("likeurs");
    this.tab.forEach(likeur => {
      this.userService.getProfilByID(likeur).then(data => {
        console.log(data);
        this.tabLikeurs.push(data["utilisateur"]);
        // console.log(this.tabLikeurs);
      });
      // console.log(this.tabLikeurs);
    });
  }

  ngOnInit() {}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
  ouvrir(data) {
    // console.log(data);
    // console.log(data["uid"]);
    this.modalController.dismiss({
      dismissed: true
    });
    this.router.navigate(["amis", "amis-view", data["uid"]]);
  }
}
