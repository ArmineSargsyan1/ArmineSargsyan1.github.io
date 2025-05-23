import _ from "lodash"

class Utils {

  //admin

  static isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  static isPassword = (value) => /^.{8,}$/.test(value);


  // static isValidateProductData = ({ brandName, description, name, price, size, quantity, productImage }) => {
  //   const priceValidation = /^\d+$/;
  //   const quantityValidation = /^\d+$/;
  //
  //   const errors = {};
  //
  //   const validateField = (field, value, regex, errorMessage) => {
  //     if (!value.trim()) {
  //       errors[field] = `${field} should not be empty`;
  //     } else if (regex && !regex.test(value)) {
  //       errors[field] = errorMessage;
  //     }
  //   };
  //
  //   validateField('name', name, null, 'Name should not be empty');
  //   validateField('size', size, null, 'Size should not be empty');
  //   validateField('description', description, null, 'Description should not be empty');
  //   validateField('brandName', brandName, null, 'Brand Name should not be empty');
  //
  //
  //   typeof quantity != "number"  && validateField('quantity', quantity, quantityValidation, 'Quantity should be a valid number');
  //
  //   typeof price != "number" &&  validateField('price', price, priceValidation, 'Price should be a valid number');
  //
  //   if (description && description.length < 10) {
  //     errors.description = 'Description should be at least 10 characters long';
  //   }
  //
  //   return errors;
  // };


  static isValidateProductData = ({ brandName, description, name, price, size, quantity, productImage, categoryId }) => {
    const priceValidation = /^\d+$/;
    const quantityValidation = /^\d+$/;
    const errors = {};

    if (categoryId){
      if (!Array.isArray(productImage ) || !productImage.length) {
        errors.productImage = 'At least one product image is required';
      }
    }


    const validateField = (field, value, regex, errorMessage) => {
      if (!value?.toString().trim()) {
        errors[field] = `${field} should not be empty`;
      } else if (regex && !regex.test(value)) {
        errors[field] = errorMessage;
      }
    };

    validateField('name', name, null, 'Name should not be empty');
    validateField('size', size, null, 'Size should not be empty');
    validateField('description', description, null, 'Description should not be empty');
    validateField('brandName', brandName, null, 'Brand Name should not be empty');

    if (typeof quantity !== 'number') {
      validateField('quantity', quantity, quantityValidation, 'Quantity should be a valid number');
    }

    if (typeof price !== 'number') {
      validateField('price', price, priceValidation, 'Price should be a valid number');
    }

    if (description && description.length < 10) {
      errors.description = 'Description should be at least 10 characters long';
    }

    return errors;
  };

  static deleteEmptyKeys = (object) => {
    const obj = _.cloneDeep(object);

    for (const propName in obj) {
      if ((typeof obj[propName] !== "boolean" && typeof obj[propName] !== "number")
        && (typeof obj[propName] === "object" ? _.isEmpty(obj[propName]) : !obj[propName].trim())) {
        delete obj[propName];
      }
    }
    return obj
  };
}

export default Utils

