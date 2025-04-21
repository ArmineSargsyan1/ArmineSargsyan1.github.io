import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {ReactComponent as DownArrow} from "../../../assets/image/sort-down-solid.svg";

import { fetchCategories } from "../../store/actions/adminCategory";
import Loader from "../Loader";


const AdminCategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loadingCategories = useSelector((state) => state.categories.loading);

  const navigate = useNavigate();

  const location = useLocation()


  useEffect(() => {
    dispatch(fetchCategories());
  }, []);


  return (
    <div className="admin-container">
      <h3 className="category-title">
        {location.state ? (
          <>
            Choose Category <DownArrow className="down-arrow"/>
          </>
        ) : (
          "View Products"
        )}

      </h3>
      {
        loadingCategories ? (
          <Loader height="60" width="100%" count="10" className="categories-list"/>

        ) : (
            <div className="categories-list">

              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="category-item"
                  onClick={() =>
                    location.state
                      ?
                      navigate(`/admin/category/${cat.id}`, {state: {categoryId: cat.id}})
                      : navigate(`/admin/category/${cat.id}`)
                  }
                >
                  {cat.name}

                </div>
              ))}
            </div>

        )}
    </div>
  );
};

export default AdminCategoryList;
