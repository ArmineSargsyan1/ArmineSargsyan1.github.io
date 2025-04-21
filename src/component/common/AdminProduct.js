// // // import React, { useState, useEffect } from 'react';
// // // import { useDispatch, useSelector } from "react-redux";
// // //
// // //
// // // import { Link } from "react-router-dom";
// // // import _ from "lodash";
// // // import {changeModalInfo, setModalInfo} from "../store/actions/adminProduct";
// // // import moment from "moment";
// // // import Button from "./Button";
// // // import Modal from "./Modal";
// // // import Input from "./Input";
// // // import ClearCartModal from "./ClearCardModal";
// // // import ProductModalForm from "./ProductModalForm";
// // // import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// // // import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
// // // import DiscountProduct from "./pages/DiscountProduct";
// // //
// // // const formFields = [
// // //   { label: 'Product Name', name: 'name', type: 'text' },
// // //   { label: 'Size', name: 'size', type: 'text' },
// // //   { label: 'Price', name: 'price', type: 'text' },
// // //   { label: 'Description', name: 'description', type: 'textarea' },
// // //   { label: 'Brand Name', name: 'brandName', type: 'text' },
// // //   {label: 'Quantity', name: 'quantity', type: 'text'},
// // // ];
// // //
// // // const AdminProduct = ({ product, onDeleteProduct, onSaveData}) => {
// // //   const { id, name, size, price, description, brandName, createdAt, updatedAt, productImage, quantity, discount } = product;
// // //
// // //   const dispatch = useDispatch();
// // //   const loading = useSelector((state) => state.products.productStatus);
// // //   const modalInfo = useSelector((state) => state.products.modalInfo);
// // //   const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
// // //   const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);
// // //
// // //   const [isClearModalOpen, setIsClearModalOpen] = useState(false);
// // //   const [previewImg, setPreviewImg] = useState([]);
// // //
// // //   const [prodImage, setProdImage] = useState([]);
// // //
// // //
// // //   // Generate preview URLs for the selected images
// // //   // useEffect(() => {
// // //   //   // if (modalInfo.productImage) {
// // //   //   //   const previewUrls = modalInfo.productImage.map(file => file._preview); // Use the preview URL added to the file
// // //   //   //   setPreviewImg(previewUrls);
// // //   //   // }
// // //   //
// // //   //   return () => {
// // //   //     previewImg.forEach(url => URL.revokeObjectURL(url));
// // //   //   };
// // //   // }, [modalInfo.productImage]);
// // //   //
// // //
// // //   const uploadFile = async ({ target }) => {
// // //     const files = Array.from(target.files);
// // //
// // //     const validFiles = files.filter(file => {
// // //       if (file.size > 1024 * 1024 * 1024) {
// // //         console.log("Image size should be less than 1MB");
// // //         return false;
// // //       } else if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
// // //         console.log('Invalid image type. Only JPEG, PNG, and SVG are allowed.');
// // //         return false;
// // //       }
// // //       return true;
// // //     });
// // //
// // //     if (validFiles.length > 0) {
// // //       setProdImage(prev => [...prev, ...validFiles]);
// // //
// // //       const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
// // //       setPreviewImg(prev => [...prev, ...newPreviewUrls]);
// // //
// // //       dispatch(changeModalInfo({
// // //         path: 'productImage',
// // //
// // //         value: [...prodImage, ...validFiles],
// // //       }));
// // //     }
// // //   };
// // //
// // //
// // //   const updateProduct = () => {
// // //     dispatch(setModalInfo({
// // //       id,
// // //       name,
// // //       size,
// // //       price: parseFloat(price),
// // //       description,
// // //       brandName,
// // //       quantity,
// // //       imageId: " "
// // //     }));
// // //   };
// // //
// // //   const onClearCancel = () => {
// // //     setIsClearModalOpen(false);
// // //   };
// // //
// // //   const onClearConfirm = async () => {
// // //     await onDeleteProduct(id);
// // //     setIsClearModalOpen(false);
// // //   };
// // //
// // //
// // //   const onClose = () => {
// // //
// // //     if (_.isEmpty(modalInfoError)){
// // //       setPreviewImg([])
// // //       dispatch(setModalInfo({}));
// // //     }
// // //
// // //   };
// // //
// // //
// // //   return (
// // //     !_.isEmpty(product) && (
// // //       <div className="product-details" key={id}>
// // //         <Link to={`/admin/product/${product.id}`}>
// // //           <div className="product-header">
// // //             <h2>{name}</h2>
// // //             <p>Brand: {brandName}</p>
// // //             <p>Description: {description}</p>
// // //           </div>
// // //
// // //           {/*<div className="product-images">*/}
// // //           {/*  {!!productImage?.length &&*/}
// // //           {/*    productImage.map((image, index) => (*/}
// // //           {/*      <>*/}
// // //           {/*        <img*/}
// // //           {/*          key={image.id}*/}
// // //           {/*          src={image.path}*/}
// // //           {/*          alt={`product-image-${index}`}*/}
// // //           {/*          className="product-image"*/}
// // //           {/*        />*/}
// // //           {/*      </>*/}
// // //
// // //           {/*    ))}*/}
// // //           {/*</div>*/}
// // //
// // //           {/*<div className="product-info">*/}
// // //           {/*  <p>Size: {size}</p>*/}
// // //           {/*  <p>Store: {product.store?.name}</p>*/}
// // //           {/*  <p>Price: {price}$</p>*/}
// // //           {/*  <p>Quantity: {quantity}</p>*/}
// // //           {/*  <p>Created At: {moment(createdAt).format('LL')}</p>*/}
// // //           {/*  <p>Updated At: {moment(updatedAt).format('LL')}</p>*/}
// // //           {/*</div>*/}
// // //
// // //
// // //           <h2>Product</h2>
// // //           <table className="product-table">
// // //             <thead>
// // //             <tr>
// // //               <th>Name</th>
// // //               <th>Brand</th>
// // //               <th>Description</th>
// // //               <th>Size</th>
// // //               <th>Store</th>
// // //               <th>Images</th>
// // //               <th>Actions</th>
// // //             </tr>
// // //             </thead>
// // //             <tbody>
// // //             <tr>
// // //               <td>{name}</td>
// // //               <td>{brandName}</td>
// // //               <td>{description}</td>
// // //               <td>{size}</td>
// // //               <td>{product.store?.name}</td>
// // //               <td>
// // //                 {!!product?.images?.length && (
// // //                   <div className="product-images">
// // //                     {images.map((image, index) => (
// // //                       <div key={image.id} className="image-wrapper">
// // //                         <img
// // //                           src={image.url}
// // //                           alt={`product-image-${index}`}
// // //                           className="product-image"
// // //                         />
// // //                         <div className="image-actions">
// // //                           <Button
// // //                             onClick={() => onDeleteImage(image.id)}
// // //                             loading={deletingProduct.includes(image.id)}
// // //                           >
// // //                             Delete
// // //                           </Button>
// // //                           <Button onClick={() => updateProduct(image.id)}>
// // //                             Update Image
// // //                           </Button>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </td>
// // //               <td>
// // //
// // //                 <div className="oction__buttons">
// // //                   <FontAwesomeIcon
// // //                     icon={faPenToSquare}
// // //                     className="oction__toggle"
// // //                     onClick={updateProduct}
// // //                   >
// // //                   </FontAwesomeIcon>
// // //                   <FontAwesomeIcon
// // //                     icon={faTrash}
// // //                     className="oction__delete"
// // //                     onClick={() => setIsClearModalOpen(true)}
// // //                   >
// // //                   </FontAwesomeIcon>
// // //                   <ClearCartModal
// // //                     isOpen={isClearModalOpen}
// // //                     onClose={onClearCancel}
// // //                     onConfirm={onClearConfirm}
// // //                     desc={"Are you sure you want to delete the product?"}
// // //                     loading={loading}
// // //                   />
// // //                 </div>
// // //                 {!_.isEmpty(product) && <DiscountProduct product={product}/>}
// // //                 {/*<Link to={"/discount"}>*/}
// // //                 {/*  Discount*/}
// // //                 {/*</Link>*/}
// // //               </td>
// // //             </tr>
// // //             </tbody>
// // //           </table>
// // //
// // //
// // //
// // //
// // //           <p className="productdiscount">
// // //             {!_.isEmpty(discount) && (
// // //               <div className="product-discount">
// // //                 <p>
// // //                   <span className="original-price">Original Price: ${price}</span>
// // //                   <span className="discounted-price">
// // //                     Discounted Price: ${discount.discountPrice}
// // //                   </span>
// // //                 </p>
// // //                 <p>Discount: {discount.discountPercentage}% off</p>
// // //                 <p>
// // //                   Valid from {moment(discount.startDate).format('LL')} to{' '}
// // //                   {moment(discount.endDate).format('LL')}
// // //                 </p>
// // //                 <Button>Change discount</Button>
// // //               </div>
// // //             )}
// // //           </p>
// // //         </Link>
// // //
// // //         <div className="adminActions">
// // //           <Button onClick={updateProduct}>Update Product</Button>
// // //
// // //           <Button
// // //             className="deleteButton"
// // //             onClick={() => setIsClearModalOpen(true)}
// // //           >
// // //             Delete Product
// // //           </Button>
// // //
// // //           <ClearCartModal
// // //             isOpen={isClearModalOpen}
// // //             onClose={onClearCancel}
// // //             onConfirm={onClearConfirm}
// // //             desc={"Are you sure you want to delete the product?"}
// // //             loading={loading}
// // //           />
// // //         </div>
// // //
// // //         <div className="product-form">
// // //           <Modal isOpen={!_.isEmpty(modalInfo)} onClose={onClose} className={"big"}>
// // //             <form onSubmit={onSaveData}>
// // //               {formFields.map((field) => (
// // //                 <div key={field.name} className="form-group">
// // //                   <label htmlFor={field.name}>{field.label}</label>
// // //                   {field.type === 'textarea' ? (
// // //                     <textarea
// // //                       id={field.name}
// // //                       name={field.name}
// // //                       value={modalInfo[field.name]}
// // //                       onChange={({target: {value}}) => dispatch(changeModalInfo({path: field.name, value}))}/>
// // //                   ) : (
// // //                     <Input
// // //                       type={field.type}
// // //                       id={field.name}
// // //                       name={field.name}
// // //                       value={modalInfo[field.name]}
// // //                       onChange={({target: {value}}) => dispatch(changeModalInfo({path: field.name, value}))}
// // //                     />
// // //                   )}
// // //                   {modalInfoError?.[field.name] && (
// // //                     <div className="validation-info">{modalInfoError[field.name]}</div>
// // //                   )}
// // //                 </div>
// // //               ))}
// // //
// // //               {/* Image upload field */}
// // //               <div className="form-group">
// // //                 <label htmlFor="productImage">Product Images</label>
// // //                 <input
// // //                   type="file"
// // //                   id="productImage"
// // //                   name="productImage"
// // //                   multiple
// // //                   onChange={uploadFile}
// // //                 />
// // //                 {previewImg.length > 0 && (
// // //                   <div className="image-previews">
// // //                     {previewImg.map((url, index) => (
// // //                       <img key={index} src={url} alt={`preview-${index}`} width="100"/>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //
// // //               <Button type="submit"
// // //                 // disabled={!_.isEmpty(modalInfoError)}
// // //                       loading={modalInfoStatus}>
// // //                 Save
// // //               </Button>
// // //             </form>
// // //           </Modal>
// // //         </div>
// // //       </div>
// // //     )
// // //   );
// // // };
// // //
// // // export default AdminProduct;
// // //
// // //
// //
// //
// //
// // //verj
// //
// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from "react-redux";
// //
// //
// // import { Link } from "react-router-dom";
// // import _ from "lodash";
// // import {changeModalInfo, deleteImageRequest, setModalInfo} from "../store/actions/adminProduct";
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
// //   const { id, name, size, price, description, brandName, createdAt, updatedAt, productImage, quantity, discount,imageId } = product;
// //
// //   const dispatch = useDispatch();
// //   const loading = useSelector((state) => state.products.productStatus);
// //   const modalInfo = useSelector((state) => state.products.modalInfo);
// //   const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
// //   const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);
// //   const deletingProduct = useSelector((state) => state.products.deletingProduct);
// //
// //   const [isClearModalOpen, setIsClearModalOpen] = useState(false);
// //   const [previewImg, setPreviewImg] = useState([]);
// //
// //   const [prodImage, setProdImage] = useState([]);
// //
// //   const [viewImg, setViewImg] = useState(false);
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
// //       imageId: imageId || " "
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
// //   const onDeleteImage = (imageId) => {
// //     dispatch(deleteImageRequest(imageId));
// //   };
// //
// //
// //   return (
// //     !_.isEmpty(product) && (
// //       <div className="product-details" key={id}>
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
// //                 {!!productImage?.length && (
// //                   <>
// //                     <div className="image-wrapper">
// //                       <img
// //                         src={productImage[0].path}
// //                         alt={`product-image-${productImage[0]}`}
// //                         className="product-image_table"
// //                       />
// //                       {console.log(productImage.length - 1)}
// //
// //
// //                     </div>
// //                     <p className="product-image-count">
// //                       <p>
// //                         <p>
// //                           {productImage.length > 1 ? `+ ${productImage.length - 1} image` : ""}
// //                         </p>
// //                       </p>
// //                     </p>
// //                   </>
// //
// //                 )}
// //
// //                 {/*{productImage.map((image, index) => (*/}
// //                 {/*  <div key={image.id} className="image-wrapper">*/}
// //                 {/*    {console.log(productImage.length-1)}*/}
// //                 {/*    <img*/}
// //                 {/*      src={image.path}*/}
// //                 {/*      alt={`product-image-${index}`}*/}
// //                 {/*      className="product-image"*/}
// //                 {/*    />*/}
// //                 {/*    /!*<div className="image-actions">*!/*/}
// //                 {/*    /!*  <Button*!/*/}
// //                 {/*    /!*    onClick={() => onDeleteImage(image.id)}*!/*/}
// //                 {/*    /!*    loading={deletingProduct.includes(image.id)}*!/*/}
// //                 {/*    /!*  >*!/*/}
// //                 {/*    /!*    Delete*!/*/}
// //                 {/*    /!*  </Button>*!/*/}
// //                 {/*    /!*  <Button onClick={() => updateProduct(image.id)}>*!/*/}
// //                 {/*    /!*    Update Image*!/*/}
// //                 {/*    /!*  </Button>*!/*/}
// //                 {/*    /!*</div>*!/*/}
// //                 {/*  </div>*/}
// //                 {/*))}*/}
// //
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
// //                 {/*{!_.isEmpty(product) && <DiscountProduct product={product}/>}*/}
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
// //           {/*<p className="productdiscount">*/}
// //           {/*  {!_.isEmpty(discount) && (*/}
// //           {/*    <div className="product-discount">*/}
// //           {/*      <p>*/}
// //           {/*        <span className="original-price">Original Price: ${price}</span>*/}
// //           {/*        <span className="discounted-price">*/}
// //           {/*          Discounted Price: ${discount.discountPrice}*/}
// //           {/*        </span>*/}
// //           {/*      </p>*/}
// //           {/*      <p>Discount: {discount.discountPercentage}% off</p>*/}
// //           {/*      <p>*/}
// //           {/*        Valid from {moment(discount.startDate).format('LL')} to{' '}*/}
// //           {/*        {moment(discount.endDate).format('LL')}*/}
// //           {/*      </p>*/}
// //           {/*      <Button>Change discount</Button>*/}
// //           {/*    </div>*/}
// //           {/*  )}*/}
// //           {/*</p>*/}
// //
// //         <Link to={`/admin/product/${product.id}`} className="view-product-link">View Product</Link>
// //         <Link to={`/admin/product/${product.id}`} className="view-product-link">{_.isEmpty(discount) ? "Add discount" : "Change discount"}</Link>
// //
// //         {/*<div className="adminActions">*/}
// //         {/*  <Button onClick={updateProduct}>Update Product</Button>*/}
// //
// //         {/*  <Button*/}
// //         {/*    className="deleteButton"*/}
// //         {/*    onClick={() => setIsClearModalOpen(true)}*/}
// //         {/*  >*/}
// //         {/*    Delete Product*/}
// //         {/*  </Button>*/}
// //
// //         {/*  <ClearCartModal*/}
// //         {/*    isOpen={isClearModalOpen}*/}
// //         {/*    onClose={onClearCancel}*/}
// //         {/*    onConfirm={onClearConfirm}*/}
// //         {/*    desc={"Are you sure you want to delete the product?"}*/}
// //         {/*    loading={loading}*/}
// //         {/*  />*/}
// //         {/*</div>*/}
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
// //
// // import React, {useState, useEffect} from 'react';
// // import {useDispatch, useSelector} from "react-redux";
// //
// //
// // import {Link} from "react-router-dom";
// // import _ from "lodash";
// // import {changeModalInfo, deleteImageRequest, setModalInfo} from "../store/actions/adminProduct";
// // import Button from "./Button";
// // import Modal from "./Modal";
// // import Input from "./Input";
// // import ClearCartModal from "./ClearCardModal";
// // import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// // import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
// // import DiscountProduct from "./pages/DiscountProduct";
// //
// // const formFields = [
// //   {label: 'Product Name', name: 'name', type: 'text'},
// //   {label: 'Size', name: 'size', type: 'text'},
// //   {label: 'Price', name: 'price', type: 'text'},
// //   {label: 'Description', name: 'description', type: 'textarea'},
// //   {label: 'Brand Name', name: 'brandName', type: 'text'},
// //   {label: 'Quantity', name: 'quantity', type: 'text'},
// // ];
// //
// // const AdminProduct = ({product, onDeleteProduct, onSaveData}) => {
// //   const {
// //     id,
// //     name,
// //     size,
// //     price,
// //     description,
// //     brandName,
// //     createdAt,
// //     updatedAt,
// //     productImage,
// //     quantity,
// //     discount,
// //     imageId
// //   } = product;
// //
// //   const dispatch = useDispatch();
// //   const loading = useSelector((state) => state.products.productStatus);
// //   const modalInfo = useSelector((state) => state.products.modalInfo);
// //   const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
// //   const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);
// //   const deletingProduct = useSelector((state) => state.products.deletingProduct);
// //
// //   const [isClearModalOpen, setIsClearModalOpen] = useState(false);
// //   const [previewImg, setPreviewImg] = useState([]);
// //
// //   const [prodImage, setProdImage] = useState([]);
// //
// //   const [viewImg, setViewImg] = useState(false);
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
// //   const uploadFile = async ({target}) => {
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
// //     }));
// //   };
// //
// //   const updateImage = (imageId) => {
// //     dispatch(setModalInfo({
// //       id,
// //       name,
// //       size,
// //       price: parseFloat(price),
// //       description,
// //       brandName,
// //       quantity,
// //       imageId
// //     }));
// //   };
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
// //     if (_.isEmpty(modalInfoError)) {
// //       setPreviewImg([])
// //       dispatch(setModalInfo({}));
// //     }
// //
// //   };
// //
// //
// //   const onDeleteImage = (imageId) => {
// //     dispatch(deleteImageRequest(imageId));
// //   };
// //   console.log(product)
// //
// //   return (
// //     !_.isEmpty(product) && (
// //       <div className="product-details" key={id}>
// //         <table className="product-table">
// //           <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Price</th>
// //             <th>Brand</th>
// //             <th>Description</th>
// //             <th>Size</th>
// //             <th>Quantity</th>
// //             <th>Discount persentage</th>
// //             <th>Images</th>
// //             <th>Actions</th>
// //           </tr>
// //           </thead>
// //           <tbody>
// //           <tr>
// //             <td>{name}</td>
// //             <td>{price}</td>
// //             <td>{brandName}</td>
// //             <td>{description}</td>
// //             <td>{size}</td>
// //             <td>{quantity}</td>
// //             <td>{discount?.discountPercentage ? discount.discountPercentage : "_"}</td>
// //             <td>
// //               {!!productImage?.length && (
// //                 <>
// //                   <div onClick={() => setViewImg(true)}>
// //                     <div className="image-wrapper">
// //                       <img
// //                         src={productImage[0].path}
// //                         alt={`product-image-${productImage[0]}`}
// //                         className="product-image_table"
// //                       />
// //
// //
// //                     </div>
// //
// //                     <div className="product-image-count">
// //                       {productImage.length > 1 ? `${productImage.length - 1} image` : ""}
// //                     </div>
// //                   </div>
// //
// //
// //                   <Modal isOpen={viewImg} onClose={() => setViewImg(false)}>
// //                     <div className="image-modal-wrapper">
// //                       {productImage.map((image, index) => (
// //                         <div key={image.id} className="image-modal">
// //                           <img
// //                             src={image.path}
// //                             alt={`product-image-${index}`}
// //                             className="product-image_modal"
// //                           />
// //
// //                           <div className="oction__buttons">
// //                             <Button
// //                               onClick={() => onDeleteImage(image.id)}
// //                               loading={deletingProduct.includes(image.id)}
// //                               className="oction__delete small"
// //                             >
// //                               <FontAwesomeIcon
// //                                 icon={faTrash}
// //                                 className="oction__delete"
// //                               />
// //                             </Button>
// //                             <Button
// //                               onClick={() => updateImage(image.id)}
// //                               className="oction__toggle small"
// //                             >
// //                               <FontAwesomeIcon
// //                                 icon={faPenToSquare}
// //                                 className="oction__toggle"
// //                               />
// //                             </Button>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //
// //                   </Modal>
// //
// //                 </>
// //
// //               )}
// //             </td>
// //             <td>
// //
// //               <div className="oction__buttons">
// //
// //                 <FontAwesomeIcon
// //                   icon={faPenToSquare}
// //                   className="oction__toggle"
// //                   onClick={updateProduct}
// //                 >
// //                 </FontAwesomeIcon>
// //                 <FontAwesomeIcon
// //                   icon={faTrash}
// //                   className="oction__delete"
// //                   onClick={() => setIsClearModalOpen(true)}
// //                 >
// //                 </FontAwesomeIcon>
// //                 <ClearCartModal
// //                   isOpen={isClearModalOpen}
// //                   onClose={onClearCancel}
// //                   onConfirm={onClearConfirm}
// //                   desc={"Are you sure you want to delete the product?"}
// //                   loading={loading}
// //                 />
// //               </div>
// //               {/*{!_.isEmpty(product) && <DiscountProduct product={product}/>}*/}
// //               {/*<Link to={"/discount"}>*/}
// //               {/*  Discount*/}
// //               {/*</Link>*/}
// //             </td>
// //           </tr>
// //           </tbody>
// //         </table>
// //
// //
// //         <Link to={`/admin/product/${product.id}`} className="view-product-link">View Product</Link>
// //         <Link to={`/admin/product/${product.id}`}
// //               className="view-product-link">{_.isEmpty(discount) ? "Add discount" : "Change discount"}</Link>
// //
// //         {/*<div className="adminActions">*/}
// //         {/*  <Button onClick={updateProduct}>Update Product</Button>*/}
// //
// //         {/*  <Button*/}
// //         {/*    className="deleteButton"*/}
// //         {/*    onClick={() => setIsClearModalOpen(true)}*/}
// //         {/*  >*/}
// //         {/*    Delete Product*/}
// //         {/*  </Button>*/}
// //
// //         {/*  <ClearCartModal*/}
// //         {/*    isOpen={isClearModalOpen}*/}
// //         {/*    onClose={onClearCancel}*/}
// //         {/*    onConfirm={onClearConfirm}*/}
// //         {/*    desc={"Are you sure you want to delete the product?"}*/}
// //         {/*    loading={loading}*/}
// //         {/*  />*/}
// //         {/*</div>*/}
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
//
//
//
//
//
// // import React, {useState} from 'react';
// // import {useDispatch, useSelector} from "react-redux";
// // import {Link} from "react-router-dom";
// // import _ from "lodash";
// // import {changeModalInfo, deleteImageRequest, setModalInfo} from "../store/actions/adminProduct";
// // import Button from "./Button";
// // import Modal from "./Modal";
// // import Input from "./Input";
// // import ClearCartModal from "./ClearCardModal";
// // import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// // import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
// //
// // const formFields = [
// //   {label: 'Product Name', name: 'name', type: 'text'},
// //   {label: 'Size', name: 'size', type: 'text'},
// //   {label: 'Price', name: 'price', type: 'text'},
// //   {label: 'Description', name: 'description', type: 'textarea'},
// //   {label: 'Brand Name', name: 'brandName', type: 'text'},
// //   {label: 'Quantity', name: 'quantity', type: 'text'},
// // ];
// //
// // const AdminProduct = ({product, onDeleteProduct, onSaveData}) => {
// //   const {
// //     id,
// //     name,
// //     size,
// //     price,
// //     description,
// //     brandName,
// //     productImage,
// //     quantity,
// //     discount,
// //   } = product;
// //
// //   const dispatch = useDispatch();
// //   const loading = useSelector((state) => state.products.productStatus);
// //   const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
// //   const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);
// //    const modalInfo = useSelector((state) => state.products.modalInfo);
// //
// //   const deletingProduct = useSelector((state) => state.products.deletingProduct);
// //
// //   const [isClearModalOpen, setIsClearModalOpen] = useState(false);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [previewImg, setPreviewImg] = useState([]);
// //   const [prodImage, setProdImage] = useState([]);
// //   const [imageId, setImageId] = useState("");
// //
// //   const uploadFile = ({target}) => {
// //     const files = Array.from(target.files);
// //     const validFiles = files.filter(file => {
// //       if (file.size > 1024 * 1024) {
// //         console.log("Image size should be less than 1MB");
// //         // return false;
// //       } else if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
// //         console.log('Invalid image type. Only JPEG, PNG, and SVG are allowed.');
// //         // return false;
// //       }
// //       return true;
// //     });
// //
// //     if (validFiles.length > 0) {
// //       setProdImage(prev => [...prev, ...validFiles]);
// //       const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
// //       setPreviewImg(prev => [...prev, ...newPreviewUrls]);
// //
// //       dispatch(changeModalInfo({
// //         path: 'productImage',
// //         value: [...prodImage, ...validFiles],
// //       }));
// //     }
// //   };
// //
// //   const openEditModal = () => {
// //     dispatch(setModalInfo({
// //       id,
// //       name,
// //       size,
// //       price: parseFloat(price),
// //       description,
// //       brandName,
// //       quantity,
// //       imageId: imageId && imageId != " " ? imageId : ""
// //
// //     }));
// //     setIsEditModalOpen(true);
// //   };
// //
// //
// //
// //   const onEditModalClose = () => {
// //     if (_.isEmpty(modalInfoError)) {
// //       // setPreviewImg([]);
// //       // setProdImage([]);
// //       // setIsEditModalOpen(false);
// //       // dispatch(setModalInfo({}));
// //     }
// //   };
// //
// //   const onDeleteImage = (imageId) => {
// //     dispatch(deleteImageRequest(imageId));
// //   };
// //
// //   const onClearConfirm = async () => {
// //     await onDeleteProduct(id);
// //     setIsClearModalOpen(false);
// //   };
// //   const imagesToShow = modalInfo.productImage || productImage;
// //
// //   console.log(imageId)
// //   return (
// //     !_.isEmpty(product) && (
// //       <div className="product-details" key={id}>
// //         <table className="product-table">
// //           <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Price</th>
// //             <th>Brand</th>
// //             <th>Description</th>
// //             <th>Size</th>
// //             <th>Quantity</th>
// //             <th>Discount %</th>
// //             <th>Images</th>
// //             <th>Actions</th>
// //           </tr>
// //           </thead>
// //           <tbody>
// //           <tr>
// //             <td>{name}</td>
// //             <td>{price}</td>
// //             <td>{brandName}</td>
// //             <td>{description}</td>
// //             <td>{size}</td>
// //             <td>{quantity}</td>
// //             <td>{discount?.discountPercentage || "_"}</td>
// //             {/*<td>*/}
// //             {/*  {productImage?.length > 0 && (*/}
// //             {/*    <img*/}
// //             {/*      src={productImage[0].path}*/}
// //             {/*      alt={`product-thumbnail`}*/}
// //             {/*      className="product-image_table"*/}
// //             {/*    />*/}
// //             {/*  )}*/}
// //             {/*</td>*/}
// //             <td>
// //               {!!productImage?.length && (
// //                 <>
// //                   <div className="image-wrapper">
// //                     <img
// //                       src={productImage[0].path}
// //                       alt={`product-image-${productImage[0]}`}
// //                       className="product-image_table"
// //                     />
// //                     {console.log(productImage.length - 1)}
// //
// //
// //                   </div>
// //                   <p className="product-image-count">
// //                     <p>
// //                       <p>
// //                         {productImage.length > 1 ? `+ ${productImage.length - 1} image` : ""}
// //                       </p>
// //                     </p>
// //                   </p>
// //                 </>
// //
// //               )}
// //
// //             </td>
// //             <td>
// //               <div className="oction__buttons">
// //                 <FontAwesomeIcon icon={faPenToSquare} className="oction__toggle" onClick={openEditModal}/>
// //                 <FontAwesomeIcon icon={faTrash} className="oction__delete" onClick={() => setIsClearModalOpen(true)}/>
// //               </div>
// //
// //               <ClearCartModal
// //                 isOpen={isClearModalOpen}
// //                 onClose={() => setIsClearModalOpen(false)}
// //                 onConfirm={onClearConfirm}
// //                 desc={"Are you sure you want to delete the product?"}
// //                 loading={loading}
// //               />
// //             </td>
// //           </tr>
// //           </tbody>
// //         </table>
// //
// //         <Link to={`/admin/product/${product.id}`} className="view-product-link">View Product</Link>
// //         <Link to={`/admin/product/${product.id}`} className="view-product-link">
// //           {_.isEmpty(discount) ? "Add discount" : "Change discount"}
// //         </Link>
// //
// //         <Modal isOpen={isEditModalOpen} onClose={onEditModalClose} className={"big"}>
// //           <form onSubmit={onSaveData}>
// //             {formFields.map((field) => (
// //               <div key={field.name} className="form-group">
// //                 <label htmlFor={field.name}>{field.label}</label>
// //                 {field.type === 'textarea' ? (
// //                   <textarea
// //                     id={field.name}
// //                     name={field.name}
// //                     value={modalInfo[field.name] || ""}
// //                     onChange={({target: {value}}) =>
// //                       dispatch(changeModalInfo({path: field.name, value}))
// //                     }
// //                   />
// //                 ) : (
// //                   <Input
// //                     type={field.type}
// //                     id={field.name}
// //                     name={field.name}
// //                     value={modalInfo[field.name] || ""}
// //                     onChange={({target: {value}}) =>
// //                       dispatch(changeModalInfo({path: field.name, value}))
// //                     }
// //                   />
// //                 )}
// //                 {modalInfoError?.[field.name] && (
// //                   <div className="validation-info">{modalInfoError[field.name]}</div>
// //                 )}
// //               </div>
// //             ))}
// //
// //
// //             <div className="form-group">
// //               <label htmlFor="productImage">Product Images</label>
// //               <input type="file" id="productImage" name="productImage" multiple onChange={uploadFile}/>
// //               <div className="image-previews">
// //                 {previewImg.length && previewImg.map((url, index) => (
// //                   <img key={index} src={url} alt={`preview-${index}`} width="100"/>
// //                 ))}
// //               </div>
// //
// //               <div className="image-modal-wrapper">
// //                 {!!imagesToShow?.length && imagesToShow.map((image, index) => (
// //                   <div key={image.id || index} className="image-modal">
// //                     <img
// //                       src={image.path || URL.createObjectURL(image)}
// //                       alt={`product-image-${index}`}
// //                       className="product-image_modal"
// //                     />
// //                     <div className="oction__buttons">
// //                       {image.path && (
// //                         <Button
// //                           onClick={() => onDeleteImage(image.id)}
// //                           loading={deletingProduct.includes(image.id)}
// //                           className="oction__delete small"
// //                         >
// //                           <FontAwesomeIcon icon={faTrash}/>
// //                         </Button>
// //                       )}
// //
// //                       <Button
// //                         onClick={() => {
// //                           setImageId(image.id);
// //                           dispatch(changeModalInfo({path: 'imageId', value: image.id}));
// //                         }}
// //                         className="oction__toggle small"
// //                       >
// //                         <FontAwesomeIcon icon={faPenToSquare}/>
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //
// //             </div>
// //
// //             <Button
// //               type="submit" loading={modalInfoStatus}>Save</Button>
// //           </form>
// //         </Modal>
// //       </div>
// //     )
// //   );
// // };
// //
// // export default AdminProduct;
//
//
//
// import React, {useState, useEffect} from 'react';
// import {useDispatch, useSelector} from "react-redux";
//
//
// import {Link} from "react-router-dom";
// import _ from "lodash";
// import {changeModalInfo, deleteImageRequest, setModalInfo} from "../store/actions/adminProduct";
// import Button from "./Button";
// import Modal from "./Modal";
// import Input from "./Input";
// import ClearCartModal from "./ClearCardModal";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faBell, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
// import DiscountProduct from "./pages/DiscountProduct";
// import Loader from "./Loader";
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
// const AdminProduct = ({product, onDeleteProduct, onSaveData}) => {
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
//   const [productI, setProductI] = useState([]);
//
//   const [viewImg, setViewImg] = useState(false);
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
//   const updateProduct = () => {
//     dispatch(setModalInfo({
//       id,
//       name,
//       size,
//       price: parseFloat(price),
//       description,
//       brandName,
//       quantity,
//       imageId
//     }));
//   };
//
//   const updateImage = (imageId) => {
//     dispatch(setModalInfo({
//       id,
//       name,
//       size,
//       price: parseFloat(price),
//       description,
//       brandName,
//       quantity,
//       imageId,
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
//   return (
//
//       <div className="product-detail" key={id}>
//         <table className="product-table">
//           <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Brand</th>
//             <th>Description</th>
//             <th>Size</th>
//             <th>Quantity</th>
//             <th>Discount persentage</th>
//             <th>Images</th>
//             <th>Actions</th>
//           </tr>
//           </thead>
//           <tbody>
//           <tr>
//             <td>{name}</td>
//             <td>{Math.round(price)}</td>
//             <td>{brandName}</td>
//             <td>{description}</td>
//             <td>{size}</td>
//             <td>{quantity}</td>
//             <td>{discount?.discountPercentage ? Math.round(discount.discountPercentage) : "_"}</td>
//             <td>
//               {!!productImage?.length && (
//                 <>
//                   <div onClick={() => setViewImg(true)}>
//                     <div className="image-wrapper">
//                       <img
//                         src={productImage[0].path}
//                         alt={`product-image-${productImage[0]}`}
//                         className="product-image_table"
//                       />
//
//
//                     </div>
//
//                     <div className="product-image-count">
//                       {productImage.length > 1 ? `${productImage.length - 1} image(s)` : ""}
//                     </div>
//                   </div>
//
//
//                   <Modal isOpen={viewImg} onClose={() => setViewImg(false) }>
//                     <div className="image-modal-wrapper">
//
//                       {productImage.map((image, index) => (
//                         <div key={image.id} className="image-modal">
//                           <img
//                             src={image.path}
//                             alt={`product-image-${index}`}
//                             className="product-image_modal"
//                           />
//
//                           <div className="oction__buttons">
//                             <Button
//                               onClick={() => onDeleteImage(image.id)}
//                               loading={deletingProduct.includes(image.id)}
//                               className="oction__delete small"
//                             >
//                               <FontAwesomeIcon
//                                 icon={faTrash}
//                                 className="oction__delete"
//                               />
//                             </Button>
//                             <Button
// on
//                               onClick={() => updateImage(image.id)}
//                               className="oction__toggle small"
//                             >
//                               <FontAwesomeIcon
//                                 icon={faPenToSquare}
//                                 className="oction__toggle"
//                               />
//                             </Button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//
//                   </Modal>
//
//                 </>
//
//               )}
//             </td>
//             <td>
//
//               <div className="oction__buttons">
//
//                 <FontAwesomeIcon
//                   icon={faPenToSquare}
//                   className="oction__toggle"
//                   onClick={updateProduct}
//                 >
//                 </FontAwesomeIcon>
//                 <FontAwesomeIcon
//                   icon={faTrash}
//                   className="oction__delete"
//                   onClick={() => setIsClearModalOpen(true)}
//                 >
//                 </FontAwesomeIcon>
//                 <ClearCartModal
//                   isOpen={isClearModalOpen}
//                   onClose={onClearCancel}
//                   onConfirm={onClearConfirm}
//                   desc={"Are you sure you want to delete the product"}
//                   loading={loading}
//                 />
//               </div>
//               {/*{!_.isEmpty(product) && <DiscountProduct product={product}/>}*/}
//               {/*<Link to={"/discount"}>*/}
//               {/*  Discount*/}
//               {/*</Link>*/}
//             </td>
//           </tr>
//           </tbody>
//         </table>
//
// )
//         <Link to={`/admin/product/${product.id}`} className="view-product-link">View Product</Link>
//         <Link to={`/admin/product/${product.id}`}
//               className="view-product-link">{_.isEmpty(discount) ? "Add discount" : "Change discount"}</Link>
//
//         <div className="product-form">
//           {!imageId && <Modal
//             isOpen={!_.isEmpty(modalInfo)}
//             onClose={onModalClose}
//             className="big"
//           >
//             {/*<form onSubmit={onSaveData}>*/}
//             {/*  {modalInfo.categoryId || !modalInfo.imageId ? (*/}
//             {/*    formFields.map((field) => (*/}
//             {/*      <div key={field.name} className="form-group">*/}
//             {/*        <label htmlFor={field.name}>{field.label}</label>*/}
//             {/*        {field.type === 'textarea' ? (*/}
//             {/*          <textarea*/}
//             {/*            id={field.name}*/}
//             {/*            name={field.name}*/}
//             {/*            value={modalInfo[field.name] || ""}*/}
//             {/*            onChange={({target: {value}}) =>*/}
//             {/*              dispatch(changeModalInfo({ path: field.name, value }))*/}
//             {/*            }*/}
//             {/*          />*/}
//             {/*        ) : (*/}
//             {/*          <Input*/}
//             {/*            type={field.type}*/}
//             {/*            id={field.name}*/}
//             {/*            name={field.name}*/}
//             {/*            value={modalInfo[field.name] || ""}*/}
//             {/*            onChange={({target: {value}}) =>*/}
//             {/*              dispatch(changeModalInfo({ path: field.name, value }))*/}
//             {/*            }*/}
//             {/*          />*/}
//             {/*        )}*/}
//             {/*        {modalInfoError?.[field.name] && (*/}
//             {/*          <div className="validation-info">{modalInfoError[field.name]}</div>*/}
//             {/*        )}*/}
//             {/*      </div>*/}
//             {/*    ))*/}
//             {/*  ) : (*/}
//             {/*    <div>gf{console.log(modalInfo.productImage,3333333333)}</div>*/}
//             {/*  )}*/}
//
//             {/*  <div className="form-group">*/}
//             {/*    <label htmlFor="productImage">Product Images</label>*/}
//             {/*    <input*/}
//             {/*      type="file"*/}
//             {/*      id="productImage"*/}
//             {/*      name="productImage"*/}
//             {/*      multiple*/}
//             {/*      onChange={uploadFile}*/}
//             {/*    />*/}
//             {/*    {previewImg.length > 0 && (*/}
//             {/*      <div className="image-previews">*/}
//             {/*        {previewImg.map((url, index) => (*/}
//             {/*          <img key={index} src={url} alt={`preview-${index}`} width="100"/>*/}
//             {/*        ))}*/}
//             {/*      </div>*/}
//             {/*    )}*/}
//             {/*  </div>*/}
//
//             {/*  <Button type="submit"*/}
//             {/*    disabled={modalInfo.imageId ? !previewImg.length :!_.isEmpty(modalInfoError)}*/}
//             {/*          loading={modalInfoStatus}>*/}
//             {/*    Save*/}
//             {/*  </Button>*/}
//             {/*</form>*/}
//
//             <form onSubmit={onSaveData}>
//               {/* Fields for product update */}
//               {(modalInfo.categoryId || !modalInfo.imageId) && formFields.map((field) => (
//                 <div key={field.name} className="form-group">
//                   <label htmlFor={field.name}>{field.label}</label>
//                   {field.type === 'textarea' ? (
//                     <textarea
//                       id={field.name}
//                       name={field.name}
//                       value={modalInfo[field.name] || ""}
//                       onChange={({target: {value}}) =>
//                         dispatch(changeModalInfo({path: field.name, value}))
//                       }
//                     />
//                   ) : (
//                     <Input
//                       type={field.type}
//                       id={field.name}
//                       name={field.name}
//                       value={modalInfo[field.name] || ""}
//                       onChange={({target: {value}}) =>
//                         dispatch(changeModalInfo({path: field.name, value}))
//                       }
//                     />
//                   )}
//                   {modalInfoError?.[field.name] && (
//                     <div className="validation-info">{modalInfoError[field.name]}</div>
//                   )}
//                 </div>
//               ))}
//
//               {/* Show existing images (read-only) */}
//               {console.log(product,333)}
//               {product.id === modalInfo.id && !!product.productImage?.length && (
//                 <div className="form-group">
//                   <label>Current Product Images</label>
//                   <div className="image-previews">
//                     {product.productImage.map((image, index) => (
//                       <img
//                         key={image.id || index}
//                         src={image.path}
//                         alt={`existing-${index}`}
//                         width="100"
//                         style={{ marginRight: '10px', borderRadius: '4px' }}
//                         onError={(e) => (e.target.src = '/fallback-image.png')}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//
//               {/*{product.id === modalInfo.id  &&*/}
//               {/*  !!product.productImage?.length && (*/}
//               {/*  <div className="form-group">*/}
//               {/*    <label>Current Product Images</label>*/}
//               {/*    <div className="image-previews">*/}
//               {/*      {productImage.map((image, index) => (*/}
//               {/*        <img*/}
//               {/*          key={index}*/}
//               {/*          src={image.path}*/}
//               {/*          alt={`existing-${index}`}*/}
//               {/*          width="100"*/}
//               {/*          style={{marginRight: '10px'}}*/}
//               {/*        />*/}
//               {/*      ))}*/}
//               {/*    </div>*/}
//               {/*  </div>*/}
//
//               {/*)}*/}
//
//               {/* Upload new images */}
//               <div className="form-group">
//                 <label htmlFor="productImage">
//                   {modalInfo.imageId && modalInfo.imageId !== " " ? "Replace Image" : "Add New Product Images"}
//                 </label>
//                 <input
//                   type="file"
//                   id="productImage"
//                   name="productImage"
//                   multiple
//                   onChange={uploadFile}
//                 />
//               </div>
//
//               {/* Show new previews (if any) */}
//               {previewImg.length > 0 && (
//                 <div className="form-group">
//                   <label>Preview New Images</label>
//                   <div className="image-previews">
//                     {previewImg.map((url, index) => (
//                       <img key={index} src={url} alt={`preview-${index}`} width="100"/>
//                     ))}
//                   </div>
//                 </div>
//               )}
//
//               <Button
//                 type="submit"
//                 disabled={modalInfo.imageId ? !previewImg.length : !_.isEmpty(modalInfoError)}
//                 loading={modalInfoStatus}
//               >
//                 Save
//               </Button>
//             </form>
//
//           </Modal>
//           }
//         </div>
//       </div>
//
//   );
// };
//
// export default AdminProduct;

