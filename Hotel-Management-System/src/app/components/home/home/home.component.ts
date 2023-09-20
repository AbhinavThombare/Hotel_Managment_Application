import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NodeServerApiService } from 'src/app/services/node-server-api/node-server-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  token: any;
  local_token: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nodeserverapi: NodeServerApiService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token')
    this.local_token = localStorage.getItem('token')
    this.local_token = JSON.parse(this.local_token)

    if (!this.token || (this.local_token.value.toString() !== this.token.toString())) {
      this.nodeserverapi.logoutUser(this.local_token.value).subscribe(
        (res) => {
          console.log(res)
          this.router.navigate([''])
        }
      )
      localStorage.removeItem('token')

    }
  }

  logout(token:any) {
    console.log('abhinav')
    this.nodeserverapi.logoutUser(token).subscribe(
      (res) => {
        console.log(res)
        this.router.navigate([''])
        localStorage.removeItem('token')
      }
    )
  }

}
