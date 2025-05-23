// import React, {useEffect, useState} from "react";
// import _ from "lodash";
// import {
//   changeModalInfo,
//   createOrUpdateProduct,
//   deleteImageRequest,
//   fetchProducts,
//   setModalInfo
// } from "../store/actions/adminProduct";
// import {useDispatch, useSelector} from "react-redux";
// import Modal from "./Modal";
// import Input from "./Input";
// import Button from "./Button";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
//
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
// const ProductModalForm = ({onSave, product}) => {
//
//
//
//   const dispatch = useDispatch();
//
//   const loading = useSelector((state) => state.products.productStatus);
//   const modalInfo = useSelector((state) => state.products.modalInfo);
//   const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
//   const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);
//   const message = useSelector((state) => state.products.message);
//   const deletingProduct = useSelector((state) => state.products.deletingProduct);
//
//   const [previewImg, setPreviewImg] = useState([]);
//
//   const [prodImage, setProdImage] = useState([]);
//
//   const {id, name, size, price, description, brandName, productImage, quantity, discount, imageId} = modalInfo
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
//     ) {
//       setPreviewImg([])
//       setProdImage([])
//     }
//   }, [message]);
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
//   const onDeleteImage = (imageId) => {
//     dispatch(deleteImageRequest(imageId));
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
//       productIm: prodImage
//     }))
//   };
//   const onModalClose = () => {
//     if (!loading) {
//       onClose();
//     }
//   };
//
//
//   return (
//     <div className="product-form">
//       {<Modal
//         isOpen={!_.isEmpty(modalInfo)}
//         onClose={onModalClose}
//         className="big"
//       >
//         <form onSubmit={onSave}>
//           {
//             formFields.map((field) => (
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
//           <div className="image-upload-hint">
//             {!modalInfo.categoryId &&
//               <p className="image-hint-text">
//                 Updating an image? Upload your new one first, then click the update button on the image you'd like to
//                 replace.
//               </p>
//             }
//             <p className="image-hint-text">
//               Ready to showcase your product? Upload one or more images to get started.
//             </p>
//           </div>
//
//           {/* Upload new images */}
//           <div className="form-group">
//
//             <input
//               type="file"
//               id="productImage"
//               name="productImage"
//               multiple
//               onChange={uploadFile}
//             />
//           </div>
//
//           <div className="image-modal-wrapper">
//
//             {modalInfo?.productIm?.map((image, index) => (
//               <div key={image.id} className="image-modal">
//                 <img
//                   src={image.path}
//                   alt={`product-image-${index}`}
//                   className="product-image_modal"
//                 />
//
//                 <div className="oction__buttons">
//                   <Button
//                     onClick={() => onDeleteImage(image.id)}
//                     loading={deletingProduct.includes(image.id)}
//                     className="oction__delete small"
//                   >
//                     <FontAwesomeIcon
//                       icon={faTrash}
//                       className="oction__delete small"
//                     />
//                   </Button>
//
//                   <Button
//                     onClick={() =>
//                       dispatch(changeModalInfo({path: "imageId", value: image.id}))
//                     }
//                     className="oction__toggle small"
//                     disabled={previewImg.length === 0}
//                     title="Please select a new image before updating."
//
//                   >
//                     <FontAwesomeIcon className="oction__toggle small" icon={faPenToSquare}/>
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//
//
//           {previewImg.length > 0 && (
//             <div className="form-group">
//               <label>Preview New Images</label>
//               <div className="image-previews">
//                 {previewImg.map((url, index) => (
//                   <img key={index} src={url} alt={`preview-${index}`} width="100"/>
//                 ))}
//               </div>
//             </div>
//           )}
//
//           <Button
//             className="save_product"
//
//
//             type="submit"
//             disabled={(modalInfo.imageId && modalInfo.imageId != " ") ? !previewImg.length : !_.isEmpty(modalInfoError)}
//             loading={modalInfoStatus}
//           >
//             Save
//           </Button>
//         </form>
//
//       </Modal>
//       }
//     </div>
//
//
//   );
// };
//
// export default ProductModalForm;


import React, {useEffect, useState} from "react";
import _ from "lodash";
import {
  changeModalInfo,
  createOrUpdateProduct,
  deleteImageRequest,
  fetchProducts, fetchSingleAdminProduct,
  setModalInfo
} from "../store/actions/adminProduct";
import {useDispatch, useSelector} from "react-redux";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as UploadIcon} from "../../assets/image/upload.svg";

const formFields = [
  {label: 'Product Name', name: 'name', type: 'text'},
  {label: 'Size', name: 'size', type: 'text'},
  {label: 'Price', name: 'price', type: 'text'},
  {label: 'Description', name: 'description', type: 'textarea'},
  {label: 'Brand Name', name: 'brandName', type: 'text'},
  {label: 'Quantity', name: 'quantity', type: 'text'},
];

