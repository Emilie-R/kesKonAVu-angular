import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-mes-films',
  templateUrl: './mes-films.component.html',
  styleUrls: ['./mes-films.component.scss']
})
export class MesFilmsComponent implements OnInit {

  resource:any;//objet d'affichage
   API_URL = 'http://localhost:1337';

  constructor(private resourceSvc: ResourceService,
    private router:Router) { }

  ngOnInit(): void {
    this.resource = {"id":1,"title":"Le Grand Bleu",
    "date":"01/09/2021","realisateur":"Robert Z.","acteurs":"plein de monde ..."
    ,"synopsis":"bla bla bla ...","image":"https://fr.web.img6.acsta.net/c_180_240/pictures/21/01/28/17/39/5041772.jpg","type":"serie"};
  }

  goToDetailPage(id:number){
    this.resourceSvc.resource$.next(this.resource);
    // this.resourceSvc.getResourceFromApi(id);//pour consulter le console.log pour tests
    this.router.navigate(['detail',this.resource.id])
  }

}
