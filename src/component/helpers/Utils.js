import _ from "lodash"

class Utils {
  static isValidatePassword = ({ password, confirmPassword }) => {
    const errors = {};

    const passwordRegex = /^(?=.*\d)(?=.*[A-Za-z]).{8,}$/;

    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      errors.password = 'Password should not be empty';
    }else if (!passwordRegex.test(trimmedPassword)){
      errors.password = 'Password must be at least 8 characters long and contain at least one number.';
    }else if (trimmedPassword !== confirmPassword.trim()) {
      errors.password = 'Passwords do not match.';
    }

    return errors;
  };





  static isValidateProfileData = ({ firstName, lastName, address }) => {
    const nameValidation = /^[a-zA-Z\s-]{3,20}$/;
    const errorText = 'Use only Latin letters, minimum 3 characters, no spaces, symbols, or numbers.';
    const errors = {};

    const validateName = (name, field) => {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');

      if (!name || !name.trim()) {
        errors[field] = `${fieldName} should not be empty`;
      } else if (!nameValidation.test(name)) {
        errors[field] = errorText;
      }
    };

    validateName(firstName, 'firstName');
    validateName(lastName, 'lastName');
    validateName(address, 'address');

    return errors;
  };








  // static isValidateProfileData = ({firstName, lastName}) => {
  //
  //   const nameValidation = /^[a-zA-Z]{3,20}$/;
  //
  //   const errorText = 'Use only Latin minimum 3 characters, no space, symbols, or numbers.'
  //   const errors = {};
  //
  //
  //   if (!firstName || !firstName.trim()) {
  //     errors.firstName = 'First name should not be empty';
  //   }
  //
  //   if (firstName && !nameValidation.test(firstName)) {
  //     errors.firstName = errorText;
  //   }
  //
  //   if (!lastName || !lastName.trim()) {
  //     errors.lastName = 'Last name should not be empty';
  //   }
  //
  //   if (lastName && !nameValidation.test(lastName)) {
  //     errors.lastName = errorText;
  //   }
  //   return errors;
  //
  //
  // };





  //admin

  static isValidateProductData = ({ brandName, description, name, price, size, quantity }) => {
    const priceValidation = /^\d+$/;
    const quantityValidation = /^\d+$/;

    const errors = {};

    const validateField = (field, value, regex, errorMessage) => {
      if (!value.trim()) {
        errors[field] = `${field} should not be empty`;
      } else if (regex && !regex.test(value)) {
        errors[field] = errorMessage;
      }
    };

    validateField('name', name, null, 'Name should not be empty');
    validateField('size', size, null, 'Size should not be empty');
    validateField('description', description, null, 'Description should not be empty');
    validateField('brandName', brandName, null, 'Brand Name should not be empty');


    typeof quantity != "number"  && validateField('quantity', quantity, quantityValidation, 'Quantity should be a valid number');

    typeof price != "number" &&  validateField('price', price, priceValidation, 'Price should be a valid number');

    if (description && description.length < 10) {
      errors.description = 'Description should be at least 10 characters long';
    }

    return errors;
  };


  // static isValidateProductData = ({ brandName, description, name, price, size, quantity }) => {
  //   console.log(typeof price, typeof quantity);
  //
  //   const priceValidation =  /^\d+$/;
  //
  //
  //    // Regex to validate numbers, allowing decimals
  //   const quantityValidation = /^\d+$/;  // Regex to validate integers
  //
  //   const errors = {};
  //
  //   // Validate name: should not be empty
  //   if (!name.trim()) {
  //     errors.name = 'Name should not be empty';
  //   }
  //
  //   // Validate size: should not be empty
  //   if (!size.trim()) {
  //     errors.size = 'Size should not be empty';
  //   }
  //
  //   // Validate price: should not be empty and should be a valid number
  //   if (!price.trim()) {
  //     errors.price = 'Price should not be empty';
  //   }
  //   if (!priceValidation.test(price)) {
  //     errors.price = 'Price should be a valid number';
  //   }
  //
  //   if (typeof quantity != "number"){
  //     if (!quantity.trim()) {
  //       errors.price = 'Price should not be empty';
  //     }
  //     if (!quantityValidation.test(quantity) || typeof quantity != "number") {
  //       errors.quantity = 'Quantity should be a valid number';
  //     }
  //   }
  //
  //   // Validate description: should not be empty
  //   if (!description.trim()) {
  //     errors.description = 'Description should not be empty';
  //   }
  //
  //   if (description && description.length < 10) {
  //     errors.description = 'Description should be at least 10 characters long';
  //   }
  //
  //
  //   // Validate brandName: should not be empty
  //   if (!brandName.trim()) {
  //     errors.brandName = 'Brand Name should not be empty';
  //   }
  //
  //   console.log(errors, "err");
  //   return errors;
  // };
  //


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
//
//

//
// import _ from "lodash"
// import moment from "moment/moment";
//
// class Utils {
//
//   static isValidatePassword = ({password, confirmPassword}) => {
//     console.log(!password.trim(),  99)
//     const errors = {};
//
//     if (!password.trim()) {
//       console.log(555)
//       errors.password = 'Password should not be empty';
//     }
//
//     if ( /[0-9]{9}/.test(password)) {
//
//       // if (!/^(?=.*\d).{8,}$/.test(password)) {
//       errors.password = 'Password must be at least 8 characters long and at least one number.';
//     }
//
//     if (password !== confirmPassword) {
//       errors.password = 'Passwords do not match.';
//     }
//     return errors;
//   };
//
//   static isValidateProfileData = ({firstName, lastName, dateOfBirth}) => {
//     const nameValidation = /^[a-zA-Z]{3,20}$/;
//     const dateValidation = /^([0][1-9]|[1][0-2])\/([0][1-9]|[12][0-9]|3[01])\/\d{4}$/
//
//     const errorText = 'Use only Latin minimum 3 characters, no space, symbols, or numbers.'
//     const errors = {};
//
//     // if (!dateOfBirth || !dateOfBirth.trim() || !dateValidation.test(dateOfBirth)) {
//     //   errors.dateOfBirth = 'date name should not be empty';
//     // }
//
//     if (!firstName || !firstName.trim()) {
//       errors.firstName = 'First name should not be empty';
//     }
//
//     if (firstName && !nameValidation.test(firstName)) {
//       errors.firstName = errorText;
//     }
//
//     if (!lastName || !lastName.trim()) {
//       errors.lastName = 'Last name should not be empty';
//     }
//
//     if (lastName && !nameValidation.test(lastName)) {
//       errors.lastName = errorText;
//     }
//     return errors;
//   };
//
//
//   static deleteEmptyKeys = (object) => {
//     const obj = _.cloneDeep(object);
//
//     for (const propName in obj) {
//       if ((typeof obj[propName] !== "boolean" && typeof obj[propName] !== "number")
//         && (typeof obj[propName] === "object" ? _.isEmpty(obj[propName]) : !obj[propName].trim())) {
//         delete obj[propName];
//       }
//     }
//     return obj
//   };
// }
//
// export default Utils


