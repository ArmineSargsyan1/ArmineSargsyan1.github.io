// import React, {useState, useEffect} from 'react';
// import {useDispatch, useSelector} from "react-redux";
//
//
// import {Link, useLocation} from "react-router-dom";
// import _ from "lodash";
// import {changeModalInfo, deleteImageRequest, fetchCategoryProducts, setModalInfo} from "../store/actions/adminProduct";
// import Button from "./Button";
// import Modal from "./Modal";
// import Input from "./Input";
// import ClearCartModal from "./ClearCardModal";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faBell, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
// import DiscountProduct from "./pages/DiscountProduct";
// import Loader from "./Loader";
// import ProductModalForm from "./ProductModalForm";
//
// const formFields = [
//   {label: 'Product Name', name: 'name', type: 'text'},
//   {label: 'Size', name: 'size', type: 'text'},
//   {label: 'Price', name: 'price', type: 'text'},
//   {label: 'Description', name: 'description', type: 'textarea'},
//   {label: 'Brand Name', name: 'brandName', type: 'text'},
//   {label: 'Quantity', name: 'quantity', type: 'text'},
// ];
//
// const AdminProduct = ({product, onDeleteProduct, onSaveData, state}) => {
//   const {
//     id,
//     name,
//     size,
//     price,
//     description,
//     brandName,
//     createdAt,
//     updatedAt,
//     productImage,
//     quantity,
//     discount,
//     imageId
//   } = product;
//   const location = useLocation()
//
//   const dispatch = useDispatch();
//   const loading = useSelector((state) => state.products.productStatus);
//   const modalInfo = useSelector((state) => state.products.modalInfo);
//   const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
//   const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);
//   const deletingProduct = useSelector((state) => state.products.deletingProduct);
//   const  message = useSelector((state) => state.products.message);
//
//   const [isClearModalOpen, setIsClearModalOpen] = useState(false);
//   const [previewImg, setPreviewImg] = useState([]);
//
//   const [prodImage, setProdImage] = useState([]);
//
//
//   const [viewImg, setViewImg] = useState(false);
//   const [i, setI] = useState(" ");
//
//   const uploadFile = async ({target}) => {
//     const files = Array.from(target.files);
//
//     const validFiles = files.filter(file => {
//       if (file.size > 1024 * 1024 * 1024) {
//         console.log("Image size should be less than 1MB");
//         return false;
//       } else if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
//         console.log('Invalid image type. Only JPEG, PNG, and SVG are allowed.');
//         return false;
//       }
//       return true;
//     });
//
//     if (validFiles.length > 0) {
//       setProdImage(prev => [...prev, ...validFiles]);
//
//       const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
//       setPreviewImg(prev => [...prev, ...newPreviewUrls]);
//
//       dispatch(changeModalInfo({
//         path: 'productImage',
//
//         value: [...prodImage, ...validFiles],
//       }));
//     }
//   };
//
//
//   useEffect(() => {
//     if (message === "Product updated successfully"
//       || (message === "Product created successfully")
//     ){
//       setPreviewImg([])
//       setProdImage([])
//     }
//   }, [message]);
//
//   const updateProduct = () => {
//
//     dispatch(setModalInfo({
//       id,
//       name,
//       size,
//       price: parseFloat(price),
//       description,
//       brandName,
//       quantity,
//       imageId,
//       productIm: productImage
//     }));
//   };
//
//
//   const onClearCancel = () => {
//     setIsClearModalOpen(false);
//   };
//
//   const onClearConfirm = async () => {
//     await onDeleteProduct(id);
//     setIsClearModalOpen(false);
//   };
//
//
//   const onClose = () => {
//
//     if (_.isEmpty(modalInfoError)) {
//       setPreviewImg([])
//       dispatch(setModalInfo({}));
//     }
//
//   };
//
//
//   const onDeleteImage = (imageId) => {
//     dispatch(deleteImageRequest(imageId));
//   };
//
//
//   const onModalClose = () => {
//     if (!loading) {
//       onClose();
//     }
//   };
//
//   console.log(state,7777)
//   return (
//     <div className="product-detail" key={id}>
//       <Link to={`/admin/product/${product.id}`}>
//       <div className="product-card" key={id}>
//         <div className="product-card__image-wrapper" onClick={() => setViewImg(true)}>
//             <img
//               src={productImage?.[0]?.path}
//               alt={name}
//               className="product-card__image"
//             />
//             {productImage?.length > 1 && (
//               <div className="product-card__image-count">
//                 +{productImage.length - 1}
//               </div>
//             )}
//         </div>
//
//         <div className="product-card__content">
//           <h3 className="product-card__title">{name}</h3>
//           <p><strong>Price:</strong> ${Math.round(price)}</p>
//           <p><strong>Brand:</strong> {brandName}</p>
//           <p><strong>Description:</strong> {description}</p>
//           <p><strong>Size:</strong> {size}</p>
//           <p><strong>Quantity:</strong> {quantity}</p>
//           <DiscountProduct product={product}/>
//
//         </div>
//
//       </div>
//
// </Link>
//
//       <div className="oction__buttons">
//
//         <FontAwesomeIcon
//           icon={faPenToSquare}
//           className="oction__toggle"
//           onClick={updateProduct}
//         >
//         </FontAwesomeIcon>
//         <FontAwesomeIcon
//           icon={faTrash}
//           className="oction__delete"
//           onClick={() => setIsClearModalOpen(true)}
//         >
//         </FontAwesomeIcon>
//         <ClearCartModal
//           isOpen={isClearModalOpen}
//           onClose={onClearCancel}
//           onConfirm={onClearConfirm}
//           desc={"Are you sure you want to delete the product"}
//           loading={loading}
//         />
//       </div>
//       <ClearCartModal
//         isOpen={isClearModalOpen}
//         onClose={onClearCancel}
//         onConfirm={onClearConfirm}
//         desc={"Are you sure you want to delete the product?"}
//         loading={loading}
//       />
//
//
//       {/*<div className="product-form">*/}
//       {/*  {<Modal*/}
//       {/*    isOpen={!_.isEmpty(modalInfo) || state}*/}
//       {/*    onClose={onModalClose}*/}
//       {/*    className="big"*/}
//       {/*  >*/}
//       {/*    <form onSubmit={onSaveData}>*/}
//       {/*      {*/}
//       {/*        formFields.map((field) => (*/}
//       {/*          <div key={field.name} className="form-group">*/}
//       {/*            <label htmlFor={field.name}>{field.label}</label>*/}
//       {/*            {field.type === 'textarea' ? (*/}
//       {/*              <textarea*/}
//       {/*                id={field.name}*/}
//       {/*                name={field.name}*/}
//       {/*                value={modalInfo[field.name] || ""}*/}
//       {/*                onChange={({target: {value}}) =>*/}
//       {/*                  dispatch(changeModalInfo({path: field.name, value}))*/}
//       {/*                }*/}
//       {/*              />*/}
//       {/*            ) : (*/}
//       {/*              <Input*/}
//       {/*                type={field.type}*/}
//       {/*                id={field.name}*/}
//       {/*                name={field.name}*/}
//       {/*                value={modalInfo[field.name] || ""}*/}
//       {/*                onChange={({target: {value}}) =>*/}
//       {/*                  dispatch(changeModalInfo({path: field.name, value}))*/}
//       {/*                }*/}
//       {/*              />*/}
//       {/*            )}*/}
//       {/*            {modalInfoError?.[field.name] && (*/}
//       {/*              <div className="validation-info">{modalInfoError[field.name]}</div>*/}
//       {/*            )}*/}
//       {/*          </div>*/}
//       {/*        ))}*/}
//
//       {/*      <div className="image-upload-hint">*/}
//       {/*        {!modalInfo.categoryId &&*/}
//       {/*          <p className="image-hint-text">*/}
//       {/*            Updating an image? Upload your new one first, then click the update button on the image you'd like to*/}
//       {/*            replace.*/}
//       {/*          </p>*/}
//       {/*        }*/}
//       {/*        <p className="image-hint-text">*/}
//       {/*          Ready to showcase your product? Upload one or more images to get started.*/}
//       {/*        </p>*/}
//       {/*      </div>*/}
//
//       {/*      /!* Upload new images *!/*/}
//       {/*      <div className="form-group">*/}
//
//       {/*        <input*/}
//       {/*          type="file"*/}
//       {/*          id="productImage"*/}
//       {/*          name="productImage"*/}
//       {/*          multiple*/}
//       {/*          onChange={uploadFile}*/}
//       {/*        />*/}
//       {/*      </div>*/}
//
//       {/*      <div className="image-modal-wrapper">*/}
//
//       {/*        {modalInfo?.productIm?.map((image, index) => (*/}
//       {/*          <div key={image.id} className="image-modal">*/}
//       {/*            <img*/}
//       {/*              src={image.path}*/}
//       {/*              alt={`product-image-${index}`}*/}
//       {/*              className="product-image_modal"*/}
//       {/*            />*/}
//
//       {/*            <div className="oction__buttons">*/}
//       {/*              <Button*/}
//       {/*                onClick={() => onDeleteImage(image.id)}*/}
//       {/*                loading={deletingProduct.includes(image.id)}*/}
//       {/*                className="oction__delete small"*/}
//       {/*              >*/}
//       {/*                <FontAwesomeIcon*/}
//       {/*                  icon={faTrash}*/}
//       {/*                  className="oction__delete small"*/}
//       {/*                />*/}
//       {/*              </Button>*/}
//
//       {/*              <Button*/}
//       {/*                onClick={() =>*/}
//       {/*                  dispatch(changeModalInfo({path: "imageId", value: image.id}))*/}
//       {/*                }*/}
//       {/*                className="oction__toggle small"*/}
//       {/*                disabled={previewImg.length === 0}*/}
//       {/*                title="Please select a new image before updating."*/}
//
//       {/*              >*/}
//       {/*                <FontAwesomeIcon className="oction__toggle small" icon={faPenToSquare}/>*/}
//       {/*              </Button>*/}
//       {/*            </div>*/}
//       {/*          </div>*/}
//       {/*        ))}*/}
//       {/*      </div>*/}
//
//
//       {/*      {previewImg.length > 0 && (*/}
//       {/*        <div className="form-group">*/}
//       {/*          <label>Preview New Images</label>*/}
//       {/*          <div className="image-previews">*/}
//       {/*            {previewImg.map((url, index) => (*/}
//       {/*              <img key={index} src={url} alt={`preview-${index}`} width="100"/>*/}
//       {/*            ))}*/}
//       {/*          </div>*/}
//       {/*        </div>*/}
//       {/*      )}*/}
//
//       {/*      <Button*/}
//       {/*        type="submit"*/}
//       {/*        disabled={modalInfo.imageId && modalInfo.imageId != " " ? !previewImg.length : !_.isEmpty(modalInfoError)}*/}
//       {/*        loading={modalInfoStatus}*/}
//       {/*        className="save_product"*/}
//       {/*      >*/}
//       {/*        Save*/}
//       {/*      </Button>*/}
//       {/*    </form>*/}
//
//       {/*  </Modal>*/}
//       {/*  }*/}
//       {/*</div>*/}
//       <ProductModalForm onSave={onSaveData}/>
//     </div>
//
//   );
// };
//
// export default AdminProduct;
//


