import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  authError() {
    this.snackBar.open( 'You must be logged in!', 'OK', {
      duration: 5000
    });

    return this.snackBar._openedSnackBarRef
      .onAction()
      .pipe(
        // tap is an operator that performs a side effect for every emission
        // and returns identical Observable to the source
        tap( _ => this.router.navigate( ['/login'] ) )
      )
      .subscribe();
  }

}
