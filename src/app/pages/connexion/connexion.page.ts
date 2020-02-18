import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  connexion() {
    this.router.navigate(['accueil']);
  }

  inscription() {
    this.router.navigate(['inscription']);
  }

}
