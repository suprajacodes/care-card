// donationService.js

import { db, auth } from '../firebaseConfig';  // Import Firebase configuration
import { collection, addDoc } from 'firebase/firestore';

// Function to donate an item to Firestore
const donateItem = async (item) => {
  try {
    // Add the donation to Firestore
    await addDoc(collection(db, "donations"), {
      item: item.name,  // Donation item name
      user: auth.currentUser.uid  // User ID (from Firebase Auth)
    });

    // Notify user of successful donation
    alert('Thank you for your donation!');
  } catch (error) {
    // Handle errors
    console.error("Error adding donation: ", error);
    //manual comment
    //alert('There was an error with your donation. Please try again later.');
  }
};
//
export { donateItem };
