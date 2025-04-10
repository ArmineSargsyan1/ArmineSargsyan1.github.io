import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeModalInfo,
  createOrUpdateProduct,
  deleteProductRequest,
  fetchCategoryProducts,
  fetchProducts, setModalInfo
} from "../../store/actions/adminProduct";
import _ from "lodash";
import useQuery from "../../../utils/useQuery";
import Search from "../Search";
import Button from "../Button";
import Loader from "../Loader";
import AdminProduct from "../AdminProduct";

const SingleCategoryProduct = () => {

  const {categoryId} = useParams();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.products.productStatus);

  const products = useSelector((state) => state.products.products);

  const modalInfo = useSelector((state) => state.products.modalInfo);


  const {query, setQuery} = useQuery();

  const firstLoading = useRef(true)
  const modalInfoError = useSelector((state) => state.products.modalInfoErrors);







  const page = parseInt(query.page) || 1;
  // const limit = parseInt(query.limit) ||5;

  useEffect(() => {

    dispatch(fetchCategoryProducts({categoryId, query}));

    firstLoading.current = false
  }, [categoryId, query]);


  const handlePageChange = useCallback((newPage) => {
    setQuery({...query, page: newPage});
  }, [query]);

  const createProduct = useCallback((info) => {
    dispatch(setModalInfo(info));

  }, [products]);
  const onDeleteProduct = async (productId) => {

    await dispatch(deleteProductRequest(productId));

    await dispatch(fetchCategoryProducts({categoryId, query}));

  };


  const onSaveData = async (e) => {
    console.log(_.isEmpty(modalInfoError) )
    e.preventDefault();

    await dispatch(createOrUpdateProduct({
      productId: modalInfo.id,
      product: modalInfo,
      categoryId: modalInfo.categoryId,
    }));



    // _.isEmpty(modalInfoError) &&
    //
    // await dispatch(fetchCategoryProducts({categoryId, page: 1}));

    // previewImg.forEach(url => URL.revokeObjectURL(url));
    // dispatch(setModalInfo({}))
  };

  console.log(query)

  // console.log(modalInfo, "mod")

  return (
    // <div className="container">
    <div>

      <Search query={query} setQuery={setQuery} />

      <Button
        onClick={() => {
          createProduct({name: "", size: "", price: "", description: "", brandName: "", categoryId, quantity: "", productImage: [], imageId: " "})}}
      >
        Add Products
      </Button>
      {firstLoading.current
        ? <Loader/>

        : products.products.map((product) => (

          !_.isEmpty(product.product)
          &&
          <AdminProduct
            product={product.product}
            onDeleteProduct={onDeleteProduct}
            onSaveData={onSaveData}
          />

        ))}



      {
        !firstLoading.current  &&
        <div className="pagination">
          <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Prev
          </Button>
          <span>{`Page ${page}`}</span>
          <Button onClick={() => handlePageChange(page + 1)}
                  disabled={page === products.maxPageCount}
          >
            Next
          </Button>
        </div>
      }


      {!products.products.length && !loading && <div>No products found</div>}
    </div>
  );
};

export default SingleCategoryProduct;


