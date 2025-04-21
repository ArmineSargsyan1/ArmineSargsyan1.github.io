import {createReducer} from '@reduxjs/toolkit';
import {
  createOrUpdateProduct,
  fetchProducts,
  setModalInfo,
  changeModalInfo,
  deleteProductRequest,
  fetchCategoryProducts, applyDiscountToProduct, fetchSingleAdminProduct, deleteImageRequest, resetProducts,
} from "../actions/adminProduct";

const initialState = {
  products: {
    products: [],
    currentPage: 1,
    maxPageCount: 1,
  },
  productStatus: true,
  modalInfo: {},
  modalInfoErrors: {},
  modalInfoStatus: "",
  deletingProduct: [],

  error: "",
  product: {},

  message: ""

};

export const adminProductSlice = createReducer(initialState, (builder) => {
  builder
    // Fetch Products
    .addCase(fetchProducts.pending, (state) => {
      state.productStatus = true;
      state.deletingProduct = [];

    })
    .addCase(fetchProducts.fulfilled, (state, {payload}) => {
      state.productStatus = false;
      state.products = payload;
      state.error = ""
    })
    .addCase(fetchProducts.rejected, (state, {payload}) => {
      state.productStatus = false;
      state.products = {};
      state.error = payload
    })


    // Delete Product

    .addCase(deleteProductRequest.pending, (state, {meta: {arg}}) => {
      state.productStatus = true;
      state.deletingProduct = [arg, ...state.deletingProduct];
    })
    .addCase(deleteProductRequest.fulfilled, (state, {payload}) => {
      state.products.products = state.products.products.filter((product) => product.id !== payload);
      state.productStatus = false;
      state.deletingProduct = state.deletingProduct.filter((id) => id !== payload);

    })
    .addCase(deleteProductRequest.rejected, (state) => {
      state.productStatus = false;
    })

    // Create or Update Product
    .addCase(createOrUpdateProduct.pending, (state) => {
      state.productStatus = true;
      state.modalInfoStatus = true;
      state.message = ""

    })
    .addCase(createOrUpdateProduct.fulfilled, (state, {payload}) => {
      console.log(payload,5555555555555)
      const {isUpdate, data} = payload;
      state.productStatus = false;
      state.products.products = isUpdate
        ? state.products.products.map((u) => (u.id === data.id ? data : u))
        : [data, ...state.products.products];

      state.message = payload.message
      state.modalInfo = {};
      state.modalInfoStatus = false;

    })
    .addCase(createOrUpdateProduct.rejected, (state, {payload}) => {
      console.log(payload,"pay")
      state.modalInfoErrors = payload;
      state.modalInfoStatus = false;
      state.productStatus = false;
      state.message = "";
    })

    .addCase(setModalInfo, (state, {payload}) => {
      state.modalInfo = payload;
      state.modalInfoErrors = {};
    })

    // .addCase(changeModalInfo, (state, {payload}) => {
    //   const {path, value} = payload;
    //   state.modalInfo[path] = value;
    //  state.modalInfoErrors = {}
    //   // state.modalInfoErrors
    //   // state.modalInfoErrors[path] = false;
    //   // state.modalInfoErrors[path] = false;
    // })

    // .addCase(changeModalInfo, (state, { payload }) => {
    //
    //   const { path, value } = payload;
    //
    //   if (path === 'productImage') {
    //     state.modalInfo.productImage = value;
    //
    //   } else {
    //     state.modalInfo[path] = value;
    //   }
    //
    //   state.modalInfoErrors = {};
    //   state.modalInfoStatus = false;
    // })


    .addCase(changeModalInfo, (state, { payload }) => {
      const { path, value } = payload;
      console.log(path, value,4444444444444)
      if (path === 'productImage') {
        state.modalInfo.productImage = Array.isArray(value) ? value : [value];
      } else {
        state.modalInfo[path] = value;
      }

      state.modalInfoErrors = {};
      state.modalInfoStatus = false;
    })

    // Fetch Category Products
    .addCase(fetchCategoryProducts.pending, (state) => {
      state.productStatus = true;
    })


    .addCase(fetchCategoryProducts.fulfilled, (state, { payload }) => {
      state.productStatus = false;

      const normalizedProducts = payload.products.map((p) => ({
        product: p.product || p,
      }));

      state.products = {
        ...payload,
        products: normalizedProducts,
      };
      state.error = ""
    })

    .addCase(fetchCategoryProducts.rejected, (state, {payload}) => {
      state.productStatus = false;
      state.error = payload
    })

    .addCase(fetchSingleAdminProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSingleAdminProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.product = payload;
    })

    .addCase(fetchSingleAdminProduct.rejected, (state) => {
      state.loading = false;
    })



    .addCase(deleteImageRequest.pending, (state, { meta: { arg } }) => {
      // Track image being deleted (ID)
      state.deletingProduct = [arg, ...state.deletingProduct];
      state.error = null;
    })

    // .addCase(deleteImageRequest.fulfilled, (state, { payload }) => {
    //   // Remove image ID from deletingProduct when delete is successful
    //   state.deletingProduct = state.deletingProduct.filter((id) => id !== payload.id);
    //
    //   // Ensure product and images exist before filtering
    //   if (state.product && state.product.images) {
    //     // Filter the images array to exclude the deleted image by ID
    //     const updatedImages = state.product.images.filter(
    //       (image) => image.id !== payload.id
    //     );
    //
    //     // Update the images array
    //     state.product.images = updatedImages;
    //
    //   }
    //
    //   console.log(payload, "plllllllllllllll"); // Debug log for deleted image
    // })


    .addCase(deleteImageRequest.fulfilled, (state, { payload }) => {
      state.deletingProduct = state.deletingProduct.filter((id) => id !== payload);

      if (state.product && state.product.images) {
        const updatedImages = state.product.images.filter((image) => image.id !== payload);

        state.product = { ...state.product, images: updatedImages };
      }

      console.log(payload, "Image deleted successfully!");
    })

    .addCase(deleteImageRequest.rejected, (state, action) => {
      // Handle error
      state.error = action.payload;
    })


    .addCase(resetProducts, (state) => {
      state.products = {
        products: [],
        currentPage: 1,
        maxPageCount: 0,
      };
    })


.addCase(applyDiscountToProduct.pending, (state) => {
      state.productStatus = true;
    })
    .addCase(applyDiscountToProduct.fulfilled, (state, { payload }) => {
      state.productStatus = false;
      state.discountDetails = payload;
    })
    .addCase(applyDiscountToProduct.rejected, (state, { payload }) => {
      state.productStatus = false;
      state.error = payload;
    })
});



















