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
                        Welcome to the pit lane! I’m TheDhruvalGP, your go-to F1 fan for the latest news, bold predictions, and spicy roasts. Got thoughts on ontrack or offtrack drama Drop me a message—I’ll respond faster than a Sauber pit stop!
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
                                <option value="Roast Suggestions">Roast Suggestions</option>
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
                    <p>
                        Follow TheDhruvalGP on{' '}
                        <a
                            href="https://x.com/TheDhruvalGP"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            X
                        </a>{' '}
                        for more F1 action!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;