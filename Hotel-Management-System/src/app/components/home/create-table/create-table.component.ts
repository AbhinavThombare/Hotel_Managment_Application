import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyTable as MatTable } from '@angular/material/legacy-table';
import { Data } from '@angular/router';
import { NodeServerApiService } from 'src/app/services/node-server-api/node-server-api.service';
import { NotificationAlertService } from 'src/app/services/notification-alert/notification-alert.service';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss']
})
export class CreateTableComponent implements OnInit {

  editProfileForm!: UntypedFormGroup;
  tableData: any = [];
  displayedColumns: string[] = ['Table_No', 'Dishes', 'Quantity', 'Unit_Price', 'Price', 'Total_Price', 'Action'];

  constructor(
    public dialog: MatDialog,
    public nodeserverapi: NodeServerApiService,
    public notificationapi: NotificationAlertService
  ) { }

  ngOnInit(): void {
    this.getTableData()
    setInterval(() => {
      this.getTableData()
    }, 3000)
  }

  getTableData() {
    this.nodeserverapi.getTables().subscribe(
      (res) => {
        this.tableData = res.body
      }
    )
  }

  addTable(): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: 'fit-content',
      height: 'fit-content'
    })
  }
  updateTable(tableNo: any): void {
    const onetable = this.tableData.find((i: any) => {
      return (i.tableNo === tableNo)
    })
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: 'fit-content',
      height: 'fit-content',
      data: onetable,

    })
  }

  deleteTable(id: any) {
    console.log(id)
    this.nodeserverapi.deleteTable(id).subscribe(
      (res) => {
        if (res.status === 200) {
          this.notificationapi.successAlert('Table Deleted Successfully.')
        }
      }
    )
  }


  onSubmit() {

  }

}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './dialog-box/dialog-box.html',
  styleUrls: ['./dialog-box/dialog-box.scss']
})
export class DialogAnimationsExampleDialog {
  tableno: any;
  dishvalue: any;
  quan: any;
  displayedColumns: string[] = ['Dishes', 'Quantity', 'Action'];
  Data: any = [];
  tempData!: any;
  dishList: any = '';
  tableData!: any;
  tableList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  removeData: any;
  searchTerm: any;

  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    public nodeserverapi: NodeServerApiService,
    public notificationapi: NotificationAlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getDishList();
    this.getTableList();
    // console.log(this.Data)
    if (data) {
      this.tableno = (data.tableNo).toString();
      data.Dishes.forEach((element: any) => {
        this.Data.push(element)
      });
    }


  }


  @ViewChild(MatTable)
  table!: MatTable<Data>;

  private getDishList() {
    this.nodeserverapi.allDishes().subscribe(
      (res) => {
        this.dishList = res.body
      }
    )
  }

  getTableList() {
    this.nodeserverapi.getTables().subscribe(
      (res) => {
        this.tableData = res.body
      }
    )
  }

  getTableOccupied(no: any) {
    if (this.tableData) {
      var result = this.tableData.find((i: any) => {
        return (i.tableNo === no)
      })
    }
    return result;
  }

  addTable(tableNo: any, Dish: any, Quantity: any) {

    if (this.Data.length) {
      var getit = false;
      this.Data.find((i: any) => {
        if (i.dish === Dish) {
          i.quantity = parseInt(i.quantity) + parseInt(Quantity)
          getit = true
        }
      })
      if (!getit) {
        this.Data.push({
          dish: Dish,
          quantity: Quantity,
          price: ''
        })
      }
    }
    else {
      this.Data.push({
        dish: Dish,
        quantity: Quantity,
        price: ''
      })
    }

    this.tempData = {
      tableNo: tableNo,
      Dishes: this.Data
    }
    this.searchTerm = ''
    this.quan = ''
    if (this.Data.length > 1) {
      this.table.renderRows()
    }
  }

  editDialog(e: any) {
    this.dishvalue = e.dish;
    this.searchTerm = e.dish;
    this.quan = e.quantity.toString();
    console.log(this.Data)
    this.Data.forEach((element: any, index: any) => {
      console.log(element);
      if (element.dish === e.dish) {
        this.Data.splice(index, 1)
      }
    });
    console.log(this.Data)
  }


  submitData() {
    this.nodeserverapi.addTable(this.tempData).subscribe(
      (res) => {
        if (res.status === 200) {
          this.notificationapi.successAlert('Table Added Successfully.')
        }
      }
    )
  }
}


