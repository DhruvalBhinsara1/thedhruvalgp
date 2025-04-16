import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import News from './components/News';
import Predictions from './components/Predictions';
import Dunks from './components/Dunks';
import Facts from './components/Facts';
import Footer from './components/Footer';
import LatestVideos from './components/LatestVideos'; // Added this import

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const menuToggle = document.querySelector('.menu-toggle');
      const navMenu = document.querySelector('.nav-menu');
      if (
        isMenuOpen &&
        !menuToggle.contains(event.target) &&
        !navMenu.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isMenuOpen]);

  useEffect(() => {
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '0px 0px 100px 0px' }
    );

    images.forEach((img) => observer.observe(img));
  }, []);

  return (
    <div className="app">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Hero />
      <LatestVideos />
      <News />
      <Predictions />
      <Dunks />
      <Facts />
      <Footer />
    </div>
  );
};

export default App;