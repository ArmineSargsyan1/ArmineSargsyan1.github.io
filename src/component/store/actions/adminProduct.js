import {createAsyncThunk} from "@reduxjs/toolkit";
import {createAction} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import _ from "lodash";
import Api from "../../../Api";
import Utils from "../../helpers/Utils";




export const fetchProducts = createAsyncThunk(
  'AdminProducts/fetchProducts',
  async (payload, thunkAPI) => {
    const {search} = payload
    console.log(payload,"pay")
    try {
      const {data} =  search
        ? await Api.searchAdminProduct(payload)

        :  await Api.getAdminProducts(payload);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  });



// export const fetchProducts = createAsyncThunk(
//   'AdminProducts/fetchProducts',
//   async (payload, thunkAPI) => {
//     try {
//       const {data} = await Api.getAdminProducts(payload);
//       return data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.response)
//     }
//   });
//
//
// export const searchAdminProductRequest = createAsyncThunk(
//   "admin/search-products",
//   async (payload, thunkAPI) => {
//     try {
//       const {data} = await Api.searchAdminProduct(payload);
//
//       console.log(data, 88)
//       return data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.response)
//     }
//   });

export const fetchCategoryProducts = createAsyncThunk(
  'adminProduct/fetchCategoryProducts',
  async (payload, thunkAPI) => {
    const { categoryId, query } = payload;
    const { page, limit, search, minPrice, maxPrice } = query;

    try {
      const { data } = query.search
        ? await Api.searchAdminProduct({ categoryId, page, minPrice, maxPrice, limit, search })
        : await Api.getSingleCategoryProduct({ categoryId, query });
      return data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('Error fetching products');
    }
  }
);







// export const createOrUpdateProduct = createAsyncThunk(
//   'AdminProducts/createOrUpdateProduct',
//   async (payload, {rejectWithValue}) => {
//     const {product, categoryId} = payload
//
//      console.log(product,"p")
//     const {brandName, description, name, price, size, quantity} = product
//
//
//     const validationErrors = Utils.isValidateProductData({brandName, description, name, price, size});
//     if (!_.isEmpty(validationErrors)) {
//       return rejectWithValue(validationErrors);
//     }
//
//     try {
//       const {data} = categoryId
//
//
//         ? await Api.createAdminProduct({ product, categoryId })
//
//         : await Api.updateAdminProduct({productId: product.id, product})
//
//
//       console.log(data,33)
//
//       return {isUpdate: !categoryId, data: !categoryId ? data.product : data.product,};
//
//
//     } catch (error) {
//       console.log(error)
//       return rejectWithValue("All fields are required");
//     }
//   }
// );




export const createOrUpdateProduct = createAsyncThunk(
  'AdminProducts/createOrUpdateProduct',
  async (payload, {rejectWithValue}) => {

    const {product} = payload

    console.log(product,"pppppp")


    const {productIm, categoryId, ...newProducts } = product;


    const {brandName, description, name, price, size, quantity,  productImage, imageId} = newProducts

    console.log(productImage,9999999)
    const validationErrors = Utils.isValidateProductData({ brandName, description, name, price, size, quantity, productImage, categoryId});


    console.log(validationErrors,"valer")
    if (!_.isEmpty(validationErrors)) {
      return rejectWithValue(validationErrors);
    }

    let formData = new FormData();

    formData.append("name", name);
    formData.append("size", size);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("brandName", brandName);
    formData.append("quantity", quantity);


    if (imageId != " " && imageId){
      formData.append("imageId", imageId);
    }

    if (productImage && !!productImage.length) {
      Array.from(productImage).forEach((file) => {
        formData.append("productImage", file);
      });
    }




    const { id,  ...newProduct } = product;

    try {
      const {data} = categoryId


        ? await Api.createAdminProduct({ formData, categoryId})

        : await Api.updateAdminProduct({formData, id})

      console.log(data,111111111111111111111)
      return {isUpdate: !categoryId, data: !categoryId ? data.product : data.product, message: data.message};


    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);




///ashxatox
// export const createOrUpdateProduct = createAsyncThunk(
//   'AdminProducts/createOrUpdateProduct',
//   async (payload, {rejectWithValue}) => {
//
//     console.log(payload,"pay")
//     const {product} = payload
//
//     const {brandName, description, name, price, size, quantity,  productImage, imageId} = product
//
//     const validationErrors = Utils.isValidateProductData({brandName, description, name, price, size, quantity
//     });
//     if (!_.isEmpty(validationErrors)) {
//       return rejectWithValue(validationErrors);
//     }
//
//     const { id, categoryId, ...newProduct } = product;
//
//       try {
//       const {data} = categoryId
//
//
//         ? await Api.createAdminProduct({ newProduct, categoryId})
//
//         // : await Api.updateAdminProduct({productId: id, newProduct})
//
//         : await Api.updateAdminProduct({product: newProduct, id})
//
//         return {isUpdate: !categoryId, data: !categoryId ? data.product : data.product,};
//
//
//     } catch (error) {
//        console.log(error,"error")
//       return rejectWithValue("All fields are required");
//     }
//   }
// );





export const deleteProductRequest = createAsyncThunk(
  "admin/delete-products",
  async (payload, thunkAPI) => {
    try {
      await Api.deleteAdminProducts({productId: payload});
      console.log(payload,"aaaaaaaaaa")
      return payload;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response)
    }
  });


export const deleteImageRequest = createAsyncThunk(
  'images/deleteImage',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Api.deleteImage({imageId: payload});
      toast.success(response.data.message)
      return payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchSingleAdminProduct = createAsyncThunk(
  'adminProduct/fetchSingleAdminProduct',
  async ({ productId }) => {
    console.log(productId,22)
    try {
      const {data: {result: {product}}} = await Api.singleAdminProduct({ productId });
      console.log(product)
      return product;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to fetch product details');
    }
  }
);
export const applyDiscountToProduct = createAsyncThunk(
  'adminProduct/applyDiscountToProduct',
  async (payload,thunkAPI) => {
    try {
      const {data} = await Api.adminDiscountProduct(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.fields);
    }
  }
);



export const resetProducts = createAction('products/reset');

export const setModalInfo = createAction("adminProduct/set-modal")
export const changeModalInfo = createAction("adminProduct/change-modal")

