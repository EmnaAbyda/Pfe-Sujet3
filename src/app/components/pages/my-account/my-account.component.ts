import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.shared';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.sass']
})
export class MyAccountComponent implements OnInit {


  formModel = {
    Email: '',
    Password: ''
  }
  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/pages/profile');
    this.service.formModel.reset();

  }


  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        console.log("hello")
        console.log(form.value);
        localStorage.setItem('token', res.token);
        console.log(res.token);
        this.router.navigateByUrl('/pages/profile');
      },
      err => {
        console.log("hello2")
        console.log(form.value);

        if (err.status == 400)
          this.toastr.error('Incorrect email or password.', 'Authentication failed.');
        else
          console.log(err);
      }
    );
  }


  onSubmitRegister() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          console.log("cc")

          console.log(res)
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        } else {
          res.errors.forEach(element => {
            console.log("aa")

            switch (element.code) {
              case 'DuplicateEmail':
                this.toastr.error('Email is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}



