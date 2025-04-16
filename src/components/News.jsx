import React, { useState, useEffect } from 'react';
import newsData from '../assets/data/News.json';

const News = () => {
    const [news, setNews] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setNews(newsData);
        const updatedNews = newsData.map(item => ({
            ...item,
            timestamp: calculateTimeAgo(new Date(item.date_of_upload))
        }));
        setNews(updatedNews);
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

    return (
        <section id="news">
            <h2>News</h2>
            <div className="carousel">
                {news.map((item) => (
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
                ))}
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
        </section>
    );
};

export default News;