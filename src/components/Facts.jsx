import React from 'react';

const Facts = () => {
    return (
        <section id="facts">
            <h2>F1 Facts</h2>
            <div className="facts-list">
                <div className="fact glass">
                    <h3>Historic</h3>
                    <p>Monaco’s circuit hasn’t changed since 1929. Same tight corners, same chaos.</p>
                </div>
                <div className="fact glass">
                    <h3>Technical</h3>
                    <p>F1 cars generate enough downforce to drive upside down on a ceiling.</p>
                </div>
                <div className="fact glass">
                    <h3>Did You Know?</h3>
                    <p>Schumacher once raced with a broken leg and still podiumed.</p>
                </div>
            </div>
        </section>
    );
};

export default Facts;