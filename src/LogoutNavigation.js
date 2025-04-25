import {Route, Routes} from "react-router-dom";
import Layout from "./component/common/pages/Layout";
import AdminCategoryList from "./component/common/pages/AdminCategoryList";
import AdminProductList from "./component/common/pages/AdminProductList";
import Login from "./component/common/pages/Login";
import SingleCategoryProduct from "./component/common/pages/SingleCategoryProduct";
import SingleAdminProduct from "./component/common/pages/SingleAdminProduct";
import Home from "./component/common/pages/Home";
import AdminUserProfile from "./component/common/AdminUserProfile";
import ErrorPage from "./component/common/pages/ErrorPage";


function LogoutNavigation() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>




        <Route path="/profile" element={<AdminUserProfile/>}/>

        <Route path="/admin/category" element={<AdminCategoryList/>} />

        <Route path="/admin/:product" element={<AdminProductList/>} />
        <Route path="/admin/category/:categoryId" element={<SingleCategoryProduct/>} />
        <Route path="/admin/product/:productId" element={<SingleAdminProduct/>} />

        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<ErrorPage />} />

        {/*<Route path="/admin/product/:productId" element={<AdminDiscountProduct/>} />*/}

      </Route>
    </Routes>
  );
}

export default LogoutNavigation;
