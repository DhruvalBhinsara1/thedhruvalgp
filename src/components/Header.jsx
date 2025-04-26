import React, { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="navbar glass">
            <div className="logo">TheDhruvalGP</div>
            <button className="hamburger" onClick={toggleMenu}>
                <span className="hamburger-icon">☰</span>
            </button>
            <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li><a href="#home" onClick={toggleMenu}>Home</a></li>
                    <li><a href="#latest-videos" onClick={toggleMenu}>Videos</a></li>
                    <li><a href="#news" onClick={toggleMenu}>News</a></li>
                    <li><a href="#predictions" onClick={toggleMenu}>Predictions</a></li>
                    <li><a href="#dunks" onClick={toggleMenu}>Dunks</a></li>
                    <li><a href="#contact" onClick={toggleMenu}>Pits</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;