import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";


import {Link, useLocation} from "react-router-dom";

import ClearCartModal from "./ClearCardModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import DiscountProduct from "./pages/DiscountProduct";
import Loader from "./Loader";
import ProductModalForm from "./ProductModalForm";
import {setModalInfo} from "../store/actions/adminProduct";
import _ from "lodash";
import moment from "moment";

const AdminProduct = ({product, onDeleteProduct, onSaveData, state}) => {
  const {
    id,
    name,
    size,
    price,
    description,
    brandName,
    createdAt,
    updatedAt,
    productImage,
    quantity,
    discount,
    imageId
  } = product;

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.productStatus);
  const modalInfo = useSelector((state) => state.products.modalInfo);
  const  message = useSelector((state) => state.products.message);


  const [isClearModalOpen, setIsClearModalOpen] = useState(false);


  const updateProduct = () => {

    dispatch(setModalInfo({
      id,
      name,
      size,
      price: parseFloat(price),
      description,
      brandName,
      quantity,
      imageId,
      productIm: productImage
    }));
  };

  const onClearCancel = () => {
    setIsClearModalOpen(false);
  };

  const onClearConfirm = async () => {
    await onDeleteProduct(id);
    setIsClearModalOpen(false);
  };

  console.log(productImage,99999999999)

  return (
    <div className="product-detail" key={id}>
      <Link to={`/admin/product/${product.id}`}>
        <h3 className="product-card__title">{name}</h3>

        <div className="product-card" key={id}>
          <div className="product-card__image-wrapper">
            <img
              src={productImage?.[0]?.path}
              alt={name}
              className="product-card__image"
            />
            {productImage?.length > 1 && (
              <div className="product-card__image-count">
                +{productImage.length - 1}
              </div>
            )}
          </div>

          <div className="product-card__content">
            <p><strong>Brand:</strong> {brandName}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Size:</strong> {size}</p>
            <p><strong>Quantity:</strong> {quantity}</p>

            {_.isEmpty(discount) ?
              <p><strong>Price:</strong> ${Math.round(price)}</p>
              : <p><strong>Persentage:</strong>{Math.round(discount.discountPercentage)}</p>
            }


            <div className="updated-product">
              <p><strong>Created:</strong> {moment(createdAt).format("MMM D, YYYY - h:mm A")}</p>
              <p
                className={
                  moment().diff(moment(updatedAt), 'hours') < 24
                    ? "updated-recently"
                    : ""
                }
              >
                <strong>Updated:</strong> {moment(updatedAt).fromNow()}
              </p>
            </div>

          </div>


        </div>

      </Link>

      <div className="oction__buttons">

        <FontAwesomeIcon
          icon={faPenToSquare}
          className="oction__toggle"
          onClick={updateProduct}
        >
        </FontAwesomeIcon>
        <FontAwesomeIcon
          icon={faTrash}
          className="oction__delete"
          onClick={() => setIsClearModalOpen(true)}
        >
        </FontAwesomeIcon>
        <ClearCartModal
          isOpen={isClearModalOpen}
          onClose={onClearCancel}
          onConfirm={onClearConfirm}
          desc={"Are you sure you want to delete the product"}
          loading={loading}
        />
      </div>
      <ClearCartModal
        isOpen={isClearModalOpen}
        onClose={onClearCancel}
        onConfirm={onClearConfirm}
        desc={"Are you sure you want to delete the product?"}
        loading={loading}
      />

      <ProductModalForm onSave={onSaveData}/>
    </div>

  );
};

export default AdminProduct;

