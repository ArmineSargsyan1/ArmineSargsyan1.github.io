import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EmptyIcon } from "../../../assets/image/empty.svg";

const Error = ({ statusCode, message, icon }) => {
  return (
    <div className="empty-wrapper">
      <div className="empty-page">
        <div className="empty-content">
          {icon && <EmptyIcon/>}
          <h1 className="empty-code">{statusCode || 'Oops!'}</h1>
          <p className="empty-message-desc">{message || 'Something went wrong. Please try again later.'}</p>
          <Link to="/" className="empty-link">Go back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
