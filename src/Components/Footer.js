import React from 'react'
import { Link } from "react-router-dom";


export default function Footer() {
    return (
    
        <div className='bg-light  bottoms' >
            <div className="container" >
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <p className="col-md-4 mb-0 text-muted">© 2023 Company, Inc</p>

    

    <ul className="nav col-md-4 justify-content-end">
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Features</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Pricing</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">FAQs</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">About</Link></li>
    </ul>
  </footer>

</div>
        </div>
    )
}
