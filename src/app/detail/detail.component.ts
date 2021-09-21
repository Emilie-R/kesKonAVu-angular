import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../card/card.component';
import { FollowupService } from '../services/followup.service';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  isNo:boolean = false;
  isNone:boolean=false;
  isYes:boolean=false;

  constructor(public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private resourceService: ResourceService,
    private followUpService : FollowupService) { }

  ngOnInit(): void {
    /* Recherche des données de la resource si non présentes sur le followUp */
    
    if (this.data.followUpData.resource.actors == null) {
          this.resourceService.getResourceDetailsByIdResource(this.data.followUpData.resourceType, this.data.followUpData.resource)
          .subscribe(
             (resource) => 
             { /* Mise à jour du followUp à afficher */
               this.data.followUpData.resource = resource;
            
                /* Mise à jour des données de la liste de followUp cocernée pour prochaine interrogation*/
                this.followUpService
                  .updateResourceFollowUpinFollowUpsList(this.data.followUpData, this.data.followUpData.resource);
              }
          )
    }

    if(this.data.followUpData.note < 1 && this.data.followUpData.note != null ){

      this.isNo = true;

    }
    if(this.data.followUpData.note == 1 && this.data.followUpData.note != null ){

      this.isNone = true;

    }
    if(this.data.followUpData.note > 1 && this.data.followUpData.note != null ){

      this.isYes = true;

    }
    
  }

  onClose(): void {
    
    this.dialogRef.close();
  }

}