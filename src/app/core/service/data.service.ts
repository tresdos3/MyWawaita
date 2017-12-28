import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Teacher } from '../interface/teacher';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

//  <T> para interfaces personalizadas
type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;
@Injectable()
export class DataService {

  constructor(private afs: AngularFirestore) { }

  //  =================== Get data =====================
  // return list of data
  collection<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  // return object of data
  document<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  // ****get data from firestore ******
  GetDocuments<T>(ref: DocPredicate<T>): Observable<T> {
    return this.document(ref).snapshotChanges().map(doc => {
      return doc.payload.data() as T;
    });
  }

  GetCollections<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.collection(ref, queryFn).snapshotChanges().map(docs => {
      return docs.map(a => a.payload.doc.data()) as T[];
    });
  }
  //  **** get collection data with IDs ****
  CollectionsWithIds<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
    return this.collection(ref, queryFn).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  //  =================== Get Time from FirestoreServer =====================
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  // Custom Methods
  // Update Method
  update<T>(ref: DocPredicate<T>, data: any) {
    return this.document(ref).update({
      ...data,
      updatedAt: this.timestamp
    });
  }
  // Set Method
  set<T>(ref: DocPredicate<T>, data: any) {
    const timestamp = this.timestamp;
    return this.document(ref).set({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }
  // Set Method
  add<T>(ref: CollectionPredicate<T>, data) {
    const timestamp = this.timestamp;
    return this.collection(ref).add({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }
  // Remove Method
  remove<T>(ref: DocPredicate<T>, data: any) {
    return this.document(ref).delete();
  }
}
