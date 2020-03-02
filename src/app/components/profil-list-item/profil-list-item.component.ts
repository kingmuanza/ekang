import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Profil } from 'src/app/models/profil.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil-list-item',
  templateUrl: './profil-list-item.component.html',
  styleUrls: ['./profil-list-item.component.scss'],
})
export class ProfilListItemComponent implements OnInit, OnChanges {

  @Input() profil: Profil;
  @Input() monProfil: Profil;
  sontAmis = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.sontAmis = this.sontIlsAmis();
  }

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


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.sontAmis = this.sontIlsAmis();
  }

  enregistrerTout() {
    this.userService.updateProfil(this.monProfil).then((pA)=>{
      this.monProfil = pA;
      this.sontAmis = this.sontIlsAmis();
      this.userService.updateProfil(this.profil).then((pB)=>{
        this.profil = pB;
        this.sontAmis = this.sontIlsAmis();
      });
    });
  }

  suivre() {
    if(!this.monProfil.abonnements) {
      this.monProfil.abonnements = new Array<string>();
    }
    this.monProfil.abonnements.unshift(this.profil.utilisateur.uid);
    if(!this.profil.abonnes){
      this.profil.abonnes = new Array<string>();
    }
    this.profil.abonnes.unshift(this.monProfil.utilisateur.uid);
    this.enregistrerTout();
  }

  unSuivre() {
    this.monProfil.abonnements = this.monProfil.abonnements.filter(s => {
      return s !== this.profil.utilisateur.uid;
    });
    this.profil.abonnes = this.profil.abonnes.filter(s => {
      return s !== this.monProfil.utilisateur.uid;
    });
    this.enregistrerTout();
  }

}
