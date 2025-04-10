import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createOrUpdateProduct,
  deleteProductRequest,
  fetchProducts,
  setModalInfo,
} from "../../store/actions/adminProduct";
import { fetchCategories } from "../../store/actions/adminCategory";
import _ from "lodash";
import Loader from "../Loader";
import AdminProduct from "../AdminProduct";
import Search from "../Search";
import AdminMenu from "../AdminMenu";
import useQuery from "../../../utils/useQuery";


const AdminProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loadingProducts = useSelector((state) => state.products.productStatus);
  const modalInfo = useSelector((state) => state.products.modalInfo);
  const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
  const error = useSelector((state) => state.products.error);

  const firstLoading = useRef(true);
  const { query, setQuery } = useQuery();

  const { page } = query;
  const timeOut = useRef(null);

  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [dispatch]);

  useEffect(() => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }

    timeOut.current = setTimeout(() => {
      dispatch(fetchProducts({
        ...query,
      }));
    }, 500);

    firstLoading.current = false;
    return () => {
      clearTimeout(timeOut.current);
    };
  }, [query]);

  const handlePageChange = useCallback((newPage) => {
    setQuery({ ...query, page: newPage });
  }, [query]);

  const onSaveData = async (e) => {
    e.preventDefault();
    await dispatch(createOrUpdateProduct({
      product: modalInfo,
    }));

    // await dispatch(fetchProducts({
    //   ...query,
    // }));
    if (_.isEmpty(modalInfoError)) {
      await dispatch(fetchProducts({
        ...query,
      }));

      dispatch(setModalInfo({}))
    }
  };



  const onDeleteProduct = async (productId) => {
    await dispatch(deleteProductRequest(productId));
    await dispatch(fetchProducts({
      ...query,
    }));
  };
  console.log(products)

  return (
    <div className="admin-container">

      {/*<Search query={query} setQuery={setQuery} />*/}

      {firstLoading.current ? (
        <Loader />
      ) : (
        <>
          <div className="product-list">
            {products?.products?.map((prod) => (
              <AdminProduct
                key={prod.id}
                product={prod}
                query={query}
                setQuery={setQuery}
                onDeleteProduct={onDeleteProduct}
                onSaveData={onSaveData}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
              Prev
            </button>
            <span>{`Page ${page}`}</span>
            <button
              onClick={() => handlePageChange(+page + 1)}
              disabled={page === products.maxPageCount}
            >
              Next
            </button>
          </div>
        </>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default AdminProductList;
