import React from 'react';

const Header = () => {
    return (
        <header className="navbar glass">
            <div className="logo">TheDhruvalGP</div>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#latest-videos">Videos</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#predictions">Predictions</a></li>
                    <li><a href="#dunks">Dunks</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;