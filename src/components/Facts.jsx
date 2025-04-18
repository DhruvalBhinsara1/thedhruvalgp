import React, { useState } from 'react';

const Facts = () => {
    const [visibleCount, setVisibleCount] = useState(4); // Start with 4 items
    const factsData = [
        { id: 1, title: 'Historic', content: 'Monaco’s circuit hasn’t changed since 1929. Same tight corners, same chaos.' },
        { id: 2, title: 'Technical', content: 'F1 cars generate enough downforce to drive upside down on a ceiling.' },
        { id: 3, title: 'Did You Know?', content: 'Schumacher once raced with a broken leg and still podiumed.' },
        { id: 4, title: 'Record', content: 'The youngest F1 driver ever was Max Verstappen at 17 years old.' },
        { id: 5, title: 'Speed', content: 'Top speeds in F1 can exceed 370 km/h during qualifying laps.' },
        { id: 6, title: 'Safety', content: 'Halo device saved multiple drivers, including Romain Grosjean’s life in 2020.' },
        { id: 7, title: 'Longest Race', content: 'The 2011 Canadian GP lasted over 4 hours due to safety car periods.' },
        { id: 8, title: 'Teams', content: 'Only 10 teams compete in F1, but over 20 have tried since 1950.' },
    ];

    const handleViewMore = () => {
        setVisibleCount(prevCount => Math.min(prevCount + 4, 16)); // Increase by 4, max 16
    };

    const handleShowLess = () => {
        setVisibleCount(4); // Reset to initial count
    };

    return (
        <section id="facts">
            <h2>F1 Facts</h2>
            <div className="facts-list">
                {factsData.slice(0, visibleCount).map((item) => (
                    <div className="fact glass" key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                {visibleCount > 4 && (
                    <button
                        onClick={handleShowLess}
                        className="cta view-more"
                        style={{ marginRight: '1rem' }}
                    >
                        Show Less
                    </button>
                )}
                {visibleCount < 16 && visibleCount < factsData.length && (
                    <button
                        onClick={handleViewMore}
                        className="cta view-more"
                    >
                        View More
                    </button>
                )}
            </div>
        </section>
    );
};

export default Facts;