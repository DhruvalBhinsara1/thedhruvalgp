import React from 'react';
import SplashScreen from '/src/assets/images/splash-screen.mp4';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <h1>Welcome to TheDhruvalGP</h1>
                <p>We bring the wildest F1 chaos—news, predictions, and dunks so sharp no one’s safe. On track or off, we roast, praise, and scream into the void. Buckle up for pure, unfiltered madness.</p>
                <a href="#news" className="cta">Get Started</a>
            </div>
            <video autoPlay muted loop className="hero-video">
                <source src={SplashScreen} type="video/mp4" />
            </video>
        </section>
    );
};

export default Hero;