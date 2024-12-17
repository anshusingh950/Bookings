
import React, { useState, useEffect } from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { Link, useNavigate } from "react-router-dom";

export default function Home() {

  const loadImage = async () => {
    let dt = await fetch("https://api.unsplash.com/photos/random?query=traffic&client_id=gtzP7j8eF4dJoqAXHL_-czHJewrC_geHKTL7z2973zA&count=3", {
      method: "GET",
      headers: {
        "Content-Type": 'application/json'
      },
      mode: 'cors'
    });
    let pt = await dt.json();
    setImageurl(prevState => {
      const updatedImageUrl = [...prevState];
      updatedImageUrl[0] = pt[0].urls.full;
      updatedImageUrl[1] = pt[1].urls.full;
      updatedImageUrl[2] = pt[2].urls.full;
      return updatedImageUrl;
    });
  }

  let navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [loc, setLocation] = useState({
    location: [
      { "latitude": "95.23", "longitude": "32.42", "name": "HSR" },
      { "latitude": 96.34, "longitude": 34.65, "name": "Kormangla" },
      { "latitude": 96.1, "longitude": 34.68, "name": "Marathahalli" },
      { "latitude": 95.36, "longitude": 33.66, "name": "Whitefield" },
      { "latitude": 95.98, "longitude": 33.71, "name": "Brookefield" },
      { "latitude": 93.34, "longitude": 32.46, "name": "KR PURAM" },
      { "latitude": 95.56, "longitude": 33.67, "name": "Hosur" },
      { "latitude": 96.73, "longitude": 34.86, "name": "BTM Layout" },
      { "latitude": 96.33, "longitude": 34.97, "name": "Electronic City" },
      { "latitude": 95.76, "longitude": 33.95, "name": "SMVT Bangalore" },
      { "latitude": 95.76, "longitude": 33.23, "name": "KSR Bangalore" },
      { "latitude": 94.23, "longitude": 45.23, "name": "Kempagowdan Bus Stand" }
    ]
  });
  const [selectedLocation1, setSelectedLocation1] = useState(null);
  const [selectedLocation2, setSelectedLocation2] = useState(null);
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);
  const [imageurl, setImageurl] = useState(["https://images.unsplash.com/photo-1456082902841-3335005c3082?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2ODY5OTV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzQzMzk4MDB8&ixlib=rb-4.0.3&q=85", "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2ODY5OTV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzQzMzk4MDB8&ixlib=rb-4.0.3&q=85", "https://images.unsplash.com/photo-1474128710184-2a547ec84777?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2ODY5OTV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzQzMzk4MDB8&ixlib=rb-4.0.3&q=85"]);

  const loadData = async () => {
    let dt = await fetch("http://localhost:5000/api/getlocation", {
      method: "GET",
      headers: {
        "Content-Type": 'application/json'
      },
      mode: 'cors'
    });
    let pt = await dt.json();
    setLocation(pt);
  }

  useEffect(() => {
    loadData();
    loadImage();
  }, []);

  const handleOnChange = (ev) => {
    setSearch(ev.target.value);
  }

  // Calculate price based on vehicle and time
  const calculatePrice = () => {
    let basePrice = 15 + distance * 5;
    let vehicleMultiplier = 1;
    let currentTime = new Date().getHours(); // Get the current hour (24-hour format)

    // Adjust price based on vehicle type
    const vehicleType = document.getElementById("form-select").value; // Get selected vehicle
    if (vehicleType === "Book Auto") {
      vehicleMultiplier = 1.8;
    } else if (vehicleType === "Book MINI") {
      vehicleMultiplier = 2.7;
    } else if (vehicleType === "Book SUV") {
      vehicleMultiplier = 3.2;
    } else if (vehicleType === "Book SEDAN") {
      vehicleMultiplier = 4.5;
    }

    if ((currentTime >= 18 && currentTime <= 21) || (currentTime >= 0 && currentTime < 4)) {
   
    }

    let p = (basePrice * vehicleMultiplier) ;
    setPrice(p);

    // Update price display
    document.getElementById("price").innerHTML = price;

    return price;
  };

  // Handle button click to calculate distance
  const handleCalculateDistance = () => {
    if (selectedLocation1 && selectedLocation2) {
      const location1 = loc.location.find(loc => loc.name === selectedLocation1);
      const location2 = loc.location.find(loc => loc.name === selectedLocation2);

      if (location1 && location2) {
        const distance = getDistanceFromLatLonInKm(
          location1.latitude,
          location1.longitude,
          location2.latitude,
          location2.longitude
        );
        setDistance(distance);
      }
    }
  };

  // Function to calculate distance between two latitudes/longitudes
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  // Convert degrees to radians
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const bookRide = () => {
    if (selectedLocation1 && selectedLocation2) {
      // Pass location1 and location2 along with the price to the next page
      navigate("/Payments", { 
        state: { 
          amount: price,
          location1: selectedLocation1,
          location2: selectedLocation2
        } 
      });
    } else {
      alert("Please select both source and destination locations.");
    }
  }; 

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleControls" className="carousel slide mb-3" data-bs-ride="carousel" style={{ minHeight: '350px', maxHeight: '370px', objectFit: 'cover !important' }}>
          <div className="carousel-inner" style={{ maxHeight: '370px' }}>
            <div className="carousel-item active">
              <img src={imageurl[0]} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={imageurl[1]} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={imageurl[2]} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        <select className="form-select" aria-label="Select first location" onChange={(e) => setSelectedLocation1(e.target.value)}>
          <option value="">Select Source</option>
          {loc.location.map((item, index) => (
            <option key={index} value={item.name}>{item.name}</option>
          ))}
        </select>

        <select className="form-select" aria-label="Select second location" onChange={(e) => setSelectedLocation2(e.target.value)}>
          <option value="">Select Destination</option>
          {loc.location.map((item, index) => (
            <option key={index} value={item.name}>{item.name}</option>
          ))}
        </select>

        <select className="form-select" id="form-select" aria-label="Default select example">
          <option>Book Bike</option>
          <option>Book Auto</option>
          <option>Book MINI</option>
          <option>Book SUV</option>
          <option>Book SEDAN</option>
        </select>
      </div>

      <div className="my-3 ml-1" style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleCalculateDistance} style={{ padding: ".5rem", fontWeight: "bolder", borderRadius: "20px", backgroundColor: "black", color: "#f4fb1b" }}>Get Distance</button>
      </div>
      <h2 style={{ textAlign: "center", color: "#ffffff" }}>Distance to be travelled is: {distance.toFixed(2)} KM</h2>
      <div className="my-3 ml-1" style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={calculatePrice} style={{ padding: ".5rem", fontWeight: "bolder", borderRadius: "20px", backgroundColor: "black", color: "#f4fb1b" }}> Get Price</button>
      </div>
      <h2 style={{ textAlign: "center", color: "#ffffff" }}>Your Price is :Rs. <span id="price">{price}</span></h2>

      <div className="my-3 ml-1" style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={bookRide} style={{ padding: ".5rem", fontWeight: "bolder", borderRadius: "20px", backgroundColor: "black", color: "#f4fb1b" }}>Book Your Ride</button>
      </div>

      <Footer />
    </div>
  );
}

















