import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../card/card.component';
import { FollowupService } from '../services/followup.service';

@Component({
  selector: 'app-progression',
  templateUrl: './progression.component.html',
  styleUrls: ['./progression.component.scss']
})
export class ProgressionComponent implements OnInit {
  step: number;

  constructor(public dialogRef: MatDialogRef<ProgressionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private followupService : FollowupService) { }

  ngOnInit(): void {
    this.step = 0;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
