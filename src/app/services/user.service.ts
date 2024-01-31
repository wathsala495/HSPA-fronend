import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Users } from '../model/users';
//import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users:User[]=[]

  constructor() { }

  addUser(user:Users){
    let users = [];
    const storedUsersJSON = localStorage.getItem('Users')
    if (Array.isArray(this.users)){
    if(storedUsersJSON !== null){
      users=JSON.parse(storedUsersJSON);
      users=[user,...users];
    }
    else{
      users=[user];
    }
    localStorage.setItem('Users',JSON.stringify(users))

  }}

}
