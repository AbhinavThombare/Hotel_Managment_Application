import { Component, OnInit } from '@angular/core';
import { NodeServerApiService } from 'src/app/services/node-server-api/node-server-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationAlertService } from 'src/app/services/notification-alert/notification-alert.service';

@Component({
  selector: 'app-add-dishes',
  templateUrl: './add-dishes.component.html',
  styleUrls: ['./add-dishes.component.scss']
})
export class AddDishesComponent implements OnInit {
  dish: any | undefined;
  category: String | undefined;
  name: String | undefined;
  price: String | undefined;
  alldishes: any | null;
  displayedColumns: string[] = ['Category', 'Name', 'Price', 'Action'];
  result!: any[];
  searchText: any = ''
  uploadbtn: boolean = false;
  id: any;


  constructor(
    private nodeserverapi: NodeServerApiService,
    private notification: NotificationAlertService
  ) {

  }

  ngOnInit(): void {
    this.allDishes()
  }

  allDishes() {
    this.nodeserverapi.allDishes().subscribe(
      (res) => {
        this.alldishes = res.body
        this.alldishes = this.alldishes.dishes
        this.result = Object.keys(this.alldishes).map(e => this.alldishes[e]);
      }
    )
  }

  adddish() {
    console.log(this.category, this.name, this.price)
    this.dish = {
      Category: this.category,
      Dish_Name: this.name,
      Price: this.price
    }

    console.log(this.dish)

    this.nodeserverapi.addDish(this.dish).subscribe(
      (res) => {
        console.log(res)
        this.category = ''
        this.name = ''
        this.price = ''
        this.allDishes()
      },
      (error) => {
        if (error.status === 400) {
          this.notification.errorAlert(error.error)
        }
      }
    )
  }

  editDish(dish: any) {
    console.log(dish)
    this.dish = dish
    this.uploadbtn = true
    this.id = dish._id
    this.category = dish.Category
    this.name = dish.Dish_Name
    this.price = dish.Price

  }

  Upload() {
    this.uploadbtn = false
    this.dish.category = this.category
    this.dish.Dish_Name = this.name
    this.dish.Price = this.price

    console.log(this.dish)

    this.nodeserverapi.updateDish(this.dish).subscribe(
      (res) => {
        console.log(res)
        this.category = ''
        this.name = ''
        this.price = ''
        this.allDishes()
        this.notification.successAlert('Dish is Updated')
      },
      (error) => {
        if (error.status === 400) {
          this.notification.errorAlert(error.error)
          this.category = ''
          this.name = ''
          this.price = ''
          this.allDishes()
        }
      }
    )
  }

  deleteDish(dish:any) {

    console.log(dish._id)

    this.nodeserverapi.deleteDish(dish._id).subscribe(
      (res) => {
        // console.log(res)
        if(res.status===200){
          this.allDishes()
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