// import React, { useState, useEffect } from 'react'
// import Navbar from "../Components/Navbar"
// import Footer from "../Components/Footer"
// import {Link,json,useNavigate} from "react-router-dom";

// export default function Home() {


//   const loadImage = async () => {
//     let dt = await fetch("https://api.unsplash.com/photos/random?query=traffic&client_id=gtzP7j8eF4dJoqAXHL_-czHJewrC_geHKTL7z2973zA&count=3", {
//         method: "GET",
//         headers: {
//             "Content-Type": 'application/json'
//         },
//         mode: 'cors'
//     });
//     let pt = await dt.json();
//     setImageurl(prevState => {
//       const updatedImageUrl = [...prevState];
//       updatedImageUrl[0] = pt[0].urls.full;
//       updatedImageUrl[1] = pt[1].urls.full; 
//       updatedImageUrl[2] = pt[2].urls.full; 
//       return updatedImageUrl; 
//     });
    
    
    
// }

//   let navigate=useNavigate()
//     const [search,setSearch]=useState('')
//     const art1 = [
//         {
//             "_id": "651af362813ebbfd37a60960",
//             "CategoryName": "Pizza",
//             "name": "Mix Veg Pizza",
//             "img": "https://media.istockphoto.com/photos/chinese-food-veg-pizza-picture-id1341905237?k=20&m=1341905237&s=612x612&w=0&h=Lbuza1Ig5cC1PwQhqTsq-Uac8hg1W-V0Wx4d4lqDeB0=",
//             "options": [
//                 {
//                     "half": "100",
//                     "medium": "200",
//                     "full": "300"
//                 }
//             ],
//             "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
//         },

