import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import {Link,json,useNavigate} from "react-router-dom";
import React ,{useState} from 'react'

export default function Signup() {
    let navigate=useNavigate();
    const [credentials,setcredentials]=useState({email:"",password:""}) 
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'

            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const js=await response.json();
        console.log(js)
        if(!js.success){
            alert("Enter Valid Credentials")
        }
        if(js.success){
            localStorage.setItem("userEmail",credentials.email)
            
            navigate("/") 
        }
    }
    const onChange=(ev)=>{
        setcredentials({...credentials,[ev.target.name]:ev.target.value})
    }


    return (
        <div className='logdiv'>
        <Navbar/>
        <div className='container py-5 signform ' style={{width:'50%',marginTop:'3rem',marginBottom:'2.99996rem',color:"white"}}>
            
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fs-3">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name='email'  onChange={onChange} value={credentials.email}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label fs-3">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1 "  name='password'  onChange={onChange} value={credentials.password} />
                    </div>
                    
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/Signup" style={{marginLeft:'10px'}} >Not a user? SignUp</Link>
                </form>

            </div>
            <Footer/>
        </div>
    )
}
