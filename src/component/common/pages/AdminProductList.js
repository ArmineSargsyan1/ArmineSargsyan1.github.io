import React, {useEffect, useRef, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  createOrUpdateProduct,
  deleteProductRequest, fetchCategoryProducts,
  fetchProducts, resetProducts,
  setModalInfo,
} from "../../store/actions/adminProduct";
import _ from "lodash";
import Loader from "../Loader";
import AdminProduct from "../AdminProduct";
import Search from "../Search";
import useQuery from "../../../utils/useQuery";
import loader from "../Loader";
import Error from "./Error";



const AdminProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const maxPageCount = useSelector((state) => state.products.products.maxPageCount);
  const loadingProducts = useSelector((state) => state.products.productStatus);
  const modalInfo = useSelector((state) => state.products.modalInfo);
  const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);

  const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
  const error = useSelector((state) => state.products.error);
  const message = useSelector((state) => state.products.message);


  const {query, setQuery} = useQuery();

  const timeOut = useRef(null);


  useEffect(() => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }

    timeOut.current = setTimeout(() => {
      dispatch(fetchProducts({
        ...query,
      }));
    }, 500);

    return () => {
      clearTimeout(timeOut.current);
      dispatch(resetProducts())
    };
  }, [query]);


  useEffect(() => {
    if (message === "Product updated successfully"
      || (message === "Product created successfully")
    ){
      dispatch(fetchProducts({... query}));
    }
  }, [message]);

  const onSaveData = async (e) => {
    e.preventDefault();
    await dispatch(createOrUpdateProduct({
      product: modalInfo,
    }));

    // await dispatch(fetchProducts({
    //   ...query,
    // }));
    if (!_.isEmpty(modalInfoError)) {
      await dispatch(fetchProducts({
        ...query,
      }));


    }

  };

  const onDeleteProduct = async (productId) => {
    await dispatch(deleteProductRequest(productId));
    await dispatch(fetchProducts({
      ...query,
    }));
  };


  return (
    <div className="admin-container">
      <>
          <div className="product-list">
            {!products.products?.length && loadingProducts
              ?
              <Loader
                height="250"
                width="100%"
                count="3"
                className="product-detail"
                iCount={9} iHeight={20}
                iWidth={300}/>

              : products?.products?.map((prod) => (
                <AdminProduct
                  product={prod}
                  onDeleteProduct={onDeleteProduct}
                  onSaveData={onSaveData}
                />
              ))
            }

          </div>

        <Search
          query={query}
          setQuery={setQuery}
          products={products.products}
          maxPageCount={maxPageCount}
        />

        {!loadingProducts &&
          !products?.products?.length &&
          error &&
          <Error
          statusCode={"No Products Found"}
          message={"Looks like there are no products in this category yet."}
          icon={true}
          />
        }
      </>
    </div>
  );
};

export default AdminProductList;
