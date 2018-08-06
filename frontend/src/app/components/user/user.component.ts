/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/


import { Component, OnInit } from '@angular/core';
import { User, AccessToken, UserApi } from '../../shared/sdk';

@Component({
  selector: 'app-login',
  template: `
  <h1>Login</h1>
  <form (submit)="login()">
    <input type="text" name="email" [(ngModel)]="user.email"/>
    <input type="password" name="password" [(ngModel)]="user.password"/>
    <button>Enter</button>
  </form>
  <button submit="logout()">Papapa</button>
`
})
export class UserComponent {
  
  private user: User = new User();

  constructor(private userApi: UserApi) {}

  login(): void {
    this.userApi.login(this.user).subscribe(
      (token: AccessToken) => {console.log(token),console.log(this.user)},
      (err) => console.log(err)
    );
  }

  logout(): void {
    this.userApi.logout().subscribe();
    console.log(this.user);
  }
}