//     ]
//     const [loc, setLocation] = useState({
//         "location": [
//           {
//             "latitude": "95.23",
//             "longitude": "32.42",
//             "name": "HSR"
//           },
//           {
//             "latitude": 96.34,
//             "longitude": 34.65,
//             "name": "Kormangla"
//           },
//           {
//             "latitude": 96.1,
//             "longitude": 34.68,
//             "name": "Marathahalli"
//           },
//           {
//             "latitude": 95.36,
//             "longitude": 33.66,
//             "name": "Whitefield"
//           },
//           {
//             "latitude": 95.98,
//             "longitude": 33.71,
//             "name": "Brookefield"
//           },
//           {
//             "latitude": 93.34,
//             "longitude": 32.46,
//             "name": "KR PURAM"
//           },
//           {
//             "latitude": 95.56,
//             "longitude": 33.67,
//             "name": "Hosur"
//           },
//           {
//             "latitude": 96.73,
//             "longitude": 34.86,
//             "name": "BTM Layout"
//           },
//           {
//             "latitude": 96.33,
//             "longitude": 34.97,
//             "name": "Electronic City"
//           },
//           {
//             "latitude": 95.76,
//             "longitude": 33.95,
//             "name": "SMVT Bangalore"
//           },
//           {
//             "latitude": 95.76,
//             "longitude": 33.23,
//             "name": "KSR Bangalore"
//           },
//           {
//             "latitude": 94.23,
//             "longitude": 45.23,
//             "name": "Kempagowdan Bus Stand"
//           }
//         ]
//       });
//     const [selectedLocation1, setSelectedLocation1] = useState(null);
//     const [selectedLocation2, setSelectedLocation2] = useState(null);
//     const [distance, setDistance] = useState(0);
//     const [price, setPrice] = useState(0);
//     const [imageurl, setImageurl] = useState(["https://images.unsplash.com/photo-1456082902841-3335005c3082?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2ODY5OTV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzQzMzk4MDB8&ixlib=rb-4.0.3&q=85","https://images.unsplash.com/photo-1516733968668-dbdce39c4651?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2ODY5OTV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzQzMzk4MDB8&ixlib=rb-4.0.3&q=85","https://images.unsplash.com/photo-1474128710184-2a547ec84777?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2ODY5OTV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzQzMzk4MDB8&ixlib=rb-4.0.3&q=85"]);

//     const bookRide=()=>{
//       navigate("/Payments", { state: { amount: price } });
     
//     }
//     const calculatePrice=()=>{
//       let p=15+distance*5;
//       p=parseInt(p)/80
//       setPrice(p)
//       console.log(price)
//       document.getElementById("price").innerHTML=price*80
//         return price 
//     }

//     const loadData = async () => {
//         let dt = await fetch("http://localhost:5000/api/getlocation", {
//             method: "GET",
//             headers: {
//                 "Content-Type": 'application/json'
//             },
//             mode: 'cors'
//         });
//         let pt = await dt.json();
//         setLocation(pt);
//         console.log(loc);
//     }
//     useEffect(() => {
//         loadData();
//         loadImage();
//     }, [])
//     const handleOnChange=(ev)=>{
//         setSearch(ev.target.value);
//     }
//     function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//         const R = 6371; // Radius of the earth in km
//         const dLat = deg2rad(lat2 - lat1); // deg2rad below
//         const dLon = deg2rad(lon2 - lon1);
//         const a =
//           Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//           Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//           Math.sin(dLon / 2) * Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const d = R * c; // Distance in km
//         return d;
//       }
    
