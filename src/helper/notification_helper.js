import { notification } from "antd";
import _ from "lodash";
import Swal from "sweetalert2";

export const SUCCESS_NOTIFICATION = (message) => {
  return notification.success({ message: _.get(message, "data.message", ""), closable: false, placement: "top" });
};

export const ERROR_NOTIFICATION = (message) => {
  return notification.warning({
    message: _.get(message, "response.data.message", ""), closable: false, placement: "top"
  });
};

export const CUSTOM_ERROR_NOTIFICATION = (message) => {
  return notification.warning({
    message: message, closable: false, placement: "top"
  });
};

export const CUSTOM_SUCCESS_NOTIFICATION = (message) => {
  return notification.success({
    message: message, closable: false, placement: "top"
  });
};

export const SUCCESS_NOTIFICATION_SWAL = (message, title = "") => {
  return Swal.fire({ title: title, text: _.get(message, "data.message", ""), icon: "success", confirmButtonColor: "#FF7900", confirmButtonText: "Close" });
};

export const ERROR_NOTIFICATION_SWAL = (message, title = "") => {
  console.log(message, title);
  return Swal.fire({ title: title, text: _.get(message, "response.data.message", ""), icon: "warning", confirmButtonColor: "#FF7900", confirmButtonText: "Close" });
};
// Message handlers
const LOGIN_REQUIRED = "To add the item to your cart, please log in or register.";

// cart
const ALLREADY_IN_CART = "The item is already in the cart.";
const EMPTY_CART = "Your cart is empty.";

// wishlist
const ALLREADY_IN_WISHLIST = "The item is already in the wishlist.";
const YOUR_WISHLIST_EMPTY = "Your Favorites List is Empty";

// my profile
const EMPTY_REVIEWS = "You haven't added any reviews."
const EMPTY_BLOG_COMMENTS = "You haven't added any comments"
const EMPTY_DELIVERY_ADDRESS = "You haven't added any ddelivery Address."
const EMPTY_ORDER = "You haven't placed any orders"



export const MESSAGE_HANDLERS = {
  ALLREADY_IN_CART,
  LOGIN_REQUIRED,
  EMPTY_CART,
  ALLREADY_IN_WISHLIST,
  YOUR_WISHLIST_EMPTY,

  // my profile
  EMPTY_ORDER,
  EMPTY_DELIVERY_ADDRESS,
  EMPTY_REVIEWS,
  EMPTY_BLOG_COMMENTS
};