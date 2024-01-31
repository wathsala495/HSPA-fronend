import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user:any){
    let UserArray=[];
    const storedUsersJSON = localStorage.getItem('Users')
    if(storedUsersJSON){
      UserArray =JSON.parse(storedUsersJSON);
    }
    return UserArray.find((p: { userName: any; password: any; }) =>p.userName===user.userName && p.password===user.password);
  }
}
