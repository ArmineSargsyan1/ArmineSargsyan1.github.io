import axios from "axios";

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("token"),

  },
  baseURL: "https://world-of-construction.onrender.com/",
  params: {}

})

// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
export default class Api {


  static getUser({user}) {
    return api.post("users/login", user)
  }


//user
  // static getProfile() {
  //   return api.get("users/profile")
  // }
  //
  // static async updateUser({data}) {
  //   console.log(data, "api")
  //   return api.put("users/update", data, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: localStorage.getItem("token"),
  //     },
  //   });
  // };
  //
  //
  //
  //
  // static async updateUserPassword({newPassword}) {
  //   console.log(newPassword, 66)
  //   return api.put("users/password", {newPassword});
  // };


  ////admin
  static getAdminCategories() {
    return api.get("admin/categories")
  }

  static async getAdminProducts({page, limit, minPrice, maxPrice}) {
    console.log(page, limit, minPrice, maxPrice, 333333333)
    return await api.get("admin/products", {
      params: {
        page,
        limit,
        minPrice,
        maxPrice
      },
    });
  };


  static async searchAdminProduct({page, limit, search, minPrice, maxPrice, categoryId}) {
    console.log(page, limit, search, minPrice, maxPrice, categoryId,77777777)
    return await api.get(`admin/search`, {
      params: {
        page,
        limit,
        search,
        minPrice,
        maxPrice,
        categoryIds: categoryId

      },
    });
  };


  static async getSingleCategoryProduct({categoryId, query}) {
    const {page, limit, search, minPrice, maxPrice} = query
    return await api.get(`admin/products/${categoryId}`, {
      params: {
        page,
        limit,
        search,
        minPrice,
        maxPrice
      },
    });
  };


  static getReviewList({productId}) {
    console.log(productId)
    return api.get(`/reviews/list/${productId}`)
  }


  static createReview({reviewId, reply}) {
    return api.post(`admin/review/reply`,
      {
        reviewId,
        reply
      }
    )
  }


  static async createAdminProduct({formData, categoryId}) {

    return await api.post(`admin/product/${categoryId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }


  static async updateAdminProduct({formData, id,}) {

    return await api.put(`admin/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  static deleteAdminProducts({productId}) {
    return api.delete(`admin/product/${productId}`)
  }


  static async singleAdminProduct({productId}) {
    console.log(productId, "api")
    return await api.get(`admin/product/${productId}`,
    );
  };


  static async adminDiscountProduct({productId, discountPercentage, startDate, endDate}) {
    return await api.post(`admin/discount`, {
      productId,
      discountPercentage,
      startDate,
      endDate
    });
  };


  static deleteImage({imageId}) {
    console.log(imageId, "Api")
    return api.delete(`/admin/image/${imageId}`)
  }


}
