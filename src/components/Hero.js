import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css'; // Import associated styles

// Hero section component
const Hero = ({ navOpen }) => {
  const [currentSlide, setCurrentSlide] = useState(0); // Track current slide

  // Mock data for carousel (replace with admin data later)
  const slides = [
    {
      bgImage: `${process.env.PUBLIC_URL}/event1.png`,
      title: "Experience the Word Anytime, Anywhere",
      description:
        "The Ultimate Worship Session is a Transformative Christian Video that brings together the best of Christian Music, Sermons, and more.",
    },
    {
      bgImage: `${process.env.PUBLIC_URL}/event2.png`,
      title: "Join Our Next Live Event",
      description: "Connect with us live for an inspiring session of faith and community.",
    },
    {
      bgImage: `${process.env.PUBLIC_URL}/event3.png`,
      title: "Discover New Sermons",
      description: "Explore our latest teachings and grow in your spiritual journey.",
    },
  ];

  // Automatic slide transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  // Handle manual slide navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero">
      <div
        className="hero-slide"
        style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
      >
        <div className={`hero-content ${navOpen ? 'nav-open' : ''}`}>
          {/* Zionhill TV frame */}
          <div className="zionhill-frame">
            <span>Zionhill TV</span>
          </div>

          {/* Title */}
          <h1 className="hero-title">{slides[currentSlide].title}</h1>

          {/* Description */}
          <p className="hero-description">{slides[currentSlide].description}</p>

          {/* CTA Button */}
          <Link to="/live/1">
            <button className="hero-cta">Stream Our Service</button>
          </Link>
        </div>

        {/* Carousel controls */}
        <div className="carousel-controls">
          <button className="carousel-prev" onClick={prevSlide}>‹</button>
          <button className="carousel-next" onClick={nextSlide}>›</button>
        </div>

        {/* Pagination dots */}
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;