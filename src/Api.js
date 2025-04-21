import axios from "axios";
import {loadUnreadNotifications, markNotificationAsRead} from "./component/store/actions/notification";

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
  static getProfile() {
    return api.get("users/profile")
  }
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
        limit:3,
        minPrice,
        maxPrice
      },
    });
  };

  static async getAdminStatsResponse({startDate, endDate}) {
    console.log(startDate, endDate, 333333333)
    return await api.get(
      "/admin/statistics/",{
        params: {
          startDate, endDate
        },
      });
  };

  static async getAdminBuyersResponse({startDate, endDate}) {
    console.log(startDate, endDate, 333333333)
    return await api.get(
      "/admin/buyers/",{
        params: {
          startDate,
          endDate
        },
      });
  };


// static async searchAdminProduct({page, limit, search, minPrice, maxPrice, categoryId})
  static async searchAdminProduct({page, limit, search, minPrice, maxPrice, categoryId})

  {
  console.log(page, limit, search, minPrice, maxPrice, categoryId, "search")
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


static async getSingleCategoryProduct({categoryId, query})
{
  const {page, limit, search, minPrice, maxPrice} = query

  console.log(page, limit, search, minPrice, maxPrice, "get")
  return await api.get(`admin/products/${categoryId}`, {
    params: {
      page,
      limit:2,
      minPrice,
      maxPrice
    },
  });
}
;


static async getReviewList({productId})
{
  console.log(productId)
  return await api.get(`/reviews/list/${productId}`)
}


static async createReview({reviewId, reply}){
  console.log(reviewId)
  return await api.post(`admin/review/reply`,
    {
      reviewId,
      reply
    }
  )
}


static async createAdminProduct({formData, categoryId}){

  return await api.post(`admin/product/${categoryId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}


static async updateAdminProduct({formData, id,})
{  return await api.put(`admin/product/${id}`, formData, {
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


  static async getUnreadNotifications() {
    return await api.get("admin-notification/unread",
    );
  };


  static async markNotificationAsRead({notificationId}) {
    return await api.patch(`admin-notification/${notificationId}/read`,
     null
    );
  };


}



