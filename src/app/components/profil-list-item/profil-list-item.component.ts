import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Profil } from 'src/app/models/profil.model';

@Component({
  selector: 'app-profil-list-item',
  templateUrl: './profil-list-item.component.html',
  styleUrls: ['./profil-list-item.component.scss'],
})
export class ProfilListItemComponent implements OnInit, OnChanges {

  @Input() profil: Profil;

  constructor() { }

  ngOnInit() {}

  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}
