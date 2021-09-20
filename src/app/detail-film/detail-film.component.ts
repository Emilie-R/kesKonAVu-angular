import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-detail-film',
  templateUrl: './detail-film.component.html',
  styleUrls: ['./detail-film.component.scss']
})
export class DetailFilmComponent implements OnInit {

  resource:any;//resource à afficher
  subscription: Subscription = new Subscription;
  isSerie: boolean = false;

  constructor(private resourceSvc:ResourceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // this.subscription = this.resourceSvc.resource$
    // .subscribe((resource)=> this.resource = resource)
    // if(this.resource.type == "serie"){
    //   this.isSerie = true;
    }
  

}
