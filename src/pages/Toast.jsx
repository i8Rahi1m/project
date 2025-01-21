import React, { useEffect } from 'react';
import './Toast.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 2000); // Hide toast after 2 seconds
        return () => clearTimeout(timer); // Cleanup timer
    }, [onClose]);

    return (
        <div className={`toast ${type}`}>
            <div className="toast-icon">
                {type === 'success' && <CheckCircleIcon />}
                {type === 'error' && <ErrorIcon />}
            </div>
            <span>{message}</span>
        </div>
    );
};

export default Toast;
