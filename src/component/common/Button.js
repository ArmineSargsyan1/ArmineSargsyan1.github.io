import React from 'react';
const Button = ({onClick, children, className, type, disabled, loading, loadingText}) => {
  console.log(loadingText)

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`button ${loading ? "loading" : ""} ${className}` }

    >
      {/*{loading ? (loadingText || 'Loading') : children}*/}
      {loading ? (
        <span style={{ color: 'white' }}>{loadingText || 'Loading'}</span>
      ) : (
        children
      )}
    </button>

  );
};


export default Button;
