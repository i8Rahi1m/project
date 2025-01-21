import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './home.css'; // Optional: for any custom styles

const Player = () => {
    const { id } = useParams(); // Get the movie ID from the URL
    const [videoUrl, setVideoUrl] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Movies/', { params: { id } });
                setVideoUrl(response.data[0].video);
                setPosterUrl(response.data[0].poster);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchVideoUrl();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!videoUrl) return <div>No video found</div>;

    return (
        <div style={{width: '100%'}} className="player-container">
            <video width="100%" height="100%" controls poster={posterUrl}>
                <source src={videoUrl} type="video/mp4" />
            </video>
        </div>
    );
};

export default Player;
