import React from 'react';
import './AccountActivationPage.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const AccountActivationPage = () => {
    return (
        <div className="activation-page">
            <div className="activation-content">
                <h2>החשבון שלך טרם הופעל</h2>
                <p>כדי להשתמש באזור האישי, יש לפנות למנהל להפעלת החשבון.</p>
                <Link to="/" className="not-found-link">
                    <button className="not-found-button">
                    אני רוצה לחזור לדף הבית {'->'}
                    </button>
                </Link>
            </div>
            
        </div>
    );
}

export default AccountActivationPage;
