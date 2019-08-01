import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  error: boolean = false;
  users: User[];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getAll().subscribe(users => {
      this.users = users;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.error = true;
    })
  }

}
