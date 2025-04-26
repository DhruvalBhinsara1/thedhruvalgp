import React, { useState, useEffect } from 'react';

const LiveStream = () => {
    const [isLive, setIsLive] = useState(false);
    const [playClicked, setPlayClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const channelId = 'UCnb21AvxsWGqk4dNS2XhiBg';
    const apiKey = 'AIzaSyDILD-zE4QbgomtJ3msre_iIvDHxkCpC5s'; // Replace with your Google API key
    const embedUrl = `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1`;

    useEffect(() => {
        const checkLiveStatus = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`
                );
                const data = await response.json();
                setIsLive(data.items && data.items.length > 0);
            } catch (error) {
                console.log('Error checking live status:', error);
                setIsLive(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkLiveStatus();
        const interval = setInterval(checkLiveStatus, 60000);
        return () => clearInterval(interval);
    }, [channelId, apiKey]);

    const handlePlayClick = () => {
        setPlayClicked(true);
    };

    return (
        <section className="live-stream-section">
            <h2>Live F1 Action</h2>
            <div className="live-stream-container">
                {isLoading ? (
                    <div className="loading-message">
                        Checking for live stream...
                    </div>
                ) : isLive ? (
                    <>
                        {!playClicked && (
                            <button className="play-button" onClick={handlePlayClick}>
                                Start Live Stream
                            </button>
                        )}
                        {(playClicked || true) && (
                            <iframe
                                src={embedUrl}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Live Stream"
                            ></iframe>
                        )}
                    </>
                ) : (
                    <div className="offline-message">
                        No livestream right now. Check back later for the latest F1 action!
                    </div>
                )}
            </div>
        </section>
    );
};

export default LiveStream;