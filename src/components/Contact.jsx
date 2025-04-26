import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Race Predictions',
        priority: 'Practice Lap',
        message: ''
    });
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setError(null);

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill in all required fields.');
            setStatus(null);
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email address.');
            setStatus(null);
            return;
        }

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message.');
            }

            setStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: 'Race Predictions',
                priority: 'Practice Lap',
                message: ''
            });
        } catch (err) {
            setError(err.message || 'Pit stop failed—try again!');
            setStatus(null);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container glass">
                <h2 className="contact-title">Pit Lane Communicator</h2>
                <p className="contact-subtitle">
                    Send a message to TheDhruvalGP—your F1 channel for news, predictions, and roasts!
                </p>
                <div className="contact-form-wrapper glass">
                    <p className="contact-intro">
                        Welcome to the pit lane! I’m TheDhruvalGP, your go-to F1 fan for the latest news, bold predictions, and spicy roasts. Got thoughts on ontrack or offtrack drama? Drop me a message—I’ll respond faster than a Sauber pit stop!
                    </p>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="Race Predictions">Race Predictions</option>
                                <option value="News Feedback">News Feedback</option>
                                <option value="Make A Video">Make A Video</option>
                                <option value="Roast Suggestions">Dunk Suggestions</option>
                                <option value="F1 Chat">F1 Chat</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority" className="form-label">Pit Stop Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="Race Day Urgent">Race Day Urgent</option>
                                <option value="Quali Speed">Quali Speed</option>
                                <option value="Practice Lap">Practice Lap</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="form-input form-textarea"
                                placeholder="Your Message"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="form-button view-more"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? (
                                <span className="button-loading">
                                    <svg
                                        className="spinner"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="spinner-circle"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="spinner-path"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Transmitting...
                                </span>
                            ) : (
                                'Transmit to Race Control'
                            )}
                        </button>
                    </form>
                    {status === 'success' && (
                        <p className="status-success">
                            Message transmitted to race control—awaiting the green light!
                        </p>
                    )}
                    {error && (
                        <p className="status-error">
                            {error}
                        </p>
                    )}
                </div>
                <div className="contact-social">
                    <p>Follow TheDhruvalGP:</p>
                    <div className="social-icons">
                        <a
                            href="https://www.youtube.com/@TheDhruvalGP"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon youtube"
                            aria-label="YouTube"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 0 0-2.122 2.136C0 8.75 0 12 0 12s0 3.25.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.25 24 12 24 12s0-3.25-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                        <a
                            href="https://x.com/TheDhruvalGP"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon x"
                            aria-label="X"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a
                            href="https://github.com/DhruvalBhinsara1" // Replace with your GitHub URL
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon github"
                            aria-label="GitHub"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.334 1.909-1.295 2.747-1.026 2.747-1.026.544 1.377.202 2.394.099 2.647.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.562 4.933.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                        </a>
                        <a
                            href="https://linkedin.com/in/dhruvalbhinsara" // Replace with your LinkedIn URL
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon linkedin"
                            aria-label="LinkedIn"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.784-1.75-1.764s.784-1.764 1.75-1.764 1.75.784 1.75 1.764-.784 1.764-1.75 1.764zM20 19h-3v-5.604c0-1.337-.255-2.453-1.763-2.453-1.502 0-1.737 1.115-1.737 2.267V19h-3V8h3v1.369c.615-1.152 1.605-1.888 3.405-1.888 3.626 0 4.295 2.367 4.295 5.452V19z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;