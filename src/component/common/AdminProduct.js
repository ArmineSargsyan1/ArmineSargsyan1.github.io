// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from "react-redux";
// //
// //
// // import { Link } from "react-router-dom";
// // import _ from "lodash";
// // import {changeModalInfo, setModalInfo} from "../store/actions/adminProduct";
// // import moment from "moment";
// // import Button from "./Button";
// // import Modal from "./Modal";
// // import Input from "./Input";
// // import ClearCartModal from "./ClearCardModal";
// // import ProductModalForm from "./ProductModalForm";
// // import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// // import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
// // import DiscountProduct from "./pages/DiscountProduct";
// //
// // const formFields = [
// //   { label: 'Product Name', name: 'name', type: 'text' },
// //   { label: 'Size', name: 'size', type: 'text' },
// //   { label: 'Price', name: 'price', type: 'text' },
// //   { label: 'Description', name: 'description', type: 'textarea' },
// //   { label: 'Brand Name', name: 'brandName', type: 'text' },
// //   {label: 'Quantity', name: 'quantity', type: 'text'},
// // ];
// //
// // const AdminProduct = ({ product, onDeleteProduct, onSaveData}) => {
// //   const { id, name, size, price, description, brandName, createdAt, updatedAt, productImage, quantity, discount } = product;
// //
// //   const dispatch = useDispatch();
// //   const loading = useSelector((state) => state.products.productStatus);
// //   const modalInfo = useSelector((state) => state.products.modalInfo);
// //   const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
// //   const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);
// //
// //   const [isClearModalOpen, setIsClearModalOpen] = useState(false);
// //   const [previewImg, setPreviewImg] = useState([]);
// //
// //   const [prodImage, setProdImage] = useState([]);
// //
// //
// //   // Generate preview URLs for the selected images
// //   // useEffect(() => {
// //   //   // if (modalInfo.productImage) {
// //   //   //   const previewUrls = modalInfo.productImage.map(file => file._preview); // Use the preview URL added to the file
// //   //   //   setPreviewImg(previewUrls);
// //   //   // }
// //   //
// //   //   return () => {
// //   //     previewImg.forEach(url => URL.revokeObjectURL(url));
// //   //   };
// //   // }, [modalInfo.productImage]);
// //   //
// //
// //   const uploadFile = async ({ target }) => {
// //     const files = Array.from(target.files);
// //
// //     const validFiles = files.filter(file => {
// //       if (file.size > 1024 * 1024 * 1024) {
// //         console.log("Image size should be less than 1MB");
// //         return false;
// //       } else if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
// //         console.log('Invalid image type. Only JPEG, PNG, and SVG are allowed.');
// //         return false;
// //       }
// //       return true;
// //     });
// //
// //     if (validFiles.length > 0) {
// //       setProdImage(prev => [...prev, ...validFiles]);
// //
// //       const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
// //       setPreviewImg(prev => [...prev, ...newPreviewUrls]);
// //
// //       dispatch(changeModalInfo({
// //         path: 'productImage',
// //
// //         value: [...prodImage, ...validFiles],
// //       }));
// //     }
// //   };
// //
// //
// //   const updateProduct = () => {
// //     dispatch(setModalInfo({
// //       id,
// //       name,
// //       size,
// //       price: parseFloat(price),
// //       description,
// //       brandName,
// //       quantity,
// //       imageId: " "
// //     }));
// //   };
// //
// //   const onClearCancel = () => {
// //     setIsClearModalOpen(false);
// //   };
// //
// //   const onClearConfirm = async () => {
// //     await onDeleteProduct(id);
// //     setIsClearModalOpen(false);
// //   };
// //
// //
// //   const onClose = () => {
// //
// //     if (_.isEmpty(modalInfoError)){
// //       setPreviewImg([])
// //       dispatch(setModalInfo({}));
// //     }
// //
// //   };
// //
// //
// //   return (
// //     !_.isEmpty(product) && (
// //       <div className="product-details" key={id}>
// //         <Link to={`/admin/product/${product.id}`}>
// //           <div className="product-header">
// //             <h2>{name}</h2>
// //             <p>Brand: {brandName}</p>
// //             <p>Description: {description}</p>
// //           </div>
// //
// //           {/*<div className="product-images">*/}
// //           {/*  {!!productImage?.length &&*/}
// //           {/*    productImage.map((image, index) => (*/}
// //           {/*      <>*/}
// //           {/*        <img*/}
// //           {/*          key={image.id}*/}
// //           {/*          src={image.path}*/}
// //           {/*          alt={`product-image-${index}`}*/}
// //           {/*          className="product-image"*/}
// //           {/*        />*/}
// //           {/*      </>*/}
// //
// //           {/*    ))}*/}
// //           {/*</div>*/}
// //
// //           {/*<div className="product-info">*/}
// //           {/*  <p>Size: {size}</p>*/}
// //           {/*  <p>Store: {product.store?.name}</p>*/}
// //           {/*  <p>Price: {price}$</p>*/}
// //           {/*  <p>Quantity: {quantity}</p>*/}
// //           {/*  <p>Created At: {moment(createdAt).format('LL')}</p>*/}
// //           {/*  <p>Updated At: {moment(updatedAt).format('LL')}</p>*/}
// //           {/*</div>*/}
// //
// //
// //           <h2>Product</h2>
// //           <table className="product-table">
// //             <thead>
// //             <tr>
// //               <th>Name</th>
// //               <th>Brand</th>
// //               <th>Description</th>
// //               <th>Size</th>
// //               <th>Store</th>
// //               <th>Images</th>
// //               <th>Actions</th>
// //             </tr>
// //             </thead>
// //             <tbody>
// //             <tr>
// //               <td>{name}</td>
// //               <td>{brandName}</td>
// //               <td>{description}</td>
// //               <td>{size}</td>
// //               <td>{product.store?.name}</td>
// //               <td>
// //                 {!!product?.images?.length && (
// //                   <div className="product-images">
// //                     {images.map((image, index) => (
// //                       <div key={image.id} className="image-wrapper">
// //                         <img
// //                           src={image.url}
// //                           alt={`product-image-${index}`}
// //                           className="product-image"
// //                         />
// //                         <div className="image-actions">
// //                           <Button
// //                             onClick={() => onDeleteImage(image.id)}
// //                             loading={deletingProduct.includes(image.id)}
// //                           >
// //                             Delete
// //                           </Button>
// //                           <Button onClick={() => updateProduct(image.id)}>
// //                             Update Image
// //                           </Button>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </td>
// //               <td>
// //
// //                 <div className="oction__buttons">
// //                   <FontAwesomeIcon
// //                     icon={faPenToSquare}
// //                     className="oction__toggle"
// //                     onClick={updateProduct}
// //                   >
// //                   </FontAwesomeIcon>
// //                   <FontAwesomeIcon
// //                     icon={faTrash}
// //                     className="oction__delete"
// //                     onClick={() => setIsClearModalOpen(true)}
// //                   >
// //                   </FontAwesomeIcon>
// //                   <ClearCartModal
// //                     isOpen={isClearModalOpen}
// //                     onClose={onClearCancel}
// //                     onConfirm={onClearConfirm}
// //                     desc={"Are you sure you want to delete the product?"}
// //                     loading={loading}
// //                   />
// //                 </div>
// //                 {!_.isEmpty(product) && <DiscountProduct product={product}/>}
// //                 {/*<Link to={"/discount"}>*/}
// //                 {/*  Discount*/}
// //                 {/*</Link>*/}
// //               </td>
// //             </tr>
// //             </tbody>
// //           </table>
// //
// //
// //
// //
// //           <p className="productdiscount">
// //             {!_.isEmpty(discount) && (
// //               <div className="product-discount">
// //                 <p>
// //                   <span className="original-price">Original Price: ${price}</span>
// //                   <span className="discounted-price">
// //                     Discounted Price: ${discount.discountPrice}
// //                   </span>
// //                 </p>
// //                 <p>Discount: {discount.discountPercentage}% off</p>
// //                 <p>
// //                   Valid from {moment(discount.startDate).format('LL')} to{' '}
// //                   {moment(discount.endDate).format('LL')}
// //                 </p>
// //                 <Button>Change discount</Button>
// //               </div>
// //             )}
// //           </p>
// //         </Link>
// //
// //         <div className="adminActions">
// //           <Button onClick={updateProduct}>Update Product</Button>
// //
// //           <Button
// //             className="deleteButton"
// //             onClick={() => setIsClearModalOpen(true)}
// //           >
// //             Delete Product
// //           </Button>
// //
// //           <ClearCartModal
// //             isOpen={isClearModalOpen}
// //             onClose={onClearCancel}
// //             onConfirm={onClearConfirm}
// //             desc={"Are you sure you want to delete the product?"}
// //             loading={loading}
// //           />
// //         </div>
// //
// //         <div className="product-form">
// //           <Modal isOpen={!_.isEmpty(modalInfo)} onClose={onClose} className={"big"}>
// //             <form onSubmit={onSaveData}>
// //               {formFields.map((field) => (
// //                 <div key={field.name} className="form-group">
// //                   <label htmlFor={field.name}>{field.label}</label>
// //                   {field.type === 'textarea' ? (
// //                     <textarea
// //                       id={field.name}
// //                       name={field.name}
// //                       value={modalInfo[field.name]}
// //                       onChange={({target: {value}}) => dispatch(changeModalInfo({path: field.name, value}))}/>
// //                   ) : (
// //                     <Input
// //                       type={field.type}
// //                       id={field.name}
// //                       name={field.name}
// //                       value={modalInfo[field.name]}
// //                       onChange={({target: {value}}) => dispatch(changeModalInfo({path: field.name, value}))}
// //                     />
// //                   )}
// //                   {modalInfoError?.[field.name] && (
// //                     <div className="validation-info">{modalInfoError[field.name]}</div>
// //                   )}
// //                 </div>
// //               ))}
// //
// //               {/* Image upload field */}
// //               <div className="form-group">
// //                 <label htmlFor="productImage">Product Images</label>
// //                 <input
// //                   type="file"
// //                   id="productImage"
// //                   name="productImage"
// //                   multiple
// //                   onChange={uploadFile}
// //                 />
// //                 {previewImg.length > 0 && (
// //                   <div className="image-previews">
// //                     {previewImg.map((url, index) => (
// //                       <img key={index} src={url} alt={`preview-${index}`} width="100"/>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //
// //               <Button type="submit"
// //                 // disabled={!_.isEmpty(modalInfoError)}
// //                       loading={modalInfoStatus}>
// //                 Save
// //               </Button>
// //             </form>
// //           </Modal>
// //         </div>
// //       </div>
// //     )
// //   );
// // };
// //
// // export default AdminProduct;
// //
// //
//
//
//
// //verj
//
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
//
//
// import { Link } from "react-router-dom";
// import _ from "lodash";
// import {changeModalInfo, deleteImageRequest, setModalInfo} from "../store/actions/adminProduct";
// import moment from "moment";
// import Button from "./Button";
// import Modal from "./Modal";
// import Input from "./Input";
// import ClearCartModal from "./ClearCardModal";
// import ProductModalForm from "./ProductModalForm";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
// import DiscountProduct from "./pages/DiscountProduct";
//
// const formFields = [
//   { label: 'Product Name', name: 'name', type: 'text' },
//   { label: 'Size', name: 'size', type: 'text' },
//   { label: 'Price', name: 'price', type: 'text' },
//   { label: 'Description', name: 'description', type: 'textarea' },
//   { label: 'Brand Name', name: 'brandName', type: 'text' },
//   {label: 'Quantity', name: 'quantity', type: 'text'},
// ];
//
// const AdminProduct = ({ product, onDeleteProduct, onSaveData}) => {
//   const { id, name, size, price, description, brandName, createdAt, updatedAt, productImage, quantity, discount,imageId } = product;
//
//   const dispatch = useDispatch();
//   const loading = useSelector((state) => state.products.productStatus);
//   const modalInfo = useSelector((state) => state.products.modalInfo);
//   const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
//   const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);
//   const deletingProduct = useSelector((state) => state.products.deletingProduct);
//
//   const [isClearModalOpen, setIsClearModalOpen] = useState(false);
//   const [previewImg, setPreviewImg] = useState([]);
//
//   const [prodImage, setProdImage] = useState([]);
//
//   const [viewImg, setViewImg] = useState(false);
//
//
//   // Generate preview URLs for the selected images
//   // useEffect(() => {
//   //   // if (modalInfo.productImage) {
//   //   //   const previewUrls = modalInfo.productImage.map(file => file._preview); // Use the preview URL added to the file
//   //   //   setPreviewImg(previewUrls);
//   //   // }
//   //
//   //   return () => {
//   //     previewImg.forEach(url => URL.revokeObjectURL(url));
//   //   };
//   // }, [modalInfo.productImage]);
//   //
//
//   const uploadFile = async ({ target }) => {
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
//   const updateProduct = () => {
//     dispatch(setModalInfo({
//       id,
//       name,
//       size,
//       price: parseFloat(price),
//       description,
//       brandName,
//       quantity,
//       imageId: imageId || " "
//     }));
//   };
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
//     if (_.isEmpty(modalInfoError)){
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
//   return (
//     !_.isEmpty(product) && (
//       <div className="product-details" key={id}>
//           <table className="product-table">
//             <thead>
//             <tr>
//               <th>Name</th>
//               <th>Brand</th>
//               <th>Description</th>
//               <th>Size</th>
//               <th>Store</th>
//               <th>Images</th>
//               <th>Actions</th>
//             </tr>
//             </thead>
//             <tbody>
//             <tr>
//               <td>{name}</td>
//               <td>{brandName}</td>
//               <td>{description}</td>
//               <td>{size}</td>
//               <td>{product.store?.name}</td>
//               <td>
//                 {!!productImage?.length && (
//                   <>
//                     <div className="image-wrapper">
//                       <img
//                         src={productImage[0].path}
//                         alt={`product-image-${productImage[0]}`}
//                         className="product-image_table"
//                       />
//                       {console.log(productImage.length - 1)}
//
//
//                     </div>
//                     <p className="product-image-count">
//                       <p>
//                         <p>
//                           {productImage.length > 1 ? `+ ${productImage.length - 1} image` : ""}
//                         </p>
//                       </p>
//                     </p>
//                   </>
//
//                 )}
//
//                 {/*{productImage.map((image, index) => (*/}
//                 {/*  <div key={image.id} className="image-wrapper">*/}
//                 {/*    {console.log(productImage.length-1)}*/}
//                 {/*    <img*/}
//                 {/*      src={image.path}*/}
//                 {/*      alt={`product-image-${index}`}*/}
//                 {/*      className="product-image"*/}
//                 {/*    />*/}
//                 {/*    /!*<div className="image-actions">*!/*/}
//                 {/*    /!*  <Button*!/*/}
//                 {/*    /!*    onClick={() => onDeleteImage(image.id)}*!/*/}
//                 {/*    /!*    loading={deletingProduct.includes(image.id)}*!/*/}
//                 {/*    /!*  >*!/*/}
//                 {/*    /!*    Delete*!/*/}
//                 {/*    /!*  </Button>*!/*/}
//                 {/*    /!*  <Button onClick={() => updateProduct(image.id)}>*!/*/}
//                 {/*    /!*    Update Image*!/*/}
//                 {/*    /!*  </Button>*!/*/}
//                 {/*    /!*</div>*!/*/}
//                 {/*  </div>*/}
//                 {/*))}*/}
//
//               </td>
//               <td>
//
//                 <div className="oction__buttons">
//                   <FontAwesomeIcon
//                     icon={faPenToSquare}
//                     className="oction__toggle"
//                     onClick={updateProduct}
//                   >
//                   </FontAwesomeIcon>
//                   <FontAwesomeIcon
//                     icon={faTrash}
//                     className="oction__delete"
//                     onClick={() => setIsClearModalOpen(true)}
//                   >
//                   </FontAwesomeIcon>
//                   <ClearCartModal
//                     isOpen={isClearModalOpen}
//                     onClose={onClearCancel}
//                     onConfirm={onClearConfirm}
//                     desc={"Are you sure you want to delete the product?"}
//                     loading={loading}
//                   />
//                 </div>
//                 {/*{!_.isEmpty(product) && <DiscountProduct product={product}/>}*/}
//                 {/*<Link to={"/discount"}>*/}
//                 {/*  Discount*/}
//                 {/*</Link>*/}
//               </td>
//             </tr>
//             </tbody>
//           </table>
//
//
//
//
//           {/*<p className="productdiscount">*/}
//           {/*  {!_.isEmpty(discount) && (*/}
//           {/*    <div className="product-discount">*/}
//           {/*      <p>*/}
//           {/*        <span className="original-price">Original Price: ${price}</span>*/}
//           {/*        <span className="discounted-price">*/}
//           {/*          Discounted Price: ${discount.discountPrice}*/}
//           {/*        </span>*/}
//           {/*      </p>*/}
//           {/*      <p>Discount: {discount.discountPercentage}% off</p>*/}
//           {/*      <p>*/}
//           {/*        Valid from {moment(discount.startDate).format('LL')} to{' '}*/}
//           {/*        {moment(discount.endDate).format('LL')}*/}
//           {/*      </p>*/}
//           {/*      <Button>Change discount</Button>*/}
//           {/*    </div>*/}
//           {/*  )}*/}
//           {/*</p>*/}
//
//         <Link to={`/admin/product/${product.id}`} className="view-product-link">View Product</Link>
//         <Link to={`/admin/product/${product.id}`} className="view-product-link">{_.isEmpty(discount) ? "Add discount" : "Change discount"}</Link>
//
//         {/*<div className="adminActions">*/}
//         {/*  <Button onClick={updateProduct}>Update Product</Button>*/}
//
//         {/*  <Button*/}
//         {/*    className="deleteButton"*/}
//         {/*    onClick={() => setIsClearModalOpen(true)}*/}
//         {/*  >*/}
//         {/*    Delete Product*/}
//         {/*  </Button>*/}
//
//         {/*  <ClearCartModal*/}
//         {/*    isOpen={isClearModalOpen}*/}
//         {/*    onClose={onClearCancel}*/}
//         {/*    onConfirm={onClearConfirm}*/}
//         {/*    desc={"Are you sure you want to delete the product?"}*/}
//         {/*    loading={loading}*/}
//         {/*  />*/}
//         {/*</div>*/}
//
//         <div className="product-form">
//           <Modal isOpen={!_.isEmpty(modalInfo)} onClose={onClose} className={"big"}>
//             <form onSubmit={onSaveData}>
//               {formFields.map((field) => (
//                 <div key={field.name} className="form-group">
//                   <label htmlFor={field.name}>{field.label}</label>
//                   {field.type === 'textarea' ? (
//                     <textarea
//                       id={field.name}
//                       name={field.name}
//                       value={modalInfo[field.name]}
//                       onChange={({target: {value}}) => dispatch(changeModalInfo({path: field.name, value}))}/>
//                   ) : (
//                     <Input
//                       type={field.type}
//                       id={field.name}
//                       name={field.name}
//                       value={modalInfo[field.name]}
//                       onChange={({target: {value}}) => dispatch(changeModalInfo({path: field.name, value}))}
//                     />
//                   )}
//                   {modalInfoError?.[field.name] && (
//                     <div className="validation-info">{modalInfoError[field.name]}</div>
//                   )}
//                 </div>
//               ))}
//
//               {/* Image upload field */}
//               <div className="form-group">
//                 <label htmlFor="productImage">Product Images</label>
//                 <input
//                   type="file"
//                   id="productImage"
//                   name="productImage"
//                   multiple
//                   onChange={uploadFile}
//                 />
//                 {previewImg.length > 0 && (
//                   <div className="image-previews">
//                     {previewImg.map((url, index) => (
//                       <img key={index} src={url} alt={`preview-${index}`} width="100"/>
//                     ))}
//                   </div>
//                 )}
//               </div>
//
//               <Button type="submit"
//                 // disabled={!_.isEmpty(modalInfoError)}
//                       loading={modalInfoStatus}>
//                 Save
//               </Button>
//             </form>
//           </Modal>
//         </div>
//       </div>
//     )
//   );
// };
//
// export default AdminProduct;
//
//


