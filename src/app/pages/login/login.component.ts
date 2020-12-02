import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserDTO } from 'src/app/interfaces/IUserDTO';
import { AuthenticateService } from 'src/services/authenticate.service';
import { NewUserService } from 'src/services/new-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private userService: NewUserService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  form!: FormGroup;
  formNewUser!: FormGroup;
  login: IUserDTO = {} as IUserDTO;

  isNewUser: boolean = false;

  ngOnInit(): void {
    this.setFormBuilder();
    this.setFormBuilderNewUser();
  }

  setFormBuilder(): void {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  createNewUser(): void {
    this.isNewUser = this.isNewUser ? false : true;
  }

  setFormBuilderNewUser(): void {
    this.formNewUser = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
  }

  onSubmitNewUser(): void {
    if (!this.createUserCheckNullField()) {
      return;
    }

    if (this.formNewUser.value.password !== this.formNewUser.value.confirmPassword) {
      window.alert('Senhas não conferem!')
      return;
    }

    const user: IUserDTO = {
      id: 0,
      name: this.formNewUser.value.name,
      email: this.formNewUser.value.email,
      password: this.formNewUser.value.password,
    }

    this.userService.create(user).subscribe(user => {
      this.isNewUser = false;
      this.form.reset();
    })
  }

  onSubmit(): void {
    if (!this.loginCheckNullField()) {
      return;
    }

    this.login = this.form.value as IUserDTO;
    this.authService.login(this.login).subscribe(res => {
      this.authService.isLogged = true;
      localStorage.setItem('token', res.toString());
      this.moveToApp();
    },
      error => {
        this.authService.isLogged = false;
        alert('Erro ao logar, por favor tente novamente.')
      });
  }

  moveToApp(): void {
    this.route.navigate(['/'], { relativeTo: this.activatedRoute });
  }

  loginCheckNullField(): boolean {
    if (this.form.value.email == null || this.form.value === ''
      || this.form.value.password == null || this.form.value.password === '') {
      window.alert('Campo obrigatório não preenchido!');

      return false;
    }

    return true;
  }

  createUserCheckNullField(): boolean {
    if (this.formNewUser.value.email == null || this.formNewUser.value === ''
      || this.formNewUser.value.password == null || this.formNewUser.value.password === ''
      || this.formNewUser.value.confirmPassword == null || this.formNewUser.value.confirmPassword === ''
      || this.formNewUser.value.name == null || this.formNewUser.value.name === '') {
      window.alert('Campo obrigatório não preenchido!');

      return false;
    }

    return true;
  }

}
