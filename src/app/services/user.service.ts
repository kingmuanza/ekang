import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  create_User(record) {
    return this.firestore.collection("Users").add(record);
  }

  read_Users() {
    return this.firestore.collection("Users").snapshotChanges();
  }

  update_Student(recordID, record) {
    this.firestore.doc("Users/" + recordID).update(record);
  }

  delete_User(record_id) {
    this.firestore.doc("Users/" + record_id).delete();
  }

  read_ProfessionList() {
    return this.firestore.collection("Professions").snapshotChanges();
  }
}
