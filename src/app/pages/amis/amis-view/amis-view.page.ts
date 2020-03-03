import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Profil } from "src/app/models/profil.model";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: "app-amis-view",
  templateUrl: "./amis-view.page.html",
  styleUrls: ["./amis-view.page.scss"]
})
export class AmisViewPage implements OnInit {
  profil: Profil;
  monProfil: Profil;
  user: boolean = false;
  sontAmis = false;
  utilisateur: firebase.User;
  utilisateurSubscription: Subscription;

  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public auth: AuthentificationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id) {
        this.userService.getProfilByID(id).then(profil => {
          this.profil = profil;
          console.log(this.profil);
          this.utilisateurSubscription = this.auth.utilisateurSubject.subscribe(
            utilisateur => {
              this.utilisateur = utilisateur;
              this.userService.getProfil(this.utilisateur).then((monProfil)=>{
                this.monProfil = monProfil;
                this.sontAmis = this.sontIlsAmis();
              });
            }
          );
          this.auth.emettre();
        });
      }
    });
  }
  onClick() {}
  
  sontIlsAmis() {
    if(this.monProfil && this.profil) {
      if(this.monProfil.abonnements) {
        const resultats = this.monProfil.abonnements.find((index)=>{
          return index === this.profil.utilisateur.uid;
        });
        if(resultats) {
          return true
        }
      }
    }
    return false
  }
}
