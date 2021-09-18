import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member-content-nav',
  templateUrl: './member-content-nav.component.html',
  styleUrls: ['./member-content-nav.component.scss']
})
export class MemberContentNavComponent implements OnInit {

  isMovies:boolean=true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private memberService : MemberService) { }

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path == "mes-films") {
      this.isMovies = true;
    } else {
      this.isMovies = false;
    }
    
  }
  
  onClickLogOut() {
    this.memberService.logoutMember();
  }
}
