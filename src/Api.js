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
  static getProfile() {
    return api.get("users/profile")
  }

  static forgotPassword({email}) {
    console.log(email,777777777)
    return api.post(`/users/forgot/password`, {email});
  }



  static updatePassword({newPassword, key}) {
    console.log(newPassword, key)
    return api.put(`/users/update/password`, {newPassword, key});
  }

  static resendCode({email}) {
    return api.post(`/users/resend-code`, {email});
  }

  ////admin
  static getAdminCategories() {
    return api.get("admin/categories")
  }

  static async getAdminProducts({page, limit, minPrice, maxPrice}) {
    return await api.get("admin/products", {
      params: {
        page,
        limit,
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
    return await api.get(
      "/admin/buyers/",{
        params: {
          startDate,
          endDate
        },
      });
  };


  static async searchAdminProduct({page, limit, search, minPrice, maxPrice, categoryId}) {
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

  return await api.get(`admin/products/${categoryId}`, {
    params: {
      page,
      limit,
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


  static async markNotificationAsRead({ notificationId }) {
    return await api.patch(
      `admin-notification/${notificationId}/read`
    );
  }


}