//
// import {createReducer} from '@reduxjs/toolkit';
// import {
//   createOrUpdateProduct,
//   fetchProducts,
//   setModalInfo,
//   changeModalInfo,
//   deleteProductRequest,
//   fetchCategoryProducts,
// } from "../actions/adminProduct";
// import Utils from "../../components/helpers/Utils";
//
// const initialState = {
//   products: {
//     products: [],
//     currentPage: 1,
//     maxPageCount: 1,
//   },
//   productStatus: true,
//   modalInfo: {},
//   modalInfoErrors: {},
//   modalInfoStatus: "",
//   deletingProduct: [],
//
//   error: ""
// };
//
// export const adminProductSlice = createReducer(initialState, (builder) => {
//   builder
//     // Fetch Products
//     .addCase(fetchProducts.pending, (state) => {
//       state.productStatus = true;
//       state.deletingProduct = [];
//
//     })
//     .addCase(fetchProducts.fulfilled, (state, {payload}) => {
//       state.productStatus = false;
//       state.products = payload;
//       state.error = ""
//     })
//     .addCase(fetchProducts.rejected, (state, {payload}) => {
//       state.productStatus = false;
//       state.products = {};
//       state.error = payload
//     })
//
//
//     // Delete Product
//
//     .addCase(deleteProductRequest.pending, (state, {meta: {arg}}) => {
//       state.productStatus = true;
//       state.deletingProduct = [arg, ...state.deletingProduct];
//     })
//     .addCase(deleteProductRequest.fulfilled, (state, {payload}) => {
//       state.products.products = state.products.products.filter((product) => product.id !== payload);
//       state.productStatus = false;
//       state.deletingProduct = state.deletingProduct.filter((id) => id !== payload);
//
//     })
//     .addCase(deleteProductRequest.rejected, (state) => {
//       state.productStatus = false;
//     })
//
//     // Create or Update Product
//     .addCase(createOrUpdateProduct.pending, (state) => {
//       state.productStatus = true;
//       state.modalInfoStatus = true;
//     })
//     .addCase(createOrUpdateProduct.fulfilled, (state, {payload}) => {
//       const {isUpdate, data} = payload;
//       state.productStatus = false;
//
//       state.products.products = isUpdate
//         ? state.products.products.map((u) => (u.id === data.id ? data : u))
//         : [data, ...state.products.products];
//
//       state.modalInfo = {};
//       state.modalInfoStatus = false;
//
//     })
//     .addCase(createOrUpdateProduct.rejected, (state, {payload}) => {
//       state.modalInfoErrors = payload;
//       state.modalInfoStatus = false;
//       state.productStatus = false
//     })
//
//     .addCase(setModalInfo, (state, {payload}) => {
//       state.modalInfo = payload;
//       state.modalInfoErrors = {};
//     })
//
//     .addCase(changeModalInfo, (state, {payload}) => {
//       // const {path, value} = payload;
//       console.log(payload,11)
//       state.modalInfo = payload;
//
//       state.modalInfo = { ...state.modalInfo, ...payload }
//       // state.modalInfoErrors[path] = value;
//
//
//       // state.modalInfoErrors
//       // state.modalInfoErrors[path] = false;
//       // state.modalInfoErrors[path] = false;
//     })
//
//     // Fetch Category Products
//     .addCase(fetchCategoryProducts.pending, (state) => {
//       state.productStatus = true;
//     })
//     .addCase(fetchCategoryProducts.fulfilled, (state, {payload}) => {
//       state.productStatus = false;
//       state.products = payload;
//
//     })
//
//     .addCase(fetchCategoryProducts.rejected, (state) => {
//       state.productStatus = false;
//     })
// });