//
// import React, {useState, useEffect} from 'react';
// import {useDispatch, useSelector} from "react-redux";
//
//
// import {Link} from "react-router-dom";
// import _ from "lodash";
// import {changeModalInfo, deleteImageRequest, setModalInfo} from "../store/actions/adminProduct";
// import Button from "./Button";
// import Modal from "./Modal";
// import Input from "./Input";
// import ClearCartModal from "./ClearCardModal";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faBell, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
// import DiscountProduct from "./pages/DiscountProduct";
// import Loader from "./Loader";
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
// const AdminProduct = ({product, onDeleteProduct, onSaveData}) => {
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
//
//   const [viewImg, setViewImg] = useState(false);
//   const [productIm, setProdIm] = useState([]);
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
//   const updateProduct = () => {
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
//   const updateImage = (imageId) => {
//     dispatch(setModalInfo({
//       id,
//       name,
//       size,
//       price: parseFloat(price),
//       description,
//       brandName,
//       quantity,
//       imageId,
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
//   return (
//
//     <div className="product-detail" key={id}>
//       <table className="product-table">
//         <thead>
//         <tr>
//           <th>Name</th>
//           <th>Price</th>
//           <th>Brand</th>
//           <th>Description</th>
//           <th>Size</th>
//           <th>Quantity</th>
//           <th>Discount persentage</th>
//           <th>Images</th>
//           <th>Actions</th>
//         </tr>
//         </thead>
//         <tbody>
//         <tr>
//           <td>{name}</td>
//           <td>{Math.round(price)}</td>
//           <td>{brandName}</td>
//           <td>{description}</td>
//           <td>{size}</td>
//           <td>{quantity}</td>
//           <td>{discount?.discountPercentage ? Math.round(discount.discountPercentage) : "_"}</td>
//           <td>
//             {!!productImage?.length && (
//               <>
//                 <div onClick={() => setViewImg(true)}>
//                   <div className="image-wrapper">
//                     <img
//                       src={productImage[0].path}
//                       alt={`product-image-${productImage[0]}`}
//                       className="product-image_table"
//                     />
//
//
//                   </div>
//
//                   <div className="product-image-count">
//                     {productImage.length > 1 ? `${productImage.length - 1} image(s)` : ""}
//                   </div>
//                 </div>
//
//
//                 {/*<Modal isOpen={viewImg} onClose={() => setViewImg(false) }>*/}
//                 {/*  <div className="image-modal-wrapper">*/}
//
//                 {/*    {productImage.map((image, index) => (*/}
//                 {/*      <div key={image.id} className="image-modal">*/}
//                 {/*        <img*/}
//                 {/*          src={image.path}*/}
//                 {/*          alt={`product-image-${index}`}*/}
//                 {/*          className="product-image_modal"*/}
//                 {/*        />*/}
//
//                 {/*        <div className="oction__buttons">*/}
//                 {/*          <Button*/}
//                 {/*            onClick={() => onDeleteImage(image.id)}*/}
//                 {/*            loading={deletingProduct.includes(image.id)}*/}
//                 {/*            className="oction__delete small"*/}
//                 {/*          >*/}
//                 {/*            <FontAwesomeIcon*/}
//                 {/*              icon={faTrash}*/}
//                 {/*              className="oction__delete"*/}
//                 {/*            />*/}
//                 {/*          </Button>*/}
//                 {/*          <Button*/}
//                 {/*            on*/}
//                 {/*            onClick={() => updateImage(image.id)}*/}
//                 {/*            className="oction__toggle small"*/}
//                 {/*          >*/}
//                 {/*            <FontAwesomeIcon*/}
//                 {/*              icon={faPenToSquare}*/}
//                 {/*              className="oction__toggle"*/}
//                 {/*            />*/}
//                 {/*          </Button>*/}
//                 {/*        </div>*/}
//                 {/*      </div>*/}
//                 {/*    ))}*/}
//                 {/*  </div>*/}
//
//                 {/*</Modal>*/}
//
//               </>
//
//             )}
//           </td>
//           <td>
//
//             <div className="oction__buttons">
//
//               <FontAwesomeIcon
//                 icon={faPenToSquare}
//                 className="oction__toggle"
//                 onClick={updateProduct}
//               >
//               </FontAwesomeIcon>
//               <FontAwesomeIcon
//                 icon={faTrash}
//                 className="oction__delete"
//                 onClick={() => setIsClearModalOpen(true)}
//               >
//               </FontAwesomeIcon>
//               <ClearCartModal
//                 isOpen={isClearModalOpen}
//                 onClose={onClearCancel}
//                 onConfirm={onClearConfirm}
//                 desc={"Are you sure you want to delete the product"}
//                 loading={loading}
//               />
//             </div>
//             {/*{!_.isEmpty(product) && <DiscountProduct product={product}/>}*/}
//             {/*<Link to={"/discount"}>*/}
//             {/*  Discount*/}
//             {/*</Link>*/}
//           </td>
//         </tr>
//         </tbody>
//       </table>
//
//       <Link to={`/admin/product/${product.id}`} className="view-product-link">View Product</Link>
//       <Link to={`/admin/product/${product.id}`}
//             className="view-product-link">{_.isEmpty(discount) ? "Add discount" : "Change discount"}</Link>
//
//       <div className="product-form">
//         {!imageId && <Modal
//           isOpen={!_.isEmpty(modalInfo)}
//           onClose={onModalClose}
//           className="big"
//         >
//           {/*<form onSubmit={onSaveData}>*/}
//           {/*  {modalInfo.categoryId || !modalInfo.imageId ? (*/}
//           {/*    formFields.map((field) => (*/}
//           {/*      <div key={field.name} className="form-group">*/}
//           {/*        <label htmlFor={field.name}>{field.label}</label>*/}
//           {/*        {field.type === 'textarea' ? (*/}
//           {/*          <textarea*/}
//           {/*            id={field.name}*/}
//           {/*            name={field.name}*/}
//           {/*            value={modalInfo[field.name] || ""}*/}
//           {/*            onChange={({target: {value}}) =>*/}
//           {/*              dispatch(changeModalInfo({ path: field.name, value }))*/}
//           {/*            }*/}
//           {/*          />*/}
//           {/*        ) : (*/}
//           {/*          <Input*/}
//           {/*            type={field.type}*/}
//           {/*            id={field.name}*/}
//           {/*            name={field.name}*/}
//           {/*            value={modalInfo[field.name] || ""}*/}
//           {/*            onChange={({target: {value}}) =>*/}
//           {/*              dispatch(changeModalInfo({ path: field.name, value }))*/}
//           {/*            }*/}
//           {/*          />*/}
//           {/*        )}*/}
//           {/*        {modalInfoError?.[field.name] && (*/}
//           {/*          <div className="validation-info">{modalInfoError[field.name]}</div>*/}
//           {/*        )}*/}
//           {/*      </div>*/}
//           {/*    ))*/}
//           {/*  ) : (*/}
//           {/*    <div>gf{console.log(modalInfo.productImage,3333333333)}</div>*/}
//           {/*  )}*/}
//
//           {/*  <div className="form-group">*/}
//           {/*    <label htmlFor="productImage">Product Images</label>*/}
//           {/*    <input*/}
//           {/*      type="file"*/}
//           {/*      id="productImage"*/}
//           {/*      name="productImage"*/}
//           {/*      multiple*/}
//           {/*      onChange={uploadFile}*/}
//           {/*    />*/}
//           {/*    {previewImg.length > 0 && (*/}
//           {/*      <div className="image-previews">*/}
//           {/*        {previewImg.map((url, index) => (*/}
//           {/*          <img key={index} src={url} alt={`preview-${index}`} width="100"/>*/}
//           {/*        ))}*/}
//           {/*      </div>*/}
//           {/*    )}*/}
//           {/*  </div>*/}
//
//           {/*  <Button type="submit"*/}
//           {/*    disabled={modalInfo.imageId ? !previewImg.length :!_.isEmpty(modalInfoError)}*/}
//           {/*          loading={modalInfoStatus}>*/}
//           {/*    Save*/}
//           {/*  </Button>*/}
//           {/*</form>*/}
//
//           <form onSubmit={onSaveData}>
//             {/* Fields for product update */}
//             {(modalInfo.categoryId || !modalInfo.imageId) && formFields.map((field) => (
//               <div key={field.name} className="form-group">
//                 <label htmlFor={field.name}>{field.label}</label>
//                 {field.type === 'textarea' ? (
//                   <textarea
//                     id={field.name}
//                     name={field.name}
//                     value={modalInfo[field.name] || ""}
//                     onChange={({target: {value}}) =>
//                       dispatch(changeModalInfo({path: field.name, value}))
//                     }
//                   />
//                 ) : (
//                   <Input
//                     type={field.type}
//                     id={field.name}
//                     name={field.name}
//                     value={modalInfo[field.name] || ""}
//                     onChange={({target: {value}}) =>
//                       dispatch(changeModalInfo({path: field.name, value}))
//                     }
//                   />
//                 )}
//                 {modalInfoError?.[field.name] && (
//                   <div className="validation-info">{modalInfoError[field.name]}</div>
//                 )}
//               </div>
//             ))}
//
//             {/* Show existing images (read-only) */}
//             {console.log(product, 333)}
//             {/*{product.id === modalInfo.id && !!product.productImage?.length && (*/}
//             {/*  <div className="form-group">*/}
//             {/*    <label>Current Product Images</label>*/}
//             {/*    <div className="image-previews">*/}
//             {/*      {product.productImage.map((image, index) => (*/}
//             {/*        <img*/}
//             {/*          key={image.id || index}*/}
//             {/*          src={image.path}*/}
//             {/*          alt={`existing-${index}`}*/}
//             {/*          width="100"*/}
//             {/*          style={{marginRight: '10px', borderRadius: '4px'}}*/}
//             {/*          onError={(e) => (e.target.src = '/fallback-image.png')}*/}
//             {/*        />*/}
//             {/*      ))}*/}
//             {/*    </div>*/}
//             {/*  </div>*/}
//             {/*)}*/}
//
//             {/*{product.id === modalInfo.id  &&*/}
//             {/*  !!product.productImage?.length && (*/}
//             {/*  <div className="form-group">*/}
//             {/*    <label>Current Product Images</label>*/}
//             {/*    <div className="image-previews">*/}
//             {/*      {productImage.map((image, index) => (*/}
//             {/*        <img*/}
//             {/*          key={index}*/}
//             {/*          src={image.path}*/}
//             {/*          alt={`existing-${index}`}*/}
//             {/*          width="100"*/}
//             {/*          style={{marginRight: '10px'}}*/}
//             {/*        />*/}
//             {/*      ))}*/}
//             {/*    </div>*/}
//             {/*  </div>*/}
//
//             {/*)}*/}
//
//             {/* Upload new images */}
//             <div className="form-group">
//               <label htmlFor="productImage">
//                 {modalInfo.imageId && modalInfo.imageId !== " " ? "Replace Image" : "Add New Product Images"}
//               </label>
//               <input
//                 type="file"
//                 id="productImage"
//                 name="productImage"
//                 multiple
//                 onChange={uploadFile}
//               />
//             </div>
//
//
//             <div className="image-modal-wrapper">
//
//               {modalInfo?.productIm?.map((image, index) => (
//                 <div key={image.id} className="image-modal">
//                   <img
//                     src={image.path}
//                     alt={`product-image-${index}`}
//                     className="product-image_modal"
//                   />
//
//                   <div className="oction__buttons">
//                     <Button
//                       onClick={() => onDeleteImage(image.id)}
//                       loading={deletingProduct.includes(image.id)}
//                       className="oction__delete small"
//                     >
//                       <FontAwesomeIcon
//                         icon={faTrash}
//                         className="oction__delete"
//                       />
//                     </Button>
//                     <Button
//                       on
//                       onClick={() => updateImage(image.id)}
//                       className="oction__toggle small"
//                     >
//                       <FontAwesomeIcon
//                         icon={faPenToSquare}
//                         className="oction__toggle"
//                       />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//
//
//
//
//
//
//
//
//
//
//
//             {/*{modalInfo?.productIm?.map((url, index) => (*/}
//
//
//             {/*  <img key={index} src={url.path} alt={`preview-${index}`} width="100"/>*/}
//             {/*))}*/}
//
//             {/* Show new previews (if any) */}
//             {previewImg.length > 0 && (
//               <div className="form-group">
//                 <label>Preview New Images</label>
//                 <div className="image-previews">
//                   {previewImg.map((url, index) => (
//                     <img key={index} src={url} alt={`preview-${index}`} width="100"/>
//                   ))}
//                 </div>
//               </div>
//             )}
//
//             <Button
//               type="submit"
//               disabled={modalInfo.imageId ? !previewImg.length : !_.isEmpty(modalInfoError)}
//               loading={modalInfoStatus}
//             >
//               Save
//             </Button>
//           </form>
//
//         </Modal>
//         }
//       </div>
//     </div>
//
//   );
// };
//
// export default AdminProduct;






