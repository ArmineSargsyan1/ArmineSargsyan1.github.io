import React, {useCallback, useEffect, useRef, } from 'react';
import { useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  createOrUpdateProduct,
  deleteProductRequest,
  fetchCategoryProducts,
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
import {ReactComponent as AddProducts} from "../../../assets/image/addProducts.svg";
import {fetchCategories} from "../../store/actions/adminCategory";


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

  const categories = useSelector((state) => state.categories.categories);
  const loadingCategories = useSelector((state) => state.categories.loading);
  const activeItemRef = useRef(null);

  const timeoutRef = useRef(null);

  const loadCategoryProducts = ({ categoryId, query }) => {
    const time = _.isEmpty(modalInfo) ? 500 : 0;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // clear previous timeout if any
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(fetchCategoryProducts({ categoryId, query }));
    }, time);
  };


  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    loadCategoryProducts({categoryId, query});

    return () => {
      clearTimeout(timeoutRef.current);
      dispatch(resetProducts());
    };
  }, [categoryId, query]);


  // useEffect(() => {
  //
  //   dispatch(fetchCategoryProducts({categoryId, query}));
  //
  //   return () => {
  //     dispatch(resetProducts())
  //   }
  // }, [categoryId, query]);

  useEffect(() => {
    if (message === "Product updated successfully"
      || (message === "Product created successfully")
    ) {
      dispatch(fetchCategoryProducts({categoryId, query}));
    }
  }, [message]);


  const createProduct = useCallback((info) => {
    dispatch(setModalInfo(info));

  }, [products]);


  const onDeleteProduct = async (productId) => {
    await dispatch(deleteProductRequest(productId));

    // Fetch current page data
    const response = await dispatch(fetchCategoryProducts({categoryId, query}));

    const productsList = response?.payload?.products ?? [];

    if (productsList.length === 0 && query.page > 1) {
      const newQuery = {...query, page: query.page - 1};
      setQuery(newQuery);
      await dispatch(fetchCategoryProducts({categoryId, query: newQuery}));
    }
  };


  const onSaveData = async (e) => {
    e.preventDefault();
    await dispatch(createOrUpdateProduct({
      product: modalInfo,
    }));

    // await dispatch(fetchProducts({
    //   ...query,
    // }));
    if (!_.isEmpty(modalInfoError) && message) {
      await dispatch(fetchCategoryProducts({categoryId, page: 1}));

      dispatch(setModalInfo({}))

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

  };


  useEffect(() => {
    if (!categories.length) return;

    requestAnimationFrame(() => {
      if (activeItemRef.current) {
        activeItemRef.current.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      }
    });
  }, [categoryId, categories]);

  return (

    <div className="container">
      {_.isEmpty(modalInfo) &&
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          <Button
            className="add-product-btn"
            onClick={onAddProduct}
          >
            <AddProducts/>
            Add Product
          </Button>
        </div>
      }


      <div className="canvas-menu">
        {categories.map((cat) => {
          const isActive = +cat.id === +categoryId;
          return (
            <div
              key={cat.id}
              ref={isActive ? activeItemRef : null}
              className={`canvas-menu__item ${isActive ? "active" : ""}`}
              onClick={() => {
                loadCategoryProducts({categoryId:cat.id, query:{}})
                // dispatch(fetchCategoryProducts({ categoryId: cat.id, query: {} }));
                navigate(`/admin/category/${cat.id}`);
              }} >
              <span className="canvas-menu__title">{cat.name}</span>
            </div>
          );
        })}
      </div>


      <div style={{marginTop: 55}}>
        <div className="product-list">

          {loading && !products.products.length ? (
            <Loader
              height="250"
              width="100%"
              className="product-list"
              count={query.limit || 5}
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
              {!_.isEmpty(modalInfo) &&
                <ProductModalForm onSave={onSaveData}/>}
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

    </div>

  );
};

export default SingleCategoryProduct;
