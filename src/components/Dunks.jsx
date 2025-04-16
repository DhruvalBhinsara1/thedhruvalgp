import React from 'react';
import Liam from '/src/assets/images/liam.jpg';
import LandoNoWins from '/src/assets/images/landonowins.jpg';

const Dunks = () => {
    return (
        <section id="dunks">
            <h2>Dunks</h2>
            <div className="carousel">
                <article className="card">
                    <span className="card-badge">Dunk</span>
                    <img src={Liam} alt="Liam Lawson at Racing Bulls" className="card-image" />
                    <div className="card-content">
                        <h3 className="card-title">Liam Humbled Back to Racing Bulls</h3>
                        <p className="card-excerpt">
                            After a very long time with RedBull for 2 weeks Liam is kicked to the Junior Team.😂
                        </p>
                        <div className="card-meta">
                            <span className="timestamp">1h ago</span>
                            <span className="source">TheDhruvalGP</span>
                        </div>
                    </div>
                </article>
                <article className="card">
                    <span className="card-badge">Dunk</span>
                    <img src={LandoNoWins} alt="Lando Norris race" className="card-image" />
                    <div className="card-content">
                        <h3 className="card-title">Lando NoWins Bottles Another</h3>
                        <p className="card-excerpt">
                            Norris fumbles yet another race while his teammate shines. Same car, mate. 😬
                        </p>
                        <div className="card-meta">
                            <span className="timestamp">3h ago</span>
                            <span className="source">TheDhruvalGP</span>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Dunks;