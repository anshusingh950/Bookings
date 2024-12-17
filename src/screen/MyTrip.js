import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import React, { useEffect, useState } from "react";

export default function MyTrip() {
  const [bookingData, setBookingData] = useState([]); 
  let eml = localStorage.getItem("userEmail"); // Get email from localStorage

  // Function to fetch trip data from API
  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/gettrip", {
        method: "POST", // Use POST request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: eml, // Send email in the body
        }),
      });

      // Parse response
      const data = await response.json();
      
      if (data.success) {
        setBookingData(data.trips); // Set the trips data
      } else {
        console.error("Error fetching trips:", data.error); // Handle error if no trips found
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Handle fetch error
    }
  };

  useEffect(() => {
    loadData(); // Load trip data when the component mounts
  }, []); // Empty dependency array means it runs only once when the component mounts

  // Helper function to extract date and time separately
  const formatDateAndTime = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString(); // Format date (e.g., "12/16/2024")
    const formattedTime = date.toLocaleTimeString(); // Format time (e.g., "5:15:21 AM")
    return { formattedDate, formattedTime };
  };

  return (
    <div>
      <Navbar />

      <h2 style={{ textAlign: "center" ,color:"white"}}>MY TRIPS SO FAR</h2>

      <div className="mx-3 ">
        {bookingData.length > 0 ? (
          <table className="table table-bordered"  >
            <thead >
              <tr style={{color:"white"}}>
                
                <th style={{color:"white"}}>Trip Date</th>
                <th style={{color:"white"}}>Trip Time</th>
                <th style={{color:"white"}}>Source</th>
                <th style={{color:"white"}}>Destination</th>
                <th style={{color:"white"}}> Trip Price</th>
              </tr>
            </thead>
            <tbody style={{color:"white"}}>
              {bookingData.map((booking, index) => {
                const { formattedDate, formattedTime } = formatDateAndTime(booking.createdAt);

                return (
                  <tr key={index}>
                    
                    <td style={{color:"white"}}>{formattedDate}</td> 
                    <td style={{color:"white"}}>{formattedTime}</td> 
                    <td style={{color:"white"}}>{booking.source}</td> 
                    <td style={{color:"white"}}>{booking.destination}</td> 
                    <td style={{color:"white"}}>Rs.{booking.amount.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No trips found</p> 
        )}
      </div>

      <Footer />
    </div>
  );
}
