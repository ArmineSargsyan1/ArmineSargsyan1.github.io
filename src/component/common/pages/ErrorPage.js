import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h2 className="error-code">404</h2>
        <h2 className="error-title">Oops! Page Not Found</h2>

        <p className="error-description">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="back-home-btn">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
