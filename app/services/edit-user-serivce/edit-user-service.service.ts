import { Injectable } from '@angular/core';
import { UserInterface } from '../../interfaces/User/user-interface';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc ,updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EditUserServiceService {
  user:UserInterface[] =[] 
 
  EditUser(id: any, user: UserInterface) {
    const Usercollection = collection(this.firestore, 'User');
    const document = doc(Usercollection, id); // Use the provided id
    const updatedData = {
      UserName: user.name,
      address: user.address,
      Email: user.email,
      PhoneNumber: user.phoneNumber
    };

    // Update the local array
    const index = this.user.findIndex(u => u.id === id);
    if (index !== -1) {
        this.user[index] = user;
    }

    return Promise.all([
        updateDoc(document, updatedData),
    ])
    .then(() => {
        console.log('user  data updated successfully.');
    })
    .catch((error) => {
        console.error('Error updating company data:', error);
        throw error;
    });
}


  constructor(private firestore: Firestore) { }
  
}
