import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MemberModel } from '../models/member.model';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private route: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group(
      { pseudo:['', [Validators.required, Validators.minLength(6)]],
        password:['', [Validators.required, Validators.minLength(6)]]
      }
    )
  }

  onLoginSubmit(){
    if (this.loginForm.valid){
      this.memberService.loginMember(this.loginForm.controls.pseudo.value
        , this.loginForm.controls.password.value).subscribe(
          (data) => {
            // On stocke le jwt dans le localStorage
            localStorage.setItem('keskonavu-token', data.jwt.token);

            // On transmet les information du member connecté dans le subject
            let member = new MemberModel(data);
            this.memberService.loggedMember$.next(member);

            // On navigue vers la page des followups mes-films
            this.route.navigate(["/mes-films"]);
          },
          (error) => {
            this.loginForm.reset();
            // Traiter les erreurs renvoyés par le service d'authentification
            switch (error.status) {
              case 404:
                this.snackBar.open("pseudo/ mot de passe invalides", "Fermer", {
                  horizontalPosition: 'center',
                  verticalPosition: 'top'
                });
                break;
              default:
                  this.snackBar.open('Erreur serveur', 'Fermer' , {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  duration : 5000
                });
          } 
        }
        )
    }
  }

  getPseudoErrorMessage() {
    if (this.loginForm.controls.pseudo.hasError('required')) {
      return "Vous devez renseigner un pseudo";
    };
    return "Le pseudo doit contenir au moins 6 caractères";
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls.password.hasError('required')) {
      return "Vous devez renseigner un mot de passe";
    };
    if (this.loginForm.controls.password.hasError('minlength')) {
      return "Le mot de passe doit contenir au moins 6 caractères";
    }
    return "";
  }


}
