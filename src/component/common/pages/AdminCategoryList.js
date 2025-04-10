import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import { fetchCategories } from "../../store/actions/adminCategory";
import Loader from "../Loader";
import Button from "../Button";
import useQuery from "../../../utils/useQuery";
// import AdminMenu from "../common/AdminMenu";

const AdminCategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loadingCategories = useSelector((state) => state.categories.loading);

  const navigate = useNavigate();
  const params = useParams();


  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="admin-container">
      {
        // Categories List
        loadingCategories ? (
          <Loader/>
        ) : (
          <div className="categories-list">

            {categories.map((cat) => (
              <div
                key={cat.id}
                className="category-item"
                onClick={() => navigate(`/admin/category/${cat.id}`, {state: {category: cat}})}
              >
                {cat.name}

                {/*<div className="admin-actions">*/}
                {/*  <Button onClick={() =>  navigate(`/admin/category/${cat.id}`, {state: {category: cat}})} className="admin-button">*/}
                {/*    View Products*/}
                {/*  </Button>*/}
                {/*</div>*/}


              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default AdminCategoryList;
