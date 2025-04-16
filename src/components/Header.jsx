import React from 'react';

const Header = ({ isMenuOpen, toggleMenu }) => {
    return (
        <header className="navbar">
            <div className="logo">TheDhruvalGP</div>
            <nav>
                <ul className={isMenuOpen ? 'active' : ''}>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#predictions">Predictions</a></li>
                    <li><a href="#dunks">Dunks</a></li>
                
                </ul>
            </nav>
            <button
                className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                aria-label="Toggle menu"
                onClick={toggleMenu}
            >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
            </button>
            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#predictions">Predictions</a></li>
                    <li><a href="#dunks">Dunks</a></li>
                 
                </ul>
            </div>
        </header>
    );
};

export default Header;