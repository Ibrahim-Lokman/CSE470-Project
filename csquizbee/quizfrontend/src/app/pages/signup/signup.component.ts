import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, 
    private snack:MatSnackBar) { }


  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  ngOnInit(): void {
  }
  formSubmit(){
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open("Username is required!!", 'ok',{
        duration: 3000,
      });
      return;
    }

    //validate

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        Swal.fire('Registration Done!', "User id is "+data.id, 'success');
      },
      (error)=>{
        console.log(error);
        this.snack.open("Something went wrong!!", 'ok',{
          duration: 3000,
        });
        

      }

    )
  }

}
