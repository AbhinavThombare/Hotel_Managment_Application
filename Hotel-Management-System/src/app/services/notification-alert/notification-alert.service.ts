import { Injectable } from '@angular/core';
import {MatLegacySnackBar as MatSnackBar,MatLegacySnackBarHorizontalPosition as MatSnackBarHorizontalPosition,MatLegacySnackBarVerticalPosition as MatSnackBarVerticalPosition,} from '@angular/material/legacy-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationAlertService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) {}

  registrationAlert() {
    this._snackBar.open('Registration Completed!!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: ['successbar'],
    });
  }

  successAlert(msg:any) {
    this._snackBar.open(msg,'',{
      horizontalPosition:this.horizontalPosition,
      verticalPosition:this.verticalPosition,
      duration:2000,
      panelClass:['successbar'],
    })
  }

  loginAlert(msg:any) {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:2000,
      panelClass: ['successbar'],
    });
  }

  errorAlert(msg:any) {
    this._snackBar.open(msg,'',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['errorbar']
    })
  }
}
