import {Route, Routes} from "react-router-dom";
import Layout from "./component/common/pages/Layout";
import AdminCategoryList from "./component/common/pages/AdminCategoryList";
import AdminProductList from "./component/common/pages/AdminProductList";
import Login from "./component/common/pages/Login";
import SingleCategoryProduct from "./component/common/pages/SingleCategoryProduct";
import SingleAdminProduct from "./component/common/pages/SingleAdminProduct";
import Home from "./component/common/pages/Home";


function App() {
  return (
    // <Orders/>
    // <ProductForm/>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>




        {/*<Route path="/user" element={<Users/>}/>*/}

        <Route path="/admin/category" element={<AdminCategoryList/>} />

        <Route path="/admin/:product" element={<AdminProductList/>} />
        <Route path="/admin/category/:categoryId" element={<SingleCategoryProduct/>} />
        <Route path="/admin/product/:productId" element={<SingleAdminProduct/>} />

        <Route path="/login" element={<Login/>} />


        {/*<Route path="/admin/product/:productId" element={<AdminDiscountProduct/>} />*/}


        {/*</Route>*/}






      </Route>
    </Routes>
  );
}

export default App;
