import React from 'react';
import MercedesImage from '../assets/images/mercedes.jpg';
//import MercedesImage from '../assets/images/mercedes.jpg';
const News = () => {
    return (
        <section id="news">
            <h2>News</h2>
            <div className="carousel">
                <article className="card">
                    <span className="card-badge">News</span>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGBKLQlA9M9Xrgz3bg8hoL-633MIUxUoH6Q7sj_TkEef8rHg67GfeTznYZl_nYbUIt0c&usqp=CAU"
                        alt="Ferrari strategy blunder"
                        className="card-image"
                    />
                    <div className="card-content">
                        <h3 className="card-title">Ferrari’s Latest Strategy Blunder</h3>
                        <p className="card-excerpt">
                            Another race, another questionable call. Ferrari’s pit wall flops again. 😑
                        </p>
                        <div className="card-meta">
                            <span className="timestamp">4h ago</span>
                            <span className="source">TheDhruvalGP</span>
                        </div>
                    </div>
                </article>
                <article className="card">
                    <span className="card-badge">News</span>
                    <img src={MercedesImage} alt="Mercedes comeback" className="card-image" />
                    <div className="card-content">
                        <h3 className="card-title">Mercedes’ Comeback?</h3>
                        <p className="card-excerpt">Silver Arrows show pace, but is it real or just a mirage? 🤔</p>
                        <div className="card-meta">
                            <span className="timestamp">6h ago</span>
                            <span className="source">TheDhruvalGP</span>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default News;