import React from 'react';
import Ferrari from '../assets/images/ferrari.jpg';
import LandoVsMax from '../assets/images/landovsmax.jpg';

const Predictions = () => {
    return (
        <section id="predictions">
            <h2>Predictions</h2>
            <div className="carousel">
                <article className="card">
                    <span className="card-badge prediction">Prediction</span>
                    <img src={Ferrari} alt="Monaco GP prediction" className="card-image" />
                    <div className="card-content">
                        <h3 className="card-title">Monaco GP Winner</h3>
                        <p className="card-excerpt">Calling it: Leclerc takes the home win. Confidence: ★★★★☆</p>
                        <div className="card-meta">
                            <span className="timestamp">2d ago</span>
                            <span className="source">TheDhruvalGP</span>
                        </div>
                    </div>
                </article>
                <article className="card">
                    <span className="card-badge prediction">Prediction</span>
                    <img src={LandoVsMax} alt="Driver drama prediction" className="card-image" />
                    <div className="card-content">
                        <h3 className="card-title">Driver Drama Incoming</h3>
                        <p className="card-excerpt">Max vs. Lando sparks fly soon. Confidence: ★★★★★</p>
                        <div className="card-meta">
                            <span className="timestamp">1d ago</span>
                            <span className="source">TheDhruvalGP</span>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Predictions;