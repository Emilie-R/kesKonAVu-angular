import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollowUpModel } from '../models/followup.model';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() followUp:FollowUpModel | undefined; 

  constructor(private resourceSvc: ResourceService,
    private router:Router) { }

  ngOnInit(): void {
  }

}
