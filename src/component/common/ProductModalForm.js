import React, {useState} from "react";
import _ from "lodash";
import {changeModalInfo, createOrUpdateProduct, fetchProducts, setModalInfo} from "../store/actions/adminProduct";
import {useDispatch, useSelector} from "react-redux";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";


const formFields = [
  { label: 'Product Name', name: 'name', type: 'text' },
  { label: 'Size', name: 'size', type: 'text' },
  { label: 'Price', name: 'price', type: 'text' },
  { label: 'Description', name: 'description', type: 'textarea' },
  { label: 'Brand Name', name: 'brandName', type: 'text' },
  {label: 'Quantity', name: 'quantity', type: 'text'},
];

const ProductModalForm = () => {

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.products.productStatus);
  const modalInfo = useSelector((state) => state.products.modalInfo);
  const modalInfoError = useSelector((state) => state.products.modalInfoErrors);
  const modalInfoStatus = useSelector((state) => state.products.modalInfoStatus);

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState([]);

  const [prodImage, setProdImage] = useState([]);



  const onClose = () => {

    if (_.isEmpty(modalInfoError)){
      setPreviewImg([])
      dispatch(setModalInfo({}));
    }

  };


  const uploadFile = async ({ target }) => {
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


  const onSaveData = async (e) => {
    e.preventDefault();
    console.log(modalInfo,555555555)
    await dispatch(createOrUpdateProduct({
      product: modalInfo,
    }));

    if (_.isEmpty(modalInfoError)) {
      await dispatch(fetchProducts());

      dispatch(setModalInfo({}))
    }
  };




  return (
    <Modal isOpen={!_.isEmpty(modalInfo)} onClose={onClose} className="big">
      <form onSubmit={onSaveData}>
        {formFields.map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={modalInfo[field.name]}
                onChange={({ target: { value } }) => dispatch(changeModalInfo({ path: field.name, value }))
                }
              />
            ) : (
              <Input
                type={field.type}
                id={field.name}
                name={field.name}
                value={modalInfo[field.name]}
                onChange={({ target: { value } }) =>
                  dispatch(changeModalInfo({ path: field.name, value }))
                }
              />
            )}
            {modalInfoError?.[field.name] && (
              <div className="validation-info">
                {modalInfoError[field.name]}
              </div>
            )}
          </div>
        ))}

        {/* Image Upload */}
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
                <img key={index} src={url} alt={`preview-${index}`} width="100" />
              ))}
            </div>
          )}
        </div>

        <Button type="submit" loading={modalInfoStatus}>
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default ProductModalForm;
