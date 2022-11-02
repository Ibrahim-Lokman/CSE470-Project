import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  }
  
  constructor(private snack:MatSnackBar, private login:LoginService) {
    
  }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log("login button working");
    if ( this.loginData.username.trim() == '' || 
    this.loginData.username == null ) {
      
      this.snack.open('Username is required !! ' , '', {
        duration: 3000,
      });
      return;

    }



    //Request server to generate token
    this.login.generateToken(this.loginData).subscribe(
      ( data : any ) => {
        console.log('success');
        console.log(data);

      },
      ( error ) => {
        console.log('Error !');
        console.log(error);
      }
    );

  }

}
