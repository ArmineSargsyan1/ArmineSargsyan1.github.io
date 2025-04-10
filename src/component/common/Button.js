import React from 'react';
const Button = ({onClick, children, className, type, disabled, loading}) => {

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`button ${loading ? "loading" : ""} ${className}` }

    >
      {loading ? 'Loading' : children}
    </button>

  );
};


export default Button;
