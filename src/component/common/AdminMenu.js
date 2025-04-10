import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.pathname.split('/')[2];

  const isActive = (path) => result === path;

  return (
    <div className="admin__navbar">
      <button
        onClick={() => navigate('/admin/category', { replace: true })}
        className={`admin__nav-link ${isActive('category') ? 'active' : ''}`}
      >
        Category
      </button>

      <button
        onClick={() => navigate('/admin/product', { replace: true })}
        className={`admin__nav-link ${isActive('product') ? 'active' : ''}`}
      >
        Product
      </button>


    </div>
  );
};

export default AdminMenu;
