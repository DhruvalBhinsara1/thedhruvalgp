import React from 'react';

const Header = () => {
    return (
        <header className="navbar glass">
            <nav className="nav-menu">
                <ul>
                    <li>
                        <a href="#home" aria-label="Home">
                            <i className="fas fa-home"></i>
                            <span className="nav-text">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#latest-videos" aria-label="Videos">
                            <i className="fas fa-video"></i>
                            <span className="nav-text">Videos</span>
                        </a>
                    </li>
                    <li>
                        <a href="#news" aria-label="News">
                            <i className="fas fa-newspaper"></i>
                            <span className="nav-text">News</span>
                        </a>
                    </li>
                    <li>
                        <a href="#predictions" aria-label="Predictions">
                            <i className="fas fa-chart-line"></i>
                            <span className="nav-text">Predictions</span>
                        </a>
                    </li>
                    <li>
                        <a href="#dunks" aria-label="Dunks">
                            <i className="fas fa-fire"></i>
                            <span className="nav-text">Dunks</span>
                        </a>
                    </li>
                    <li>
                        <a href="#contact" aria-label="Pits">
                            <i className="fas fa-address-book"></i>
                            <span className="nav-text">Pits</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;