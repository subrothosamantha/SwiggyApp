import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  type : boolean = true;
  iconName = 'eye-outline';
  isLogin = false;


  constructor(private authService : AuthService,
    private router: Router,
    private global: GlobalService) { }

  ngOnInit() {
    //this.isLoggedIn();
  }

 async isLoggedIn(){
    try{
      //this.global.showLoader();
      const val = this.authService.getId();
      if(val) this.router.navigateByUrl('/tabs');
    
      
    }catch(e){
      console.log(e);
      
    }
  }


  onSubmit(form: NgForm) {
    console.log(form);
    if(!form.valid) return;
    this.login(form);
  }

  login(form) {
    this.isLogin = true;
    this.authService.logIn(form.value.email,form.value.password).then(data=>{
        console.log(data);
        this.router.navigateByUrl('/tabs');
        this.isLogin = false;
        form.reset();
    }).catch(e => {
      console.log(e);
      this.isLogin = false;
    });
  }

  changeType(){
    
    this.type = !this.type;
  }
}