const ProductModalForm = ({onSave}) => {

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.products.productStatus);
  const modalInfo = useSelector((state) => state.products.modalInfo);
  const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
  const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);
  const message = useSelector((state) => state.products.message);
  const deletingProduct = useSelector((state) => state.products.deletingProduct);

  const [previewImg, setPreviewImg] = useState([]);

  const [prodImage, setProdImage] = useState([]);


  const uploadFile = async ({target}) => {
    console.log(target)
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
    ) {
      setPreviewImg([])
      setProdImage([])
    }
  }, [message]);


  const onClose = () => {
    setPreviewImg([])
    dispatch(setModalInfo({}));
  };
  const onDeleteImage = (imageId) => {
    dispatch(deleteImageRequest(imageId));
  };

  const onModalClose = () => {
    if (!loading) {
      onClose();
    }
  };


  console.log(prodImage, "iuiu", previewImg)
  return (
    <div className="product-form">
      {<Modal
        isOpen={!_.isEmpty(modalInfo)}
        onClose={onModalClose}
        className="big"
      >
        <form onSubmit={onSave} className="form-wrapper">
          {
            formFields.map((field) => (
              <div key={field.name} className="form-group">
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    placeholder={`Enter ${field.name} of products`}
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
                    placeholder={`Enter ${field.name} of products`}
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
            {!modalInfo?.categoryId && !!modalInfo?.productIm?.length && <p className="image-hint-text">
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

            <div className={`file-upload-wrapper ${modalInfo?.productImage?.length > 0 ? 'has-image' : ''}`}>
              <label htmlFor="productImage" className="custom-file-label">
                <UploadIcon/>
                <span>Add New Photos</span>
              </label>

              <input
                type="file"
                id="productImage"
                name="productImage"
                multiple
                onChange={uploadFile}
                className="file-input"
              />
            </div>
            {modalInfoError.productImage &&
              <div className="validation-info">{modalInfoError.productImage}</div>}
          </div>

          <div className="image-modal-wrapper">

            {modalInfo?.productIm?.map((image, index) => (
              <div key={image.id} className="image-modal">
                <img
                  src={image.path || image.url}
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
                    onClick={() => {
                      dispatch(changeModalInfo({
                        path: 'imageId',
                        value: image.id,
                      }));
                    }
                    }
                    className="oction__toggle small"
                    disabled={modalInfo?.productImage?.length !== 1}
                    title="Please select a new image before updating."

                  >
                    {modalInfo?.productImage?.length !== 1

                      // ?<label htmlFor="productImage">
                        ?<label htmlFor={!modalInfo?.productImage?.length || modalInfo?.productImage?.length < 2 ? "productImage" : ""}>

                      <UploadIcon className="upload-icon small"/>
                      </label>
                      : <FontAwesomeIcon className="oction__toggle small" icon={faPenToSquare}/>
                    }
                  </Button>
                </div>
              </div>
            ))}
          </div>


          {/*<button*/}
          {/*  className="delete-preview-btn"*/}
          {/*  // onClick={() => {*/}
          {/*  //   const newPreview = previewImg.filter((_, i) => i !== index);*/}
          {/*  //   const newProdImage = prodImage.filter((_, i) => i !== index);*/}
          {/*  //*/}
          {/*  //   setPreviewImg(newPreview);*/}
          {/*  //   setProdImage(newProdImage);*/}
          {/*  //*/}
          {/*  //   dispatch(changeModalInfo({*/}
          {/*  //     path: 'productImage',*/}
          {/*  //     value: newProdImage,*/}
          {/*  //   }));*/}
          {/*  // }}*/}
          {/*  onClick={() => dispatch(changeModalInfo({path: 'productImage', value: []}))}*/}
          {/*>*/}
          {/*  Cansel*/}
          {/*</button>*/}

          {previewImg.length > 0 && (
            <div className="form-group">
              <label>Preview New Images</label>
              <div className="image-previews">
                {previewImg.map((url, index) => (
                  <img key={index} src={url} alt={`preview-${index}`} width="100"/>
                ))}
              </div>
              <button
                onClick={() => {
                  setProdImage([]);
                  setPreviewImg([]);

                  dispatch(changeModalInfo({
                    path: 'productImage',
                    value: [],
                  }));

                }}
              >
                Cancel
              </button>
            </div>
          )}

          <Button
            className="save_product"


            type="submit"
            disabled={(modalInfo.imageId && modalInfo.imageId != " ") ? !previewImg.length : !_.isEmpty(modalInfoError)}
            loading={modalInfoStatus}
          >
            Save
          </Button>
        </form>

      </Modal>
      }
    </div>


  );
};

export default ProductModalForm;
