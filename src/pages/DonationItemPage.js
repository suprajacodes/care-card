import React, { useState } from 'react';
import { donateItem } from './DonationService';  // Import the donateItem function

const DonationItemPage = () => {
  // State to track user points
  const [points, setPoints] = useState(0);

  // State to track earned badges
  const [badges, setBadges] = useState([]);

  // Sample donation items
  const [items, setItems] = useState([
    { id: 1, name: 'Food Package', description: 'Basic food items', price: 10 },
    { id: 2, name: 'School Supplies', description: 'Notebooks, pens, etc.', price: 5 }
  ]);

  // State for item name (for user donation)
  const [itemName, setItemName] = useState(''); 

  // Handle donation and update points and badges
  const handleDonation = (item) => {
    // Update points based on donation (here adding 10 points for each donation)
    setPoints(points + 10);

    // Check if points reach a threshold and award badges
    if (points >= 50 && !badges.includes('Super Donor')) {
      setBadges([...badges, 'Super Donor']); // Award 'Super Donor' badge if points >= 50
    }

    // You can add more badges here for different thresholds, e.g., 100 points = 'Mega Donor'

    // Alert thanking the user for their donation and showing the points
    alert(`Thank you for donating ${item.name}! You've earned points.`);
  };

  // Handle donation item input and add it to Firestore
  const handleDonate = async () => {
    if (!itemName) {
      alert('Please enter an item name.');
      return;
    }

    const donation = {
      name: itemName  // Donation item name entered by the user
    };

    console.log('Donation being processed:', donation); // Log donation to check if it's correct

    try {
      // Call the donateItem function to add the donation to Firestore
      await donateItem(donation);
      console.log('Donation was successful'); // Log if donation is successful
    } catch (error) {
      console.error('Error processing donation:', error);
    }

    // Clear the input field after donation
    setItemName('');
  };

  return (
    <div>
      <h1>Donation Items</h1>
      {items.map(item => (
        <div key={item.id} className="donation-item">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <button onClick={() => handleDonation(item)}>Donate Now</button>
        </div>
      ))}

      <h1>Donate an Item</h1>
      <div className="donation-form">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item name"
        />
        <button onClick={handleDonate}>Donate</button>
      </div>

      {/* Display user's points and badges */}
      <div>
        <h2>Your Points: {points}</h2>
        <h3>Badges Earned:</h3>
        <ul>
          {badges.length === 0 ? (
            <li>No badges earned yet</li>
          ) : (
            badges.map((badge, index) => <li key={index}>{badge}</li>)
          )}
        </ul>
      </div>
    </div>
  );
};

export default DonationItemPage;
