import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {
  deleteImageRequest,
  fetchSingleAdminProduct,
  setModalInfo
} from "../../store/actions/adminProduct";

import _ from "lodash";
import Loader from "../Loader";
import Button from "../Button";
import ReviewSection from "../ReviewSection";
import DiscountProduct from "./DiscountProduct";

const SingleAdminProduct = () => {
  const {productId} = useParams();
  const dispatch = useDispatch();


//discount
  const deletingProduct = useSelector((state) => state.products.deletingProduct);

  const discountDetails = useSelector((state) => state.products.discountDetails);
  const modalInfo = useSelector((state) => state.products.modalInfo);

  const productStatus = (state) => state.products.productStatus;
  const selectError = (state) => state.products.error;

  ///singleProd
  const product = useSelector((state) => state.products.product);
  const lo = useSelector((state) => state.products.loading);





  const {id,brandName, name, description, images, size, store, price, quantity,} = product



  useEffect(() => {
    dispatch(fetchSingleAdminProduct({productId}));
  }, [ productId, discountDetails]);



  const onDeleteImage = (imageId) => {
    dispatch(deleteImageRequest(imageId));
  };


  const updateProduct = (imageId) => {
    dispatch(setModalInfo({
      id,
      name,
      size,
      price,
      description,
      brandName,
      quantity,
      imageId
    }));
  };

  return (
    <>

      {lo ? (
        <Loader/>
      ) : (
        product &&
        <div className="product-details">
          <div className="product-header">
            <h2>{name}</h2>
            <p>Brand: {brandName}</p>
            <p>Description: {description}</p>
            <p>Size: {size}</p>
          </div>

          <div className="product-images">
            {!!images?.length &&
              images.map((image, index) => (
                <>
                  <img
                    key={image.id}
                    src={image.url}
                    alt={`product-image-${index}`}
                    className="product-image"
                  />
                </>

              ))}
          </div>

          {/*<h2>Product</h2>*/}
          {/*<table className="product-table">*/}
          {/*  <thead>*/}
          {/*  <tr>*/}
          {/*    <th>name</th>*/}
          {/*    <th>Brand</th>*/}
          {/*    <th>Description</th>*/}
          {/*    <th>Size</th>*/}
          {/*    <th>Store</th>*/}
          {/*    <th>Images</th>*/}
          {/*    <th>Actions</th>*/}
          {/*  </tr>*/}
          {/*  </thead>*/}
          {/*  <tbody>*/}
          {/*  <tr>*/}
          {/*    <td>{name}</td>*/}
          {/*    <td>{brandName}</td>*/}
          {/*    <td>{description}</td>*/}
          {/*    <td>{size}</td>*/}
          {/*    <td>{product.store?.name}</td>*/}
          {/*    <td>*/}
          {/*      {!!product?.images?.length && (*/}
          {/*        <div className="product-images">*/}
          {/*          {images.map((image, index) => (*/}
          {/*            <div key={image.id} className="image-wrapper">*/}
          {/*              <img*/}
          {/*                src={image.url}*/}
          {/*                alt={`product-image-${index}`}*/}
          {/*                className="product-image"*/}
          {/*              />*/}
          {/*              <div className="image-actions">*/}
          {/*                <Button*/}
          {/*                  onClick={() => onDeleteImage(image.id)}*/}
          {/*                  loading={deletingProduct.includes(image.id)}*/}
          {/*                >*/}
          {/*                  Delete*/}
          {/*                </Button>*/}
          {/*                <Button onClick={() => updateProduct(image.id)}>*/}
          {/*                  Update Image*/}
          {/*                </Button>*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*          ))}*/}
          {/*        </div>*/}
          {/*      )}*/}
          {/*    </td>*/}
          {/*    <td>*/}
          {/*      {!_.isEmpty(product) && <DiscountProduct product={product}/>}*/}
          {/*    </td>*/}
          {/*  </tr>*/}
          {/*  </tbody>*/}
          {/*</table>*/}
          <DiscountProduct product={product}/>
          <ReviewSection productId={productId}/>
        </div>
      )}
    </>
  )

};

export default SingleAdminProduct;
