import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:44357/api/AuthManagement';
  readonly BaseURI_Liv = 'https://localhost:44357';

  formModel = this.fb.group({
    UserName: ['', ],
    Email: ['', Validators.email],
    PhoneNumber: ['',],
    Passwords: this.fb.group({
      Password: ['', [ Validators.minLength(4)]],
      ConfirmPassword: ['', ]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }
  getAllLivreur(){
    return this.http.get(this.BaseURI_Liv + '/GetAllDeliveryMan');

  }
  HistoriqueCommandes(){
    return this.http.get(this.BaseURI_Liv + '/api/Commande/706358f2-20cd-4b93-a415-23649bd3551a');

  }
  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      PhoneNumber: this.formModel.value.PhoneNumber,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/');
  }
}
