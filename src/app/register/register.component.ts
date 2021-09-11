import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberModel } from 'src/models/member.model';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private memberService: MemberService,
    private route: Router) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      pseudo: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm.addValidators(MustMatch("password", "confirmPassword"));
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      // Appel à la requête pour inscrire le member
      this.memberService.registerMember(this.registerForm.controls.pseudo.value,
        this.registerForm.controls.email.value,
        this.registerForm.controls.password.value).subscribe(
          (data: any) => {

            // On stocke le jwt dans le localStorage
            localStorage.setItem('keskonavu-token', data.jwt.token);

            // On transmet les information du member connecté dans le subject
            let member = new MemberModel(data);
            this.memberService.loggedMember$.next(member);

            // On navigue vers la page des followups mes-films
            this.route.navigate(["/mes-films"]);
          },
          (error: any) => {
            // Gestion des erreurs en cas de problème sur la création du member
            switch (error.status) {
              case 409:
                alert("Pseudo et mot de passe incorrects");
                break;

              default:
                break;
            }
          })
    }
  }

  getEmailErrorMessage() {
    if (this.registerForm.controls.email.hasError('email')) {
      return "Renseigner un email valide";
    };
    return;
  }

  getPseudoErrorMessage() {
    if (this.registerForm.controls.pseudo.hasError('required')) {
      return "Vous devez renseigner un pseudo";
    };
    return "Le pseudo doit contenir au moins 6 caractères";
  }

  getPasswordErrorMessage() {
    if (this.registerForm.controls.password.hasError('required')) {
      return "Vous devez renseigner un mot de passe";
    };
    if (this.registerForm.controls.password.hasError('minlength')) {
      return "Le mot de passe doit contenir au moins 6 caractères";
    }
    return;
  }

  getConfirmPasswordErrorMessage() {
    if (this.registerForm.controls.confirmPassword.hasError('required')) {
      return "Vous devez renseigner un mot de passe";
    };
    if (this.registerForm.controls.confirmPassword.hasError('minlength')) {
      return "Le mot de passe doit contenir au moins 6 caractères";
    }
    if (this.registerForm.controls.confirmPassword.hasError('mustMatch')) {
      return "Les mots de passe ne sont pas identiques";
    }
    return;
  }
}

export function MustMatch(controlName: string, matchingControlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // présence d'une erreur autre que mustMatch sur le champ à confirmer
      return;
    }

    if (control.value != matchingControl.value) {
      // On positionne l'erreur sur le champ à vérifier
      matchingControl.setErrors({ mustMatch: true })
    } else {
      matchingControl.setErrors(null);
    }
  }
}
