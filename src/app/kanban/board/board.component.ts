import { Component, Input } from '@angular/core';
import { BoardService } from '../board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent  {
  @Input() board;

  constructor(
    private boardService: BoardService
  ) { }

  taskDrop(event: CdkDragDrop<string[]>) {
    // to update the interface:
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    // update the db:
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }

}
