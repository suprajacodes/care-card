import React, { useState } from 'react';
import { donateItem } from './DonationService';  // Import the donateItem function
import firebase from 'firebase/app'; 

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

  // Handle donation of predefined items
  const handleDonation = (item) => {
    console.log('Donation button clicked for item:', item);  // Log item for debugging

    // Update points based on donation (here adding 10 points for each donation)
    setPoints(prevPoints => {
      const newPoints = prevPoints + item.price;

      // Check if points reach a threshold and award badges
      if (newPoints >= 50 && !badges.includes('Super Donor')) {
        setBadges(prevBadges => [...prevBadges, 'Super Donor']); // Award 'Super Donor' badge if points >= 50
      }

      // You can add more badges here for different thresholds, e.g., 100 points = 'Mega Donor'
      return newPoints;
    });

    // Alert thanking the user for their donation and showing the points
    alert(`Thank you for donating ${item.name}! You've earned ${item.price} points.`);
  };

  // Handle donation item input and add it to Firestore
  const handleDonate = async () => {
    console.log('Donate button clicked');
  
    // Check if item name is provided
    if (!itemName) {
      alert('Please enter an item name.');
      return;
    }

    const donation = {
      name: itemName
    };

    console.log('Processing donation:', donation);

    // Simulating donation and updating points
    try {
      // Call the donateItem function to add the donation to Firestore
      await donateItem(donation);
      console.log('Donation processed successfully');

      // Simulate point increment (add 10 points for each donation)
      setPoints((prevPoints) => {
        const newPoints = prevPoints + 3;

        // Check if the points reach a threshold and award a badge
        if (newPoints >= 50 && !badges.includes('Super Donor')) {
          setBadges((prevBadges) => [...prevBadges, 'Super Donor']);
        }

        return newPoints;
      });

      // Clear the item name input
      setItemName('');
      alert('Thank you for donating!');
      
    } catch (error) {
      console.error('Error in donation process:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Donation Items</h1>
        <div className="donation-items-container">
        {items.map(item => (
            <div key={item.id} className="donation-item">
            <div className="donation-item-inner">
                {/* Front of the card */}
                <div className="donation-item-front">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                </div>
                
                {/* Back of the card */}
                <div className="donation-item-back">
                <button onClick={() => handleDonation(item)}>Donate Now</button>
                </div>
            </div>
            </div>
        ))}
        </div>


      
      <h1>Donate a Custom Item</h1>
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
        <div className="donation-info">
        <h2>Your Points: {points}</h2>
        <h3>Badges Earned:</h3>
        <div className="badges-container">
            <ul>
            {badges.length === 0 ? (
                <li className="no-badges">No badges earned yet</li>
            ) : (
                
                <li >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.5 7h7l-6 4.5 2.5 7-6-4.5-6 4.5 2.5-7-6-4.5h7z"/></svg>
                    <span className="badge-text">Super Donar</span>
                </li>
                
            )}
            </ul>
        </div>
        </div>

    </div>
  );
};
//
export default DonationItemPage;
