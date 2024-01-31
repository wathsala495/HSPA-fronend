import { Component } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  
  loggedinUser!:string;
  constructor(private alertify:AlertifyService){}

  loggedin(){
    this.loggedinUser = localStorage.getItem('token') as string;

    return this.loggedinUser;

  }
  onLogout(){
    localStorage.removeItem('token');
    this.alertify.success("you are logged out !")
  }

 
 
  
}
