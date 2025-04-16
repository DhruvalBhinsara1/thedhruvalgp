import React, { useState, useEffect } from 'react';
import latestVideosData from '../assets/data/LatestVideos.json';

const LatestVideos = () => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            console.log('Imported latestVideosData:', latestVideosData);
            if (!latestVideosData || !Array.isArray(latestVideosData)) {
                throw new Error('Invalid or missing video data');
            }
            setVideos(latestVideosData);

            const updatedVideos = latestVideosData.map(item => {
                const videoId = extractVideoId(item.video_url);
                return {
                    ...item,
                    thumbnail: videoId ? getYouTubeThumbnail(videoId) : item.thumbnail,
                    timestamp: calculateTimeAgo(new Date(item.date_of_upload))
                };
            });
            setVideos(updatedVideos);
        } catch (err) {
            setError(err.message);
            console.error('Error loading video data:', err);
        }
    }, []);

    // Function to extract YouTube video ID from URL
    const extractVideoId = (url) => {
        try {
            const urlObj = new URL(url);
            const videoId = urlObj.searchParams.get('v');
            return videoId || null;
        } catch (e) {
            console.error('Invalid URL format:', url, e);
            return null;
        }
    };

    // Function to get the best available YouTube thumbnail
    const getYouTubeThumbnail = (videoId) => {
        const highQualityUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const mediumQualityUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        return highQualityUrl;
    };

    // Function to calculate time ago
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section id="latest-videos">
            <h2>Latest Videos</h2>
            <p className="disclaimer">Not all videos were created by me. Credit goes to the respective owners and creators.</p>
            <div className="carousel">
                {videos.length > 0 ? (
                    videos.map((item) => (
                        <a
                            href={item.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={item.id}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <article className="card">
                                <span className="card-badge">Video</span>
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="card-image"
                                    onError={(e) => {
                                        console.error('High-quality thumbnail failed for:', item.title, e);
                                        e.target.src = `https://img.youtube.com/vi/${extractVideoId(item.video_url)}/mqdefault.jpg`;
                                        e.target.onError = null;
                                    }}
                                />
                                <div className="card-content">
                                    <h3 className="card-title">{item.title}</h3>
                                    <p className="card-excerpt">{item.description}</p>
                                    <div className="card-meta">
                                        <span className="timestamp">{item.timestamp}</span>
                                        <span className="source">{item.channel}</span>
                                    </div>
                                </div>
                            </article>
                        </a>
                    ))
                ) : (
                    <p>Loading videos...</p>
                )}
            </div>
        </section>
    );
};

export default LatestVideos;