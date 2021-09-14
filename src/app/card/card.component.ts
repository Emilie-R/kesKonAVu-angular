import { Component, Input, OnInit } from '@angular/core';
import { FollowUpModel } from '../models/followup.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() followUp:FollowUpModel | undefined; 

  constructor() { }

  ngOnInit(): void {
  }

}
