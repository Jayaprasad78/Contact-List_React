import React from 'react';
import { Link } from 'react-router-dom';
import "../index.css";

// Navbar component with a link to the 'Contacts' page
const Navbar = () => {
    return (
        <nav className='navbar'>
            {/* Link to the 'Contacts' page */}
            <Link style={{ color: "white" }} to='/contact-list'>Contacts</Link>
        </nav>
    );
}

export default Navbar;
