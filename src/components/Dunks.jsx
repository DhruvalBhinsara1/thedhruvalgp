import React, { useState, useEffect } from 'react';
import dunksData from '../assets/data/Dunks.json';

const Dunks = () => {
    const [dunks, setDunks] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(4); // Start with 4 items

    useEffect(() => {
        try {
            if (!dunksData || !Array.isArray(dunksData)) {
                throw new Error('Invalid or missing dunk data');
            }
            setDunks(dunksData);

            const updatedDunks = dunksData.map(item => ({
                ...item,
                timestamp: calculateTimeAgo(new Date(item.date_of_upload))
            }));
            setDunks(updatedDunks);
        } catch (err) {
            setError(err.message);
            console.error('Error loading dunk data:', err);
        }
    }, []);

    const calculateTimeAgo = (date) => {
        const now = new Date('2025-04-15T22:42:00-07:00');
        const diffMs = now - date;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `${diffDays}d ago`;
        if (diffHours > 0) return `${diffHours}h ago`;
        if (diffMinutes > 0) return `${diffMinutes}m ago`;
        return `${diffSeconds}s ago`;
    };

    const handleCardClick = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    const handleViewMore = () => {
        setVisibleCount(prevCount => Math.min(prevCount + 4, 16)); // Increase by 4, max 16
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section id="dunks">
            <h2>Dunks</h2>
            <div className="carousel">
                {dunks.length > 0 ? (
                    dunks.slice(0, visibleCount).map((item) => (
                        <article className="card" key={item.id} onClick={() => handleCardClick(item)}>
                            <span className="card-badge">Dunk</span>
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="card-image"
                                onError={(e) => console.error('Image failed to load:', e)}
                            />
                            <div className="card-content">
                                <h3 className="card-title">{item.title}</h3>
                                <p className="card-excerpt">{item.description}</p>
                                <div className="card-meta">
                                    <span className="timestamp">{item.timestamp}</span>
                                    <span className="source">TheDhruvalGP</span>
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <p>Loading dunks...</p>
                )}
            </div>
            {selectedItem && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            ×
                        </button>
                        <img
                            src={selectedItem.thumbnail}
                            alt={selectedItem.title}
                            className="modal-image"
                        />
                        <h3 className="modal-title">{selectedItem.title}</h3>
                        <p className="modal-description">{selectedItem.description}</p>
                        <p className="modal-text">{selectedItem.detailed_description}</p>
                        <div className="modal-meta">
                            <span className="timestamp">{selectedItem.timestamp}</span>
                            <span className="source">TheDhruvalGP</span>
                        </div>
                    </div>
                </div>
            )}
            {visibleCount < 16 && visibleCount < dunks.length && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button
                        onClick={handleViewMore}
                        className="cta view-more"
                    >
                        View more
                    </button>
                </div>
            )}
        </section>
    );
};

export default Dunks;