import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResourceType, Status } from '../models/followup.model';
import { FollowupService } from '../services/followup.service';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-resource-dialog',
  templateUrl: './resource-dialog.component.html',
  styleUrls: ['./resource-dialog.component.scss']
})
export class ResourceDialogComponent implements OnInit {

  resourceTypeToCreate: ResourceType;
  isMesEnvies: boolean;
  resourceResults: Array<any>;
  noResult:boolean;
  isLoading:boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialog : MatDialogRef<any>,
              private resourceService : ResourceService,
              public followupService : FollowupService) { }
  

  ngOnInit(): void {
    this.resourceTypeToCreate = this.data.resourceType;
    this.isMesEnvies = this.data.isMesEnvies;
  }

  /**
   * this method allow to get the correct title of te resource dialog
   * @returns string
   */
  getResourceTypeLabel(){
    if (this.resourceTypeToCreate == ResourceType.movie) {
      return "un film";
    }
    if (this.resourceTypeToCreate == ResourceType.serie) {
      return "une série";
    }
    return null;
  }


  /**
   *
   * @param userSearchText The string searched by user in the search bar
   * @returns A list of 10 resources max that match the usersearch
   */
  findResourcesByTitle(userSearchText:string){
    if (userSearchText.trim().length < 3) {
      this.resourceResults = [];
      return;
    }
    this.resourceService.getResourceByTitle(this.resourceTypeToCreate, userSearchText).subscribe(
      (data:any) => {

        if (data.Response == "True") {
          this.noResult = false;
          this.resourceResults = data.Search;
        } else {
          this.noResult = true;
          this.resourceResults = [];
        }
      },
      (error) => {
        console.log(error); 
      }
      )
  }

  /**
   * 
   * @param resource to add in user followups List
   */
  addResourceToList(resource:any) {

    let status:Status;
    if (this.isMesEnvies){
      status = Status.avoir;
    } else {
      status = Status.vu;
    }

    this.followupService.createNewFollowUp(resource, this.resourceTypeToCreate, status);
    this.dialog.close();
  }
}
