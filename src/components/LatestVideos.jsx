import React, { useState, useEffect } from 'react';
import latestVideosData from '../assets/data/LatestVideos.json';

const LatestVideos = () => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            // Load the JSON data
            if (!latestVideosData || !Array.isArray(latestVideosData)) {
                throw new Error('Invalid or missing video data');
            }
            setVideos(latestVideosData);

            // Calculate accurate timestamps
            const updatedVideos = latestVideosData.map(item => ({
                ...item,
                timestamp: calculateTimeAgo(new Date(item.date_of_upload))
            }));
            setVideos(updatedVideos);
        } catch (err) {
            setError(err.message);
            console.error('Error loading video data:', err);
        }
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section id="latest-videos">
            <h2>Latest Videos</h2>
            <div className="carousel">
                {videos.length > 0 ? (
                    videos.map((item) => (
                        <article className="card" key={item.id}>
                            <span className="card-badge">Video</span>
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
                    <p>Loading videos...</p>
                )}
            </div>
        </section>
    );
};

export default LatestVideos;