import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";


import {Link} from "react-router-dom";
import _ from "lodash";
import {changeModalInfo, deleteImageRequest, fetchCategoryProducts, setModalInfo} from "../store/actions/adminProduct";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";
import ClearCartModal from "./ClearCardModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import DiscountProduct from "./pages/DiscountProduct";
import Loader from "./Loader";

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
  const  message = useSelector((state) => state.products.message);

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState([]);

  const [prodImage, setProdImage] = useState([]);


  const [viewImg, setViewImg] = useState(false);
  const [i, setI] = useState(" ");

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


  useEffect(() => {
    if (message === "Product updated successfully"
      || (message === "Product created successfully")
    ){
      setPreviewImg([])
      setProdImage([])
    }
  }, [message]);

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


  const onClose = () => {

    if (_.isEmpty(modalInfoError)) {
      setPreviewImg([])
      dispatch(setModalInfo({}));
    }

  };


  const onDeleteImage = (imageId) => {
    dispatch(deleteImageRequest(imageId));
  };


  const onModalClose = () => {
    if (!loading) {
      onClose();
    }
  };


  return (
    <div className="product-detail" key={id}>
      <Link to={`/admin/product/${product.id}`}>
      <div className="product-card" key={id}>
        <div className="product-card__image-wrapper" onClick={() => setViewImg(true)}>
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
          <h3 className="product-card__title">{name}</h3>
          <p><strong>Price:</strong> ${Math.round(price)}</p>
          <p><strong>Brand:</strong> {brandName}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Size:</strong> {size}</p>
          <p><strong>Quantity:</strong> {quantity}</p>
          <DiscountProduct product={product}/>

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


      <div className="product-form">
        {<Modal
          isOpen={!_.isEmpty(modalInfo)}
          onClose={onModalClose}
          className="big"
        >
          <form onSubmit={onSaveData}>
            {
              formFields.map((field) => (
                <div key={field.name} className="form-group">
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={modalInfo[field.name] || ""}
                      onChange={({target: {value}}) =>
                        dispatch(changeModalInfo({path: field.name, value}))
                      }
                    />
                  ) : (
                    <Input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={modalInfo[field.name] || ""}
                      onChange={({target: {value}}) =>
                        dispatch(changeModalInfo({path: field.name, value}))
                      }
                    />
                  )}
                  {modalInfoError?.[field.name] && (
                    <div className="validation-info">{modalInfoError[field.name]}</div>
                  )}
                </div>
              ))}

            <div className="image-upload-hint">
              {!modalInfo.categoryId &&
                <p className="image-hint-text">
                  Updating an image? Upload your new one first, then click the update button on the image you'd like to
                  replace.
                </p>
              }
              <p className="image-hint-text">
                Ready to showcase your product? Upload one or more images to get started.
              </p>
            </div>

            {/* Upload new images */}
            <div className="form-group">

              <input
                type="file"
                id="productImage"
                name="productImage"
                multiple
                onChange={uploadFile}
              />
            </div>

            <div className="image-modal-wrapper">

              {modalInfo?.productIm?.map((image, index) => (
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
                        className="oction__delete small"
                      />
                    </Button>

                    <Button
                      onClick={() =>
                        dispatch(changeModalInfo({path: "imageId", value: image.id}))
                      }
                      className="oction__toggle small"
                      disabled={previewImg.length === 0}
                      title="Please select a new image before updating."

                    >
                      <FontAwesomeIcon className="oction__toggle small" icon={faPenToSquare}/>
                    </Button>
                  </div>
                </div>
              ))}
            </div>


            {previewImg.length > 0 && (
              <div className="form-group">
                <label>Preview New Images</label>
                <div className="image-previews">
                  {previewImg.map((url, index) => (
                    <img key={index} src={url} alt={`preview-${index}`} width="100"/>
                  ))}
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={modalInfo.imageId && modalInfo.imageId != " " ? !previewImg.length : !_.isEmpty(modalInfoError)}
              loading={modalInfoStatus}
            >
              Save
            </Button>
          </form>

        </Modal>
        }
      </div>
    </div>

  );
};

export default AdminProduct;