import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";


import {Link} from "react-router-dom";
import _ from "lodash";
import {changeModalInfo, deleteImageRequest, setModalInfo} from "../store/actions/adminProduct";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";
import ClearCartModal from "./ClearCardModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import DiscountProduct from "./pages/DiscountProduct";

const formFields = [
  {label: 'Product Name', name: 'name', type: 'text'},
  {label: 'Size', name: 'size', type: 'text'},
  {label: 'Price', name: 'price', type: 'text'},
  {label: 'Description', name: 'description', type: 'textarea'},
  {label: 'Brand Name', name: 'brandName', type: 'text'},
  {label: 'Quantity', name: 'quantity', type: 'text'},
];

const AdminProduct = ({product, onDeleteProduct, onSaveData}) => {
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
  const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
  const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);
  const deletingProduct = useSelector((state) => state.products.deletingProduct);

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState([]);

  const [prodImage, setProdImage] = useState([]);

  const [viewImg, setViewImg] = useState(false);


  // Generate preview URLs for the selected images
  // useEffect(() => {
  //   // if (modalInfo.productImage) {
  //   //   const previewUrls = modalInfo.productImage.map(file => file._preview); // Use the preview URL added to the file
  //   //   setPreviewImg(previewUrls);
  //   // }
  //
  //   return () => {
  //     previewImg.forEach(url => URL.revokeObjectURL(url));
  //   };
  // }, [modalInfo.productImage]);
  //

  const uploadFile = async ({target}) => {
    const files = Array.from(target.files);

    const validFiles = files.filter(file => {
      if (file.size > 1024 * 1024 * 1024) {
        console.log("Image size should be less than 1MB");
        return false;
      } else if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
        console.log('Invalid image type. Only JPEG, PNG, and SVG are allowed.');
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setProdImage(prev => [...prev, ...validFiles]);

      const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
      setPreviewImg(prev => [...prev, ...newPreviewUrls]);

      dispatch(changeModalInfo({
        path: 'productImage',

        value: [...prodImage, ...validFiles],
      }));
    }
  };


  const updateProduct = () => {
    dispatch(setModalInfo({
      id,
      name,
      size,
      price: parseFloat(price),
      description,
      brandName,
      quantity,
    }));
  };

  const updateImage = (imageId ) => {
    dispatch(setModalInfo({
      id,
      name,
      size,
      price: parseFloat(price),
      description,
      brandName,
      quantity,
      imageId
    }));
  };
  const onClearCancel = () => {
    setIsClearModalOpen(false);
  };

  const onClearConfirm = async () => {
    await onDeleteProduct(id);
    setIsClearModalOpen(false);
  };


  const onClose = () => {

    if (_.isEmpty(modalInfoError)) {
      setPreviewImg([])
      dispatch(setModalInfo({}));
    }

  };


  const onDeleteImage = (imageId) => {
    dispatch(deleteImageRequest(imageId));
  };


  return (
    !_.isEmpty(product) && (
      <div className="product-details" key={id}>
        <table className="product-table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Size</th>
            <th>Store</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{name}</td>
            <td>{brandName}</td>
            <td>{description}</td>
            <td>{size}</td>
            <td>{product.store?.name}</td>
            <td>
              {!!productImage?.length && (
                <>
                  <div onClick={() => setViewImg(true)}>
                    <div className="image-wrapper">
                      <img
                        src={productImage[0].path}
                        alt={`product-image-${productImage[0]}`}
                        className="product-image_table"
                      />


                    </div>

                    <div className="product-image-count">
                      {productImage.length - 1 ? `+ ${productImage.length - 1} image` : ""}
                    </div>
                  </div>


                  <Modal isOpen={viewImg} onClose={() => setViewImg(false)}>
                    <div className="image-modal-wrapper">
                      {productImage.map((image, index) => (
                        <div key={image.id} className="image-modal">
                          <img
                            src={image.path}
                            alt={`product-image-${index}`}
                            className="product-image_modal"
                          />

                          <div className="oction__buttons">
                            <Button
                              onClick={() => onDeleteImage(image.id)}
                              loading={deletingProduct.includes(image.id)}
                              className="oction__delete small"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="oction__delete"
                              />
                            </Button>
                            <Button
                              onClick={() => updateImage(image.id)}
                              className="oction__toggle small"
                            >
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="oction__toggle"
                              />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </Modal>

                </>

              )}

              {/*{productImage.map((image, index) => (*/}
              {/*  <div key={image.id} className="image-wrapper">*/}
              {/*    {console.log(productImage.length-1)}*/}
              {/*    <img*/}
              {/*      src={image.path}*/}
              {/*      alt={`product-image-${index}`}*/}
              {/*      className="product-image"*/}
              {/*    />*/}
              {/*    /!*<div className="image-actions">*!/*/}
              {/*    /!*  <Button*!/*/}
              {/*    /!*    onClick={() => onDeleteImage(image.id)}*!/*/}
              {/*    /!*    loading={deletingProduct.includes(image.id)}*!/*/}
              {/*    /!*  >*!/*/}
              {/*    /!*    Delete*!/*/}
              {/*    /!*  </Button>*!/*/}
              {/*    /!*  <Button onClick={() => updateProduct(image.id)}>*!/*/}
              {/*    /!*    Update Image*!/*/}
              {/*    /!*  </Button>*!/*/}
              {/*    /!*</div>*!/*/}
              {/*  </div>*/}
              {/*))}*/}

            </td>
            <td>

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
                  desc={"Are you sure you want to delete the product?"}
                  loading={loading}
                />
              </div>
              {/*{!_.isEmpty(product) && <DiscountProduct product={product}/>}*/}
              {/*<Link to={"/discount"}>*/}
              {/*  Discount*/}
              {/*</Link>*/}
            </td>
          </tr>
          </tbody>
        </table>


        <Link to={`/admin/product/${product.id}`} className="view-product-link">View Product</Link>
        <Link to={`/admin/product/${product.id}`}
              className="view-product-link">{_.isEmpty(discount) ? "Add discount" : "Change discount"}</Link>

        {/*<div className="adminActions">*/}
        {/*  <Button onClick={updateProduct}>Update Product</Button>*/}

        {/*  <Button*/}
        {/*    className="deleteButton"*/}
        {/*    onClick={() => setIsClearModalOpen(true)}*/}
        {/*  >*/}
        {/*    Delete Product*/}
        {/*  </Button>*/}

        {/*  <ClearCartModal*/}
        {/*    isOpen={isClearModalOpen}*/}
        {/*    onClose={onClearCancel}*/}
        {/*    onConfirm={onClearConfirm}*/}
        {/*    desc={"Are you sure you want to delete the product?"}*/}
        {/*    loading={loading}*/}
        {/*  />*/}
        {/*</div>*/}

        <div className="product-form">
          <Modal isOpen={!_.isEmpty(modalInfo)} onClose={onClose} className={"big"}>
            <form onSubmit={onSaveData}>
              {formFields.map((field) => (
                <div key={field.name} className="form-group">
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={modalInfo[field.name]}
                      onChange={({target: {value}}) => dispatch(changeModalInfo({path: field.name, value}))}/>
                  ) : (
                    <Input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={modalInfo[field.name]}
                      onChange={({target: {value}}) => dispatch(changeModalInfo({path: field.name, value}))}
                    />
                  )}
                  {modalInfoError?.[field.name] && (
                    <div className="validation-info">{modalInfoError[field.name]}</div>
                  )}
                </div>
              ))}

              {/* Image upload field */}
              <div className="form-group">
                <label htmlFor="productImage">Product Images</label>
                <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  multiple
                  onChange={uploadFile}
                />
                {previewImg.length > 0 && (
                  <div className="image-previews">
                    {previewImg.map((url, index) => (
                      <img key={index} src={url} alt={`preview-${index}`} width="100"/>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit"
                // disabled={!_.isEmpty(modalInfoError)}
                      loading={modalInfoStatus}>
                Save
              </Button>
            </form>
          </Modal>
        </div>
      </div>
    )
  );
};

export default AdminProduct;
