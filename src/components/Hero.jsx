import React, { useEffect, useRef } from 'react';
import SplashScreen from '/images/splash-screen.mp4';

const Hero = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play().catch(error => {
                console.log('Autoplay failed:', error);
                // Fallback: Optionally show a static image or prompt user to play
            });
        }
    }, []);

    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <h1>Welcome to TheDhruvalGP</h1>
                <p>We bring the wildest F1 chaos—news, predictions, and dunks so sharp no one’s safe. On track or off, we roast, praise, and scream into the void. Buckle up for pure, unfiltered madness.</p>
                <a href="#latest-videos" className="cta">Get Started</a>
            </div>
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="hero-video"
            >
                <source src={SplashScreen} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </section>
    );
};

export default Hero;