//       // Convert degrees to radians
//       function deg2rad(deg) {
//         return deg * (Math.PI / 180);
//       }
    
//       // Handle button click to calculate distance
//       const handleCalculateDistance = () => {
//         if (selectedLocation1 && selectedLocation2) {
//           const location1 = loc.location.find(loc => loc.name === selectedLocation1);
//           const location2 = loc.location.find(loc => loc.name === selectedLocation2);
    
//           if (location1 && location2) {
//             const distance = getDistanceFromLatLonInKm(
//               location1.latitude,
//               location1.longitude,
//               location2.latitude,
//               location2.longitude
//             );
//             setDistance(distance);
//           }
//         }
//       };

    


//     return (
//         <div>
//             <Navbar />
//             <div>
//                 <div id="carouselExampleControls" className="carousel slide mb-3" data-bs-ride="carousel" style={{minHeight:'350px',maxHeight:'370px' ,objectFit:'cover !important'}}>
//                     <div className="carousel-inner"  style={{maxHeight:'370px'}}>
//                         <div className="carousel-item active">
//                             <img src={imageurl[0]} className="d-block w-100" alt="..."  />
//                         </div>
//                         <div className="carousel-item">
//                             <img src={imageurl[1]} className="d-block w-100" alt="..." />
//                         </div>
//                         <div className="carousel-item">
//                             <img src={imageurl[2]} className="d-block w-100" alt="..." />
//                         </div>
//                     </div>
                   
//                     <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//                         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                         <span className="visually-hidden">Previous</span>
//                     </button>
//                     <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//                         <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                         <span className="visually-hidden">Next</span>
//                     </button>
//                 </div>
//             </div>
//             <div className="container">

           


// <select
//         className="form-select"
//         aria-label="Select first location"
//         onChange={(e) => setSelectedLocation1(e.target.value)}
//       >
//         <option value="">Select Source</option>
//         {loc.location.map((item, index) => (
//           <option key={index} value={item.name}>
//             {item.name}
//           </option>
//         ))}
//       </select>

//       <select
//         className="form-select"
//         aria-label="Select second location"
//         onChange={(e) => setSelectedLocation2(e.target.value)}
//       >
//         <option value="">Select Destination</option>
//         {loc.location.map((item, index) => (
//           <option key={index} value={item.name}>
//             {item.name}
//           </option>
//         ))}
//       </select>




            
//             <select className="form-select" aria-label="Default select example">
//                     <option>Book Bike</option>
//                     <option>Book Auto</option>
//                     <option>Book MINI</option>
//                     <option>Book SUV</option>
//                     <option>Book SEDAN</option> 
//             </select>

//             </div>
//             <div className='my-3 ml-1'  style={{display:"flex",justifyContent:"center"}}>
//             <button onClick={handleCalculateDistance} style={{padding:".5rem",fontWeight:"bolder",borderRadius:"20px",backgroundColor:"black",color:"#f4fb1b"}}>Get Distance</button>
//             </div>
//             <h2 style={{textAlign:"center",color:"#ffffff"}}>Distance to be travelled is: {distance.toFixed(2)} KM</h2>
//             <div className='my-3 ml-1'  style={{display:"flex",justifyContent:"center"}}>
//             <button onClick={calculatePrice} style={{padding:".5rem",fontWeight:"bolder",borderRadius:"20px",backgroundColor:"black",color:"#f4fb1b"}}> Get Price</button>
//             </div>
//             <h2 style={{textAlign:"center" ,color:"#ffffff"}}>Your Price is :Rs. <span id="price"  > {price}</span></h2>


//             <div className='my-3 ml-1'  style={{display:"flex",justifyContent:"center"}}>
//             <button  onClick={bookRide} style={{padding:".5rem",fontWeight:"bolder",borderRadius:"20px",backgroundColor:"black",color:"#f4fb1b"}}>Book Your Ride</button>
//             </div>

//             <Footer />
//         </div>
//     )
// }
