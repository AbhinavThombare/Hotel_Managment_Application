import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeServerApiService {
  private configURL = 'http://localhost:3003';
  headers = new HttpHeaders();
  
  constructor(
    private http:HttpClient
  ) { }

  registerUser(data:any) {
    return this.http.post(this.configURL+'/api/user/register',{data},{observe:'response'})
  }

  loginUser(userdata:object) {
    return this.http.post(this.configURL+'/api/user/login/',{userdata},{ observe: 'response' })
  }

  logoutUser(token:any) {
    return this.http.post(this.configURL+'/api/user/logout/'+token,{observer:'response'})
  }


  ///////////////////////////( Dish API )////////////////////////////////////////

  addDish(dish:any) {
    return this.http.post(this.configURL+'/api/dish/add',{dish},{observe:'response'})
  }

  allDishes() {
    return this.http.get(this.configURL+'/api/dish/alldisges',{observe:'response'})
  }

  updateDish(dish:any) {
    return this.http.put(this.configURL+'/api/dish/updatedish',{dish},{observe:'response'})
  }

  deleteDish(dishid:any) {
    return this.http.delete(this.configURL+'/api/dish/delete/'+dishid,{observe:'response'})
  }

  ///////////////////////////////////( Tabel API's)//////////////////////////////////////////

  addTable(table:any) {
    return this.http.post(this.configURL+'/api/table/addtable',{table},{observe:'response'})
  }

  getTables() {
    return this.http.get(this.configURL+'/api/table/tables',{observe:'response'})
  }

  deleteTable(tableId:any) {
    return this.http.delete(this.configURL+'/api/table/deleteTable/'+tableId,{observe:'response'})
  }

///////////////////////////////////( AllDataTables )////////////////////////////////////////

  allDataTable(tableData:any) {
    return this.http.post(this.configURL+'/api/allDataTables/Tables',{tableData},{observe:'response'})
  }

  getTotalAmount(start_date:any,end_date:any) {
    return this.http.get<any[]>(this.configURL+'/api/alldata/totalAmount/'+start_date+'/'+end_date)
  }
}
