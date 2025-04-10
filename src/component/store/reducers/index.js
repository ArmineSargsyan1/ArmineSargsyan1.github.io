import {combineReducers} from "redux";
import {adminProductSlice} from "./adminProductSlice";
import {adminCategorySlice} from "./adminCategorySlice";
import {userSlice} from "./userSlice";

export const rootReducer = combineReducers({
  products: adminProductSlice,
  categories: adminCategorySlice,
  users: userSlice,

})
