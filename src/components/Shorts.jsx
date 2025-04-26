import React, { useState, useEffect } from 'react';

const Shorts = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const channelId = 'UCnb21AvxsWGqk4dNS2XhiBg'; // Your Channel ID
    const apiKey = 'AIzaSyDILD-zE4QbgomtJ3msre_iIvDHxkCpC5s'; // Replace with your Google API key
    const maxResults = 3; // Number of videos to show

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&key=${apiKey}`
                );
                const data = await response.json();
                if (data.error) throw new Error(data.error.message);

                const videoList = data.items.map(item => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    excerpt: item.snippet.description.substring(0, 100) + (item.snippet.description.length > 100 ? '...' : ''),
                }));
                setVideos(videoList);
            } catch (err) {
                setError('Failed to load videos—check pit lane connection!');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideos();
        const interval = setInterval(fetchVideos, 3600000); // Refresh every hour
        return () => clearInterval(interval);
    }, [channelId, apiKey, maxResults]);

    const openModal = (video) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVideo(null);
    };

    return (
        <section id="shorts" className="shorts-section">
            <h2>Latest F1 Shorts</h2>
            {isLoading ? (
                <div className="loading-message">Checking the pit lane for new shorts...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="carousel">
                    {videos.map((video) => (
                        <div className="card-wrapper" key={video.id} onClick={() => openModal(video)}>
                            <div className="card">
                                <div className="card-video" style={{ backgroundImage: `url(https://img.youtube.com/vi/${video.id}/hqdefault.jpg)` }}></div>
                                <div className="card-content">
                                    <h3 className="card-title">{video.title}</h3>
                                    <p className="card-excerpt">{video.excerpt}</p>
                                    <div className="card-meta">
                                        <span className="timestamp">April 2025</span>
                                        <span className="source">YouTube</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isModalOpen && selectedVideo && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            ×
                        </button>
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title={selectedVideo.title}
                        ></iframe>
                        <h3 className="modal-title">{selectedVideo.title}</h3>
                        <p className="modal-description">{selectedVideo.excerpt}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Shorts;