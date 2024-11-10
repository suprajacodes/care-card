// DonationService.js

import { db } from '../firebaseConfig';  // Adjust to the correct path
import { collection, addDoc } from 'firebase/firestore';  // Import Firestore methods

export const donateItem = async (donation) => {
  try {
    // Add donation to Firestore
    const docRef = await addDoc(collection(db, "donations"), {
      name: donation.name,
      donatedAt: new Date(),
    });
    console.log("Donation added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding donation: ", e);
    throw new Error('Donation failed. Please try again later.');
  }
};
