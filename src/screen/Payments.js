import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PayPalButton = () => {

  const location = useLocation();
  const { amount } = location.state || {}; 
  const { location1 } = location.state || {}; 
  const { location2 } = location.state || {}; 

  const [price, setPrice] = useState(amount);

  useEffect(() => {
    if (amount) {
      setPrice(amount/80);
    }
  }, [amount]);



  const [paymentCreated, setPaymentCreated] = useState(false);



  const handleCreatePayment = async () => {
    try {
      console.log(typeof price)
      console.log( price)
      const response = await fetch('http://localhost:5000/my-server/create-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(price),
        }),
      });

      const data = await response.json();
      if (data.approval_url) {
        const currentDate = new Date().toISOString();
        const response = await fetch('http://localhost:5000/api/createtrip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: price*80,email:localStorage.getItem("userEmail"),createdAt: currentDate,  source:location1,destination:location2,
          }),
        });
        

        window.open(data.approval_url, '_blank');

        // window.location.href = data.approval_url; // Redirect user to PayPal for payment approval
      } else {
        console.error('Error creating payment:', data.error);
      }
    } catch (error) {
      console.error('Error with payment creation:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='container mt-5 mb-auto'>
    
      {!paymentCreated ? (
        
        <button style={{
                      position:"relative",
                      left: "35%",
                      height: "39px",
                      width: "18rem",
                      borderRadius:'20px',
                      backgroundColor:"yellow",
                      fontSize:"1.5rem"
                    }} 
                  className="fw-bold" onClick={handleCreatePayment}>Pay with <span style={{color:"blue", fontStyle:"italic"}}>Pay</span><span style={{color:"aqua" ,  fontStyle:"italic"}}>Pal</span></button>
      ) : (
        <p>Payment Successful!</p>
      )}
      </div>
   


    <Footer/>
    </>
  );
};

export default PayPalButton;
