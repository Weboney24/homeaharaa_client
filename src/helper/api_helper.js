import axios from "axios";

const BASE_URL = process.env.BASE_URL;
export const CUSTOMER_URL = process.env.CUSTOMER_URL;
export const UPLOAD_BASE_URL = process.env.UPLOAD_BASE_URL;
export const CURRENCY_API = process.env.CURRENCY_API;

// const BASE_URL = "https://homeaharaaservice-msms-projects.vercel.app/homeaharaa_api";

let searchData = (value) => {
  return value || null;
};

// currency Api

export const getCurrency = async () => await axios.get(`https://api.currencyapi.com/v3/latest?apikey=${CURRENCY_API}&base_currency=INR`);
export const getCurrentCountry = async () => await axios.get(`https://ipinfo.io/json`);

// without token
export const addEnquiryMessage = async (formData) => await axios.post(`${BASE_URL}/client_enquire/add_enquiry`, formData);

//category
export const getMainCategory = async (search) => await axios.get(`${BASE_URL}/client_category/get_main_category/${searchData(search)}`);

export const getSubCategory = async (search) => await axios.get(`${BASE_URL}/client_category/get_sub_category/${searchData(search)}`);

export const getFilteredcategory = async () => await axios.get(`${BASE_URL}/client_category/get_filtered_category`);

// banner
export const getBanners = async (search) => await axios.get(`${BASE_URL}/client_banner/get_banner/${searchData(search)}`);

// products
export const getProduct = async (search) => await axios.get(`${BASE_URL}/product/get_products/${searchData(search)}`);

// users
export const registerUser = async (formData) => await axios.post(`${BASE_URL}/client_user/registerusers`, formData);

export const authUser = async (formData) => await axios.post(`${BASE_URL}/client_user/auth_user`, formData);

// blogs
export const getBlogs = async (search) => await axios.get(`${BASE_URL}/client_blogs/get_blogs/${searchData(search)}`);

// forgotpassword 
export const VerifyResetLink = async (id) => await axios.get(`${BASE_URL}/client_forgotpassword/verifyreset_link/${id}`);

export const resetPassword = async (formData) => await axios.post(`${BASE_URL}/client_forgotpassword/reset_password`, formData);

export const sendForgotPasswordEmail = async (email) => await axios.post(`${BASE_URL}/client_forgotpassword/send_forgotpassword_email`, { user_email: email });

// custom axios
// with token
const with_token = axios.create({});

with_token.interceptors.request.use((config) => {
  let token = localStorage.getItem("O3blXRBXk5Zt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const checkClientLoginStatus = async () => await with_token.get(`${BASE_URL}/client_user/client_auth_status`);

export const uploadImage = async (formData) => await with_token.post(`${UPLOAD_BASE_URL}/upload_images`, formData);


// cart
export const collectCartCount = async () => await with_token.get(`${BASE_URL}/client_user/collect_initial_cart_count`);

export const addToCart = async (formData) => await with_token.post(`${BASE_URL}/cart_actions/add_to_cart`, formData);

export const collectMyCarts = async () => await with_token.get(`${BASE_URL}/cart_actions/collect_my_carts`);

export const removeProduct = async (id) => await with_token.put(`${BASE_URL}/cart_actions/remove_product_form_carts/${id}`);

// wishlist
export const collectWishlistCount = async () => await with_token.get(`${BASE_URL}/client_user/collect_initial_wishlist_count`);

export const addToWishlist = async (formData) => await with_token.post(`${BASE_URL}/wishlist_actions/add_to_wishlist`, formData);

export const collectMyWishlist = async () => await with_token.get(`${BASE_URL}/wishlist_actions/collect_my_wishlist`);

export const removeProductFromWishlist = async (id) => await with_token.put(`${BASE_URL}/wishlist_actions/remove_product_form_wishlist/${id}`);


// custom product filtering
export const getFilterProduct = async (search) => {
  let token = localStorage.getItem("O3blXRBXk5Zt");
  if (token) {
    return await with_token.get(`${BASE_URL}/client_product/get_filter_product_with_token/${search}`);
  } else {
    return await axios.get(`${BASE_URL}/client_product/get_filter_product/${search}`);
  }
}

// delivery addresses
export const addDeliveryAddress = async (formData) => await with_token.post(`${BASE_URL}/client_delivery_address/add_new_delivery_address`, formData);

export const getMyDeliveryAddress = async () => await with_token.get(`${BASE_URL}/client_delivery_address/collect_my_delivery_address`);

export const deleteMyDeliveryAddress = async (id) => await with_token.delete(`${BASE_URL}/client_delivery_address/delete_my_delivery_address/${id}`);

export const updateMyDeliveryAddress = async (formData, id) => await with_token.put(`${BASE_URL}/client_delivery_address/update_my_delivery_address/${id}`, formData);


// user
export const updateUser = async (formData) => await with_token.put(`${BASE_URL}/client_user/update_user_profile`, formData);

export const updateUserPassword = async (formData) => await with_token.put(`${BASE_URL}/client_user/update_user_password`, formData);


// order
export const createOrder = async (formData) => await with_token.post(`${BASE_URL}/client_order_process/create_order`, formData);

export const collectMyOrders = async (id = null) => await with_token.get(`${BASE_URL}/client_order_process/collect_order/${id}`);

export const cancelMyOrder = async (formData) => await with_token.put(`${BASE_URL}/client_order_process/update_order_status`, formData);

// country
export const collectAllCountry = async (search) => await with_token.get(`${BASE_URL}/client_country/get_all_country/${searchData(search)}`);

// review
export const addUserReview = async (formData) => await with_token.post(`${BASE_URL}/client_reviews/add_reviews`, formData);

export const getReviewsByProduct = async (id = null) => await axios.get(`${BASE_URL}/without_token/get_reviewby_product/${id}`);

export const getMyAllReviews = async () => await with_token.get(`${BASE_URL}/client_reviews/get_my_reviews`);

export const deleteMyReview = async (id) => await with_token.delete(`${BASE_URL}/client_reviews/delete_my_review/${id}`);

export const editMyReview = async (formData, id) => await with_token.put(`${BASE_URL}/client_reviews/edit_my_review/${id}`, formData);

// blog comments
export const addUserBlogComments = async (formData) => await with_token.post(`${BASE_URL}/client_blog_comments/add_blog_comments`, formData);

export const getCommentsByBlogs = async (id = null) => await axios.get(`${BASE_URL}/without_token/get_commentby_blog/${id}`);

export const getMyAllBlogComments = async () => await with_token.get(`${BASE_URL}/client_blog_comments/get_my_blog_comments`);

export const deleteMyBlogComments = async (id) => await with_token.delete(`${BASE_URL}/client_blog_comments/delete_myblog_comments/${id}`);

export const editMyBlogComments = async (formData, id) => await with_token.put(`${BASE_URL}/client_blog_comments/edit_myblog_comments/${id}`, formData);

// coupon

export const verifyCouponCode = async (code) => await with_token.get(`${BASE_URL}/client_coupons/verify_coupon_code/${code}`);

// history

export const addProductToHistory = async (formData) => await with_token.post(`${BASE_URL}/client_history/add_to_history`, formData);

export const collectMyHistory = async () => await with_token.get(`${BASE_URL}/client_history/collect_my_history`);

export const removeProductFromHistory = async (id) => await with_token.delete(`${BASE_URL}/client_history/remove_product_form_history/${id}`);

