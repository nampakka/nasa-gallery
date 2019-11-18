import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="nav-wrapper">
            <nav className="nav">
                <ul>
                    <li><Link to="/latestphoto">Latest Photo</Link></li>
                    <li><Link to="/photooftheday">Photo Of The Day</Link></li>
                    <li><Link to="/favoritesphoto">Favorites Photo</Link></li>
                </ul>
            </nav>
        </div>
    )

}

export default NavBar;
