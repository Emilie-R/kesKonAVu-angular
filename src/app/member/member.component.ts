import { Component, OnInit } from '@angular/core';
import { MemberModel } from '../models/member.model';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
 
  loggedMember: any;
  isLog: boolean = true;

  constructor(public memberService: MemberService) { }

  ngOnInit() {
    this.memberService.loggedMember$.subscribe(
      (member) => {
        this.loggedMember = new MemberModel(member);
      })
  }

  OnClickLogOut() {
    this.memberService.logoutMember();
  }

}
