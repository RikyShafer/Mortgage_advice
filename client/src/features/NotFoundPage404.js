import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage404.css'; // Import your CSS file

const NotFoundPage404 = () => {
    return (
        <div className="not-found-container">
            <div>
                <h2 className="not-found-title">אופס... נראה שהגעת למקום שאנחנו עדיין לא מכירים.</h2>
                <h1 className="not-found-code">404</h1>
                <Link to="/" className="not-found-link">
                    <button className="not-found-button">
                    אני רוצה לחזור לדף הבית {'->'}
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage404;
