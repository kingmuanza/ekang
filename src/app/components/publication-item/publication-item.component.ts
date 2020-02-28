import { Component, OnInit, Input } from '@angular/core';
import { Publication } from 'src/app/models/publication.model';

@Component({
  selector: 'app-publication-item',
  templateUrl: './publication-item.component.html',
  styleUrls: ['./publication-item.component.scss'],
})
export class PublicationItemComponent implements OnInit {

  @Input() publication: Publication;

  constructor() { }

  ngOnInit() {}

}
