import React, { useState, useEffect } from 'react';
import newsData from '../assets/data/News.json';

const News = () => {
    const [news, setNews] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(4); // Start with 4 items

    useEffect(() => {
        try {
            if (!newsData || !Array.isArray(newsData)) {
                throw new Error('Invalid or missing news data');
            }
            const updatedNews = [...newsData].sort((a, b) => {
                const aId = typeof a.id === 'string' ? parseInt(a.id) : a.id;
                const bId = typeof b.id === 'string' ? parseInt(b.id) : b.id;
                return bId - aId; // Descending order
            }).map(item => ({
                ...item,
                timestamp: calculateTimeAgo(new Date(item.date_of_upload))
            }));
            setNews(updatedNews);

            // Update timestamps every minute for dynamic "time ago"
            const interval = setInterval(() => {
                const refreshedNews = [...newsData].sort((a, b) => {
                    const aId = typeof a.id === 'string' ? parseInt(a.id) : a.id;
                    const bId = typeof b.id === 'string' ? parseInt(b.id) : b.id;
                    return bId - aId; // Descending order
                }).map(item => ({
                    ...item,
                    timestamp: calculateTimeAgo(new Date(item.date_of_upload))
                }));
                setNews(refreshedNews);
            }, 60000); // Update every 60 seconds

            return () => clearInterval(interval); // Cleanup on unmount
        } catch (err) {
            setError(err.message);
            console.error('Error loading news data:', err);
        }
    }, []);

    const calculateTimeAgo = (date) => {
        const now = new Date(); // Use current time
        const diffMs = now - date;
        const diffSeconds = Math.floor(Math.abs(diffMs) / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        // Handle future dates or very recent times
        if (diffMs < 0 || diffSeconds < 10) return 'just now';
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

    const handleShowLess = () => {
        setVisibleCount(4); // Reset to initial count
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section id="news">
            <h2>News</h2>
            <div className="carousel">
                {news.length > 0 ? (
                    news.slice(0, visibleCount).map((item) => (
                        <article className="card" key={item.id} onClick={() => handleCardClick(item)}>
                            <span className="card-badge">News</span>
                            <img
                                src={item.img}
                                alt={item.title}
                                className="card-image"
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
                    <p>Loading news...</p>
                )}
            </div>
            {selectedItem && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            ×
                        </button>
                        <img
                            src={selectedItem.img}
                            alt={selectedItem.title}
                            className="modal-image"
                        />
                        <h3 className="modal-title">{selectedItem.title}</h3>
                        <p className="modal-description">{selectedItem.description}</p>
                        <p className="modal-text">{selectedItem.detailed_news}</p>
                        <div className="modal-meta">
                            <span className="timestamp">{selectedItem.timestamp}</span>
                            <span className="source">TheDhruvalGP</span>
                        </div>
                    </div>
                </div>
            )}
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
                {visibleCount < 16 && visibleCount < news.length && (
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

export default News;