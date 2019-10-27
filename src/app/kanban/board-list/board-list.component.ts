import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Board } from '../board.model';
import { Subscription } from 'rxjs';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {
  boards: Board[];
  sub: Subscription;

  constructor(
    public boardService: BoardService,
  ) { }

  ngOnInit() {
    this.sub = this.boardService
      .getUserBoards()
      .subscribe(boards => (this.boards = boards));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    // moves boards in the front end w/helper method
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    // tie the same action to our back end to update db
    this.boardService.sortBoards(this.boards);
  }

}
