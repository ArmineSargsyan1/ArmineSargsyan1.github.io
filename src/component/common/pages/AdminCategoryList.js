import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {ReactComponent as DownArrow} from "../../../assets/image/sort-down-solid.svg";

import {fetchCategories} from "../../store/actions/adminCategory";
import Loader from "../Loader";
import {setModalInfo} from "../../store/actions/adminProduct";


const AdminCategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loadingCategories = useSelector((state) => state.categories.loading);

  const navigate = useNavigate();

  const location = useLocation()


  useEffect(() => {
    dispatch(fetchCategories());
  }, []);


  const handleCategoryClick = (id) => {
    if (location.state) {
      dispatch(
        setModalInfo({
          name: "",
          size: "",
          price: "",
          description: "",
          brandName: "",
          categoryId: id,
          quantity: "",
          productImage: [],
          imageId: " ",
        })
      );
      navigate(`/admin/category/${id}`);
    } else {
      navigate(`/admin/category/${id}`);
    }
  };

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
          <Loader height="150" width="100%" count="10" className="categories-list"/>

        ) : (
          <div className="categories-list">

            {categories.map((cat) => (
              <div
                key={cat.id}
                className="category-item"
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
                <div>
                  <img src={cat.categoryImage[0].path}/>
                </div>

              </div>
            ))}
          </div>

        )}
    </div>
  );
};

export default AdminCategoryList;
