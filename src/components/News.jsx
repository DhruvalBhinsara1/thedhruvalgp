import React, { useState, useEffect } from 'react';
import MercedesImage from '../assets/images/mercedes.jpg';
import newsData from '../assets/data/News.json';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Load the JSON data
        setNews(newsData);

        // Calculate accurate timestamps
        const updatedNews = newsData.map(item => ({
            ...item,
            timestamp: calculateTimeAgo(new Date(item.date_of_upload))
        }));
        setNews(updatedNews);
    }, []);

    // Function to calculate time ago
    const calculateTimeAgo = (date) => {
        const now = new Date('2025-04-15T22:42:00-07:00'); // Current time: April 15, 2025, 10:42 PM PDT
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

    return (
        <section id="news">
            <h2>News</h2>
            <div className="carousel">
                {news.map((item) => (
                    <article className="card" key={item.id}>
                        <span className="card-badge">News</span>
                        <img
                            src={item.img === "../assets/images/mercedes.jpg" ? MercedesImage : item.img}
                            alt={item.title}
                            className="card-image"
                        />
                        <div className="card-content">
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-excerpt">{item.content_text}</p>
                            <div className="card-meta">
                                <span className="timestamp">{item.timestamp}</span>
                                <span className="source">TheDhruvalGP</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default News;