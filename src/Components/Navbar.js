import React ,{useState} from 'react'
import { Link , useNavigate } from "react-router-dom";


export default function Navbar() {
    const navigate=useNavigate();
    const handleClickev=async(e)=>{
        e.preventDefault();
        localStorage.removeItem("userEmail");
        navigate('/Login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fw-bold"  to="/">GetRide</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse  d-flex " id="navbarSupportedContent" style={{justifyContent:'space-between'}}>
                        <ul className="navbar-nav mb-2 mb-lg-0 d-flex " style={{alignItems:'center'}}>
                            <li className="nav-item">
                                <Link className="nav-link active Home1 fs-3" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("userEmail"))?
                                <li className="nav-item">
                                    <Link className="nav-link active Home1 btn bg-dark text-light" aria-current="page" to="/MyTrip">My Trips</Link>
                                </li>
                            :""
                            }
                        </ul>
                        {(!localStorage.getItem("userEmail"))?
                            <div className='d-flex'>    
                                <Link className="btn text-white fs-5 mx-2 p-1" style={{background:'#3F51B5'}}   to="/Signup">Signup</Link>
                                <Link className=" btn text-white fs-5 mx-2 p-1" style={{background:'#3F51B5'}}  to="/Login">Login</Link>
                            </div>
                            :
                                <div className='d-flex ' style={{alignItems:'center'}}>
                                    
                                    <p className=" btn mx-2 fs-5 text-danger "  style={{textDecoration:'none',background:'#3F51B5',margin:'0px',padding:'0px'}}  aria-current="page" onClick={handleClickev} >LOG OUT</p>

                                </div>
                        }
                        

                    </div>
                </div>
            </nav>
        </div>
    )
}
