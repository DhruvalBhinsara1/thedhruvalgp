import React, { useState, useEffect } from 'react';
import latestVideosData from '../assets/data/LatestVideos.json';

const LatestVideos = () => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(4); // Start with 4 videos

    useEffect(() => {
        try {
            console.log('Imported latestVideosData:', latestVideosData);
            if (!Array.isArray(latestVideosData)) {
                throw new Error('Invalid or missing video data');
            }
            const updatedVideos = [...latestVideosData].sort((a, b) => {
                const aId = typeof a.id === 'string' ? parseInt(a.id) : a.id;
                const bId = typeof b.id === 'string' ? parseInt(b.id) : b.id;
                return bId - aId; // Descending order
            }).map(item => {
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

    const getYouTubeThumbnail = (videoId) => {
        const highQualityUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const mediumQualityUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        return highQualityUrl;
    };

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
        <section id="latest-videos">
            <h2>Latest Videos</h2>
            <p className="disclaimer">Not all videos were created by me. Credit goes to the respective owners and creators.</p>
            <div className="carousel">
                {videos.length > 0 ? (
                    videos.slice(0, visibleCount).map((item) => (
                        <div className="card-wrapper" key={item.id}>
                            <a
                                href={item.video_url}
                                target="_blank"
                                rel="noopener noreferrer"
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
                        </div>
                    ))
                ) : (
                    <p>Loading videos...</p>
                )}
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
                {visibleCount < 16 && visibleCount < videos.length && (
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

export default LatestVideos;