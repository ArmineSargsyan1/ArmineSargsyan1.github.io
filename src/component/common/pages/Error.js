import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EmptyIcon } from "../../../assets/image/empty.svg";

const Error = ({ statusCode, message, icon }) => {
  return (
    <div className="error">
      <div className="error-page">
        <div className="error-content">
          {icon && <EmptyIcon/>}
          <h1 className="error-code">{statusCode || 'Oops!'}</h1>
          <p className="error-message">{message || 'Something went wrong. Please try again later.'}</p>
          <Link to="/" className="error-link">Go back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
