// import React, {useCallback, useEffect, useRef, useState} from 'react';
// import {useLocation, useParams} from 'react-router-dom';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   changeModalInfo,
//   createOrUpdateProduct,
//   deleteProductRequest,
//   fetchCategoryProducts,
//   fetchProducts, resetProducts, setModalInfo
// } from "../../store/actions/adminProduct";
// import _ from "lodash";
// import useQuery from "../../../utils/useQuery";
// import Search from "../Search";
// import Button from "../Button";
// import Loader from "../Loader";
// import AdminProduct from "../AdminProduct";
//
// const SingleCategoryProduct = () => {
//
//   const {categoryId} = useParams();
//   const dispatch = useDispatch();
//
//   const loading = useSelector((state) => state.products.productStatus);
//
//   const products = useSelector((state) => state.products.products);
//
//   const modalInfo = useSelector((state) => state.products.modalInfo);
//
//
//   const {query, setQuery} = useQuery();
//
//   const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
//   const clickedBar = useSelector((state) => state.users.clickedBar);
//
//
//   const page = parseInt(query.page) || 1;
//   // const limit = parseInt(query.limit) ||5;
//
//   useEffect(() => {
//
//     dispatch(fetchCategoryProducts({categoryId, query}));
//
//     return()=>{
//       dispatch(resetProducts())
//     }
//   }, [categoryId, query, ]);
//
//
//   const handlePageChange = useCallback((newPage) => {
//     setQuery({...query, page: newPage});
//   }, [query]);
//
//   const createProduct = useCallback((info) => {
//     dispatch(setModalInfo(info));
//
//   }, [products]);
//
//   const onDeleteProduct = async (productId) => {
//
//     await dispatch(deleteProductRequest(productId));
//
//     await dispatch(fetchCategoryProducts({categoryId, query}));
//
//   };
//
//
//   const onSaveData = async (e) => {
//     e.preventDefault();
//
//     await dispatch(createOrUpdateProduct({
//       productId: modalInfo.id,
//       product: modalInfo,
//       categoryId: modalInfo.categoryId,
//     }));
//
//
//
//     // _.isEmpty(modalInfoError) &&
//     //
//     await dispatch(fetchCategoryProducts({categoryId, page: 1}));
//
//     // previewImg.forEach(url => URL.revokeObjectURL(url));
//     // dispatch(setModalInfo({}))
//   };
//
//   console.log(query)
//
//
//   return (
//     <div className="container">
//     <div>
//
//       {/*<Search query={query} setQuery={setQuery} />*/}
//
//       <Button
//         onClick={() => {
//           createProduct({name: "", size: "", price: "", description: "", brandName: "", categoryId, quantity: "", productImage: [], imageId: " "})}}
//       >
//         Add Products
//       </Button>
//       {loading && _.isEmpty(modalInfo)
//         ? <Loader/>
//
//         : products.products.map((product) => (
//
//           !_.isEmpty(product.product)
//           &&
//           <AdminProduct
//             product={product.product}
//             onDeleteProduct={onDeleteProduct}
//             onSaveData={onSaveData}
//           />
//
//         ))}
//
//
//
//
//
//         {/*<div className="pagination">*/}
//         {/*  <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>*/}
//         {/*    Prev*/}
//         {/*  </Button>*/}
//         {/*  <span>{`Page ${page}`}</span>*/}
//         {/*  <Button onClick={() => handlePageChange(page + 1)}*/}
//         {/*          disabled={page === products.maxPageCount}*/}
//         {/*  >*/}
//         {/*    Next*/}
//         {/*  </Button>*/}
//         {/*</div>*/}
//
//       <Search
//         query={query}
//         setQuery={setQuery}
//         products={products.products}
//         maxPageCount={products.maxPageCount}
//       />
//
//
//       {!products.products.length && !loading && <div>No products found</div>}
//     </div>
//     </div>
//   );
// };
//
// export default SingleCategoryProduct;






