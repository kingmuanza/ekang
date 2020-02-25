import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Profil } from 'src/app/models/profil.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-amis-view',
  templateUrl: './amis-view.page.html',
  styleUrls: ['./amis-view.page.scss'],
})
export class AmisViewPage implements OnInit {

  profil: Profil;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params)=>{
      const id = params.get('id');
      if(id){
        this.userService.getProfilByID(id).then((profil)=>{
          this.profil = profil;
        });
      }
    })
  }

}
