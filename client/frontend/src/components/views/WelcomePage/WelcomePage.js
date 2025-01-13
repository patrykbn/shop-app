import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './WelcomePage.module.scss';

const WelcomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = '/images/welcome.jpg';
        document.head.appendChild(link);
    }, []);

    const handleClick = () => {
        navigate('/home');
    }

    return (
        <div className={styles.welcomePage}>
            <div className={styles.content}>
                <img 
                    src="/images/welcome.jpg" 
                    alt="Welcome" 
                    className={styles.photo}
                />
                <div className={styles.info}>
                    <h1>Welcome to My Shop!</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className={styles.cta} onClick={handleClick}>
                    Take a look at what I made
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;