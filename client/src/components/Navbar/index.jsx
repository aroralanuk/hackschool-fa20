import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

const Navbar = () => {
    return (
        <div id="navbar">
            <div className="title">
                <h1>Pokemon Battle</h1>
            </div>
            <div className="nav-buttons">
                <Link to="/create">Create New Pokemon</Link>
                <Link to="/view">View All Pokemon</Link>
            </div>
        </div>
    );
};

export default Navbar;