// can manage all dialogs from one component. Also allows sharing of one stylesheet
// which helps as your app grows in complexity.

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  template: `
    <h1 mat-dialog-title>Board</h1>
    <div mat-dialog-content>
      <p>What shall we call this board?</p>
        <mat-form-field>
          <input placeholder="title" matInput [(ngModel)]="data.title" />
        </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data.title" cdkFocusInitial>Create</button>
    </div>
  `,
  styles: []
})
export class BoardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BoardDialogComponent>, // how Ng finds the component to load at runtime
    @Inject(MAT_DIALOG_DATA) public data: any, // pass data into dialog & modified data back out when user closes
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