// import React, {useCallback, useEffect} from 'react';
// import {useLocation, useNavigate, useParams} from 'react-router-dom';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   changeModalInfo,
//   createOrUpdateProduct,
//   deleteProductRequest,
//   fetchCategoryProducts, fetchProducts,
//   resetProducts,
//   setModalInfo
// } from "../../store/actions/adminProduct";
// import _ from "lodash";
// import useQuery from "../../../utils/useQuery";
// import Search from "../Search";
// import Button from "../Button";
// import Loader from "../Loader";
// import AdminProduct from "../AdminProduct";
// import Error from "./Error";
//
// const SingleCategoryProduct = () => {
//
//   const {categoryId} = useParams();
//   const dispatch = useDispatch();
//
//   const loading = useSelector((state) => state.products.productStatus);
//
//   const products = useSelector((state) => state.products.products);
//
//   const modalInfo = useSelector((state) => state.products.modalInfo);
//
//   const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);
//
//   const message = useSelector((state) => state.products.message);
//
//   const error = useSelector((state) => state.products.error);
//
//
//   const {query, setQuery} = useQuery();
//
//   const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
// const location = useLocation()
// const navigate = useNavigate()
//
//
//   useEffect(() => {
//
//     dispatch(fetchCategoryProducts({categoryId, query}));
//
//     return()=>{
//       dispatch(resetProducts())
//     }
//   }, [categoryId, query]);
//
//   useEffect(() => {
//     if (message === "Product updated successfully"
//       || (message === "Product created successfully")
//     ){
//       dispatch(fetchCategoryProducts({categoryId, query}));
//     }
//   }, [message]);
//   console.log(products)
//
//   const createProduct = useCallback((info) => {
//     dispatch(setModalInfo(info));
//
//   }, [products]);
//
//   const onDeleteProduct = async (productId) => {
//
//     await dispatch(deleteProductRequest(productId));
//
//     await dispatch(fetchCategoryProducts({categoryId, query}));
//
//   };
//
//
//
//   const onSaveData = async (e) => {
//     e.preventDefault();
//     await dispatch(createOrUpdateProduct({
//       product: modalInfo,
//     }));
//
//     // await dispatch(fetchProducts({
//     //   ...query,
//     // }));
//     if (!_.isEmpty(modalInfoError)) {
//       await dispatch(fetchCategoryProducts({categoryId, page: 1}));
//
//
//        navigate(`/admin/category/${categoryId}`)
//     }
//
//   };
//
//   const onAddProduct = () => {
//     dispatch(setModalInfo({
//       name: "",
//       size: "",
//       price: "",
//       description: "",
//       brandName: "",
//       categoryId,
//       quantity: "",
//       productImage: [],
//       imageId: " ",
//     }));
//
//     //
//     // createProduct({
//     //   name: "",
//     //   size: "",
//     //   price: "",
//     //   description: "",
//     //   brandName: "",
//     //   categoryId,
//     //   quantity: "",
//     //   productImage: [],
//     //   imageId: " ",
//     // });
//   };
//
//
//
//   console.log(location?.state?.categoryId)
//   useEffect(() => {
//     if (location?.state?.categoryId){
//
//        onAddProduct()
//     }
//   }, []);
//
//   console.log(modalInfo,444444444)
//   return (
//
//     <div className="container">
//       <div>
//         {loading && !products.products.length ? (
//           <Loader
//             height="250"
//             width="100%"
//             count="5"
//             className="product-detail"
//             iCount={9}
//             iHeight={20}
//             iWidth={300}
//           />
//         ) : (
//           <>
//             {products.products.map((product) =>
//               !_.isEmpty(product.product) ? (
//                 <AdminProduct
//                   key={product.product._id || product.product.id}
//                   product={product.product}
//                   onDeleteProduct={onDeleteProduct}
//                   onSaveData={onSaveData}
//                 />
//               ) : null
//             )}
//
//
//             {!loading &&
//               !products.products.length &&
//               error && (
//                 <Error
//                   statusCode="No Products Found"
//                   message="Looks like there are no products in this category yet."
//                 />
//               )}
//             {location?.state?.categoryId && <AdminProduct
//               product={products.products}
//               onDeleteProduct={onDeleteProduct}
//               onSaveData={onSaveData}
//             />}
//           </>
//         )}
//
//         <Search
//           query={query}
//           setQuery={setQuery}
//           products={products.products}
//           maxPageCount={products.maxPageCount}
//         />
//       </div>
//     </div>
//
//   );
// };
//
// export default SingleCategoryProduct;







