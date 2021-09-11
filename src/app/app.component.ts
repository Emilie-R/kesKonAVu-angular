import { Component } from '@angular/core';
import { MemberModel } from 'src/models/member.model';
import { MemberService } from './services/member.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'keskonavu-front';

  loggedMember: any;
  isLog: boolean = false;

  constructor(public memberService: MemberService) { }

  ngOnInit() {
    this.memberService.loggedMember$.subscribe(
      (member) => {
        this.loggedMember = new MemberModel(member);
      })
  }

}
