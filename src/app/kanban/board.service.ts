import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Board, Task } from './board.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  // creates new board for current logged in user
  async createBoard(data: Board) {
    const user = await this.afAuth.auth.currentUser;

    return this.db.collection('boards').add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'Hello!', label: 'yellow' }] // default object
    });
  }

  // delete one board
  deleteBoard(boardId: string) {
    return this.db.collection('boards')
      .doc(boardId)
      .delete();
  }

  // update task array
  updateTasks(boardId: string, tasks: Task[]) {
    return this.db.collection('boards')
      .doc(boardId)
      .update({ tasks });
  }

  // remove one task from Task array
  removeTask(boardId: string, task: Task) {
    return this.db.collection('boards')
      .doc(boardId)
      .update({
        // special syntax to remove one document from array
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }

  // get all boards owned by current user
  getUserBoards() {
    // get authState as Observable so boards can be synced in real time
    return this.afAuth.authState.pipe(
      switchMap( user => {
        if (user) {
          return this.db.collection<Board>(
            'boards',
            ref => ref.where('uid', '==', user.uid)
            .orderBy('priority')
          )
          // valueChanges returns query as observable
          // extra data returns document id w/data from database
          .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  // Run batch write to change priority of each board for sorting
  // iterate over all board & figure out what intended ordering is
  // based on user's interaction on front end. Send that array to firestore
  // & update priority on each one. Make sure writes either fail or succeed
  // TOGETHER. w/batch, if one write fails, all roll back to previous state
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map( b => db.collection( 'boards' ).doc( b.id ));

    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit(); // runs the batch update
  }

}