import React, {useCallback, useEffect} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeModalInfo,
  createOrUpdateProduct,
  deleteProductRequest,
  fetchCategoryProducts, fetchProducts,
  resetProducts,
  setModalInfo
} from "../../store/actions/adminProduct";
import _ from "lodash";
import useQuery from "../../../utils/useQuery";
import Search from "../Search";
import Button from "../Button";
import Loader from "../Loader";
import AdminProduct from "../AdminProduct";
import Error from "./Error";
import ProductModalForm from "../ProductModalForm";

const SingleCategoryProduct = () => {

  const {categoryId} = useParams();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.products.productStatus);

  const products = useSelector((state) => state.products.products);

  const modalInfo = useSelector((state) => state.products.modalInfo);

  const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);

  const message = useSelector((state) => state.products.message);

  const error = useSelector((state) => state.products.error);


  const {query, setQuery} = useQuery();

  const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
  const location = useLocation()
  const navigate = useNavigate()


  useEffect(() => {

    dispatch(fetchCategoryProducts({categoryId, query}));

    return()=>{
      dispatch(resetProducts())
    }
  }, [categoryId, query]);

  useEffect(() => {
    if (message === "Product updated successfully"
      || (message === "Product created successfully")
    ){
      dispatch(fetchCategoryProducts({categoryId, query}));
    }
  }, [message]);
  console.log(products)

  const createProduct = useCallback((info) => {
    dispatch(setModalInfo(info));

  }, [products]);

  const onDeleteProduct = async (productId) => {

    await dispatch(deleteProductRequest(productId));

    await dispatch(fetchCategoryProducts({categoryId, query}));

  };



  const onSaveData = async (e) => {
    e.preventDefault();
    await dispatch(createOrUpdateProduct({
      product: modalInfo,
    }));

    // await dispatch(fetchProducts({
    //   ...query,
    // }));
    if (!_.isEmpty(modalInfoError)) {
      await dispatch(fetchCategoryProducts({categoryId, page: 1}));


      navigate(`/admin/category/${categoryId}`)
    }

  };

  const onAddProduct = () => {
    dispatch(setModalInfo({
      name: "",
      size: "",
      price: "",
      description: "",
      brandName: "",
      categoryId,
      quantity: "",
      productImage: [],
      imageId: " ",
    }));

    //
    // createProduct({
    //   name: "",
    //   size: "",
    //   price: "",
    //   description: "",
    //   brandName: "",
    //   categoryId,
    //   quantity: "",
    //   productImage: [],
    //   imageId: " ",
    // });
  };



  console.log(location?.state?.categoryId)
  useEffect(() => {
    if (location?.state?.categoryId){

      onAddProduct()
    }
  }, []);

  console.log(modalInfo,444444444)
  return (

    <div className="container">
      <div>
        {loading && !products.products.length ? (
          <Loader
            height="250"
            width="100%"
            count="5"
            className="product-detail"
            iCount={9}
            iHeight={20}
            iWidth={300}
          />
        ) : (
          <>
            {products?.products?.map((product) =>
              !_.isEmpty(product?.product) ? (
                <AdminProduct
                  product={product.product}
                  onDeleteProduct={onDeleteProduct}
                  onSaveData={onSaveData}
                />
              ) : null
            )}


            {!loading &&
              !products?.products?.length &&
              error && (
                <Error
                  statusCode="No Products Found"
                  message="Looks like there are no products in this category yet."
                />
              )}
            {location?.state?.categoryId &&
         <ProductModalForm/>}
          </>
        )}

        <Search
          query={query}
          setQuery={setQuery}
          products={products.products}
          maxPageCount={products.maxPageCount}
        />
      </div>
    </div>

  );
};

export default SingleCategoryProduct;
