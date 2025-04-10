// import React, {useEffect, useRef, useState} from 'react';
// import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
// import MobileMenu from "../MobileMenu";
// import {ReactComponent as Dashboard} from "../../../assets/image/dashboard.svg";
// import {ReactComponent as ProductsIcon} from "../../../assets/image/products.svg";
// import {ReactComponent as Settings} from "../../../assets/image/settings.svg";
// import {ReactComponent as Category} from "../../../assets/image/category.svg";
// import {ReactComponent as Login} from "../../../assets/image/login.svg";
// import {ReactComponent as LogOut} from "../../../assets/image/logout.svg";
//
// import {ReactComponent as DownArrow} from "../../../assets/image/caret-down-solid.svg";
// import {ReactComponent as Logo} from "../../../assets/image/downArrow.svg";
//
//
// import useQuery from "../../../utils/useQuery";
// import Input from "../Input";
// import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {fetchProducts} from "../../store/actions/adminProduct";
// import {useDispatch, useSelector} from "react-redux";
// import Search from "../Search";
//
//
// export const menuLink = [
//   {
//     path: "/",
//     value: "DashBoard",
//     icon: <Dashboard/>
//   },
//   {
//     path: "/admin/category",
//     value: "Category",
//     icon: <Category/>
//   },
//   {
//     path: "/admin/products",
//     value: "Products",
//     icon: <ProductsIcon/>
//
//   },
//   {
//     path: "/settings",
//     value: "Settings",
//     icon: <Settings/>
//   },
//   localStorage.getItem('token') && {
//     path: "/login",
//     value: "login",
//    icon: <Login/>
//   },
//
//
// ]
//
// const Header = () => {
//
// const navigate = useNavigate()
//   const { query, setQuery } = useQuery();
//
//   const location = useLocation();
//
//   const dispatch = useDispatch();
//
//   const products = useSelector((state) => state.products.products);
//
//   const [clickedBar, setClickedBar] = useState(false);
//   const [search, setSearch] = useState("");
//
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//     const [sidebarWidth, setSidebarWidth] = useState(0);
//   const sidebarRef = useRef(null);
//
//   const token = localStorage.getItem('token')
//
//
//
//
//
//   const onChangeMenu = () => {
//     setClickedBar((prev) => !prev);
//   };
//
//
//   const getProductsList = () => {
//     if (search.trim()) {
//       dispatch(fetchProducts({ search }));
//       navigate(`/admin/products?page=1&search=${encodeURIComponent(search)}`);
//     }
//   };
//   const onKeyDown = (e) => {
//     console.log(e,7777)
//     if (e.key === "Enter") {
//
//       getProductsList();
//     }
//   };
//
//   console.log(query)
//   return (
//     <header className="header">
//       <div className="search-bar">
//         <div className="header__info">
//           <MobileMenu
//             clickedBar={clickedBar}
//             onChangeMenu={onChangeMenu}
//             setClickedBar={setClickedBar}
//           />
//           <Link to={"/"}>
//             <Logo className="header__logo"/>
//           </Link>
//
//           <h2 className="header__title">Dashboard</h2>
//         </div>
//
//
//         <div className="header__info">
//           <div  className="header__search" >
//             <Input
//               type="text"
//               placeholder="Search products..."
//               value={search}
//               onChange={({target: {value}}) => setSearch(value)}
//               onKeyDown={onKeyDown}
//             />
//
//             <FontAwesomeIcon
//               icon={faMagnifyingGlass} className="glass"
//               onClick={getProductsList}
//             />
//
//           </div>
//           <div className="header__user-profile">
//             <span className="email">test@gmail.com</span>
//             <img
//               src="https://res.cloudinary.com/dhtmzujol/image/upload/v1739202498/avatar/2025-02-10T15:48:17.101Z-squid-game-anime.jpg"
//               alt="Avatar"
//             />
//             <DownArrow className="down-arrow"/>
//           </div>
//         </div>
//
//
//       </div>
//       <nav className="nav">
//         <ul className={`nav__block ${!clickedBar ? "active" : ""}`}>
//           {menuLink.map((item) => (
//             <li className="nav__list" key={item.path}>
//               <NavLink to={item.path} className="nav__link">
//                 <div style={{display: "flex", gap: 10, alignItems: "center"}}>
//                   {item.icon}
//                   {item.value}
//                 </div>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//
//       </nav>
//
//
//     </header>
//   );
// };
//
// export default Header;


import React, {useEffect, useRef, useState} from 'react';
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import MobileMenu from "../MobileMenu";
import {ReactComponent as Dashboard} from "../../../assets/image/dashboard.svg";
import {ReactComponent as ProductsIcon} from "../../../assets/image/products.svg";
import {ReactComponent as Settings} from "../../../assets/image/settings.svg";
import {ReactComponent as Category} from "../../../assets/image/category.svg";
import {ReactComponent as Login} from "../../../assets/image/login.svg";
import {ReactComponent as LogOut} from "../../../assets/image/logout.svg";

import {ReactComponent as DownArrow} from "../../../assets/image/caret-down-solid.svg";
import {ReactComponent as Logo} from "../../../assets/image/downArrow.svg";


import useQuery from "../../../utils/useQuery";
import Input from "../Input";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchProducts} from "../../store/actions/adminProduct";
import {useDispatch, useSelector} from "react-redux";
import Search from "../Search";


export const menuLink = [
  {
    path: "/",
    value: "DashBoard",
    icon: <Dashboard/>
  },
  {
    path: "/admin/category",
    value: "Category",
    icon: <Category/>
  },
  {
    path: "/admin/products",
    value: "Products",
    icon: <ProductsIcon/>

  },
  {
    path: "/settings",
    value: "Settings",
    icon: <Settings/>
  },
  localStorage.getItem('token') && {
    path: "/login",
    value: "login",
    icon: <Login/>
  },


]

const Header = () => {

  const navigate = useNavigate()
  const {query, setQuery} = useQuery();

  const location = useLocation();

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  const [clickedBar, setClickedBar] = useState(false);
  const [search, setSearch] = useState("");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const sidebarRef = useRef(null);



  const onChangeMenu = () => {
    setClickedBar((prev) => !prev);
  };


  const getProductsList = () => {
    if (search.trim()) {
      dispatch(fetchProducts({search}));
      navigate(`/admin/products?page=1&search=${encodeURIComponent(search)}`);
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {

      getProductsList();
    }
  };






  console.log(query,8888888)
  return (
    <header className="header">
      <div className="search-bar">
        <div className="header__info">
          <MobileMenu
            clickedBar={clickedBar}
            onChangeMenu={onChangeMenu}
            setClickedBar={setClickedBar}
          />
          <Link to={"/"}>
            <Logo className="header__logo"/>
          </Link>

          <h2 className="header__title">Dashboard</h2>
        </div>


        <div className="header__info">
          <div className="header__search">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={({target: {value}}) => setSearch(value)}
              onKeyDown={onKeyDown}
            />

            <FontAwesomeIcon
              icon={faMagnifyingGlass} className="glass"
              onClick={getProductsList}
            />

          </div>
          <div className="header__user-profile">
            <span className="email">test@gmail.com</span>
            <img
              src="https://res.cloudinary.com/dhtmzujol/image/upload/v1739202498/avatar/2025-02-10T15:48:17.101Z-squid-game-anime.jpg"
              alt="Avatar"
            />
            <DownArrow className="down-arrow"/>
          </div>
        </div>


      </div>
      <nav className="nav">
        <ul className={`nav__block ${!clickedBar ? "active" : ""}`}>
          {!clickedBar && (
            <div style={{display: clickedBar ? "none" : "block"}}>
              <Search query={query} setQuery={setQuery}/>
            </div>
          )}
          {menuLink.map((item) => (
            <li className="nav__list" key={item.path}>
            <NavLink to={item.path} className="nav__link">
                <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                  {item.icon}
                  {item.value}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>

      </nav>


    </header>
  );
};

export default Header;


// import React, {useState} from 'react';
// import {Link, NavLink} from "react-router-dom";
// import MobileMenu from "../MobileMenu";
// // import {ReactComponent as Logo} from "../../assets/image/logo.svg";
//
//
//
// export const menuLink= [
//   {
//     path: "/",
//     value: "Home"
//   },
//
//   {
//     path: "/admin/category",
//     value: "Category"
//   },
//
//   {
//     path: "/admin/:product",
//     value: "Products"
//   },
//
//   {
//     path: "/settings",
//     value: "Settings"
//   },
//   // {
//   //   path: "/login",
//   //   value: "login"
//   // },
//
//   //
//   // {
//   //   path: "/users",
//   //   value: "users"
//   // }
// ]
//
//
//
// const Header = () => {
//
//   const [clickedBar, setClickedBar] = useState(false)
//
//   const onChangeMenu = () => {
//     setClickedBar((prev) => !prev)
//   }
//
//   return (
//     <header className="header">
//       <div className="container">
//         <nav className="nav">
//           <Link to={"/"}>
//             {/*<Logo className="nav__logo"/>*/}
//
//           </Link>
//
//           <ul className={`nav__block ${clickedBar ? "active" : ""}`}>
//
//             {menuLink.map((item) => (
//               <li
//                 className="nav__list"
//                 key={item.path}>
//                 <NavLink
//                   to={item.path}
//                   className="nav__link">
//                   {item.value}
//                 </NavLink>
//               </li>
//             ))}
//
//           </ul>
//
//           <MobileMenu
//             clickedBar={clickedBar}
//             onChangeMenu={onChangeMenu}
//             setClickedBar={setClickedBar}
//           />
//
//         </nav>
//       </div>
//     </header>
//   );
// };
//
//
// export default Header;

//
//
//
// import React, {useEffect, useRef, useState} from 'react';
// import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
// import MobileMenu from "../MobileMenu";
// import {ReactComponent as Dashboard} from "../../../assets/image/dashboard.svg";
// import {ReactComponent as ProductsIcon} from "../../../assets/image/products.svg";
// import {ReactComponent as Settings} from "../../../assets/image/settings.svg";
// import {ReactComponent as Category} from "../../../assets/image/category.svg";
// import {ReactComponent as Login} from "../../../assets/image/login.svg";
// import {ReactComponent as LogOut} from "../../../assets/image/logout.svg";
//
// import {ReactComponent as DownArrow} from "../../../assets/image/caret-down-solid.svg";
// import {ReactComponent as Logo} from "../../../assets/image/downArrow.svg";
//
//
// import useQuery from "../../../utils/useQuery";
// import Input from "../Input";
// import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {fetchProducts} from "../../store/actions/adminProduct";
// import {useDispatch, useSelector} from "react-redux";
//
//
// // export const menuLink = [
// //   {
// //     path: "/",
// //     value: "DashBoard",
// //     icon: <Dashboard/>
// //   },
// //   {
// //     path: "/admin/category",
// //     value: "Category",
// //     icon: <Category/>
// //   },
// //   {
// //     path: "/admin/products",
// //     value: "Products",
// //     icon: <ProductsIcon/>
// //
// //   },
// //   {
// //     path: "/settings",
// //     value: "Settings",
// //     icon: <Settings/>
// //   },
// //  {
// //     path: "/login",
// //     value: "login",
// //    icon: <Login/>
// //   },
// //
// //   {
// //     path: "/login",
// //     value: "logOut",
// //     icon: <LogOut/>
// //   },
// // ]
// export const menuLink = [
//   {
//     path: "/",
//     value: "DashBoard",
//     icon: <Dashboard />,
//     type: "link",
//   },
//   {
//     path: "/admin/category",
//     value: "Category",
//     icon: <Category />,
//     type: "link",
//   },
//   {
//     path: "/admin/products",
//     value: "Products",
//     icon: <ProductsIcon />,
//     type: "link",
//   },
//   {
//     path: "/settings",
//     value: "Settings",
//     icon: <Settings />,
//     type: "link",
//   },
//   {
//     value: "Logout",
//     icon: <LogOut />,
//     type: "button",
//   },
// ];
// const Header = () => {
//
//   const navigate = useNavigate()
//   const { query, setQuery } = useQuery();
//
//   const location = useLocation();
//
//   const dispatch = useDispatch();
//
//   const products = useSelector((state) => state.products.products);
//
//   const [clickedBar, setClickedBar] = useState(false);
//   const [search, setSearch] = useState("");
//
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [sidebarWidth, setSidebarWidth] = useState(0);
//   const sidebarRef = useRef(null);
//
//   const token = localStorage.getItem('token')
//
//
//
//
//
//   const onChangeMenu = () => {
//     setClickedBar((prev) => !prev);
//   };
//
//
//   const getProductsList = () => {
//     if (search.trim()) {
//       dispatch(fetchProducts({ search }));
//       navigate(`/admin/products?page=1&search=${encodeURIComponent(search)}`);
//     }
//   };
//   const onKeyDown = (e) => {
//     console.log(e,7777)
//     if (e.key === "Enter") {
//
//       getProductsList();
//     }
//   };
//
//
//   return (
//     <header className="header">
//       <div className="search-bar">
//         <div className="header__info">
//           <MobileMenu
//             clickedBar={clickedBar}
//             onChangeMenu={onChangeMenu}
//             setClickedBar={setClickedBar}
//           />
//           <Link to={"/"}>
//             <Logo className="header__logo"/>
//           </Link>
//
//           <h2 className="header__title">Dashboard</h2>
//         </div>
//
//
//         <div className="header__info">
//           <div style={{position: "relative"}}>
//             <Input
//               type="text"
//               placeholder="Search products..."
//               value={search}
//               onChange={({target: {value}}) => setSearch(value)}
//               onKeyDown={onKeyDown}
//             />
//
//             <FontAwesomeIcon
//               icon={faMagnifyingGlass} className="glass"
//               onClick={getProductsList}
//             />
//
//           </div>
//           <div className="header__user-profile">
//             <span className="email">test@gmail.com</span>
//             <img
//               src="https://res.cloudinary.com/dhtmzujol/image/upload/v1739202498/avatar/2025-02-10T15:48:17.101Z-squid-game-anime.jpg"
//               alt="Avatar"
//             />
//             <DownArrow className="down-arrow"/>
//           </div>
//         </div>
//
//
//       </div>
//       <nav className="nav">
//         {/*<ul className={`nav__block ${!clickedBar ? "active" : ""}`}>*/}
//         {/*  {menuLink.map((item) => (*/}
//         {/*    <li className="nav__list" key={item.path}>*/}
//         {/*      <NavLink to={item.path} className="nav__link">*/}
//         {/*        <div style={{display: "flex", gap: 10, alignItems: "center"}}>*/}
//         {/*          {item.icon}*/}
//         {/*          {item.value}*/}
//         {/*        </div>*/}
//         {/*      </NavLink>*/}
//         {/*    </li>*/}
//         {/*  ))}*/}
//         {/*</ul>*/}
//         <ul className={`nav__block ${!clickedBar ? "active" : ""}`}>
//           {menuLink.map((item, index) => (
//             <li className="nav__list" key={index}>
//               {item.type === "link" ? (
//                 <NavLink to={item.path} className="nav__link">
//                   <div style={{display: "flex", gap: 10, alignItems: "center"}}>
//                     {item.icon}
//                     {item.value}
//                   </div>
//                 </NavLink>
//               ) : (
//                 <button
//                   className="nav__link logout-button"
//                   onClick={() => {
//                     localStorage.removeItem("token");
//                     dispatch({type: "auth/logout"}); // Optional if you want to reset Redux
//                     navigate("/login");
//                   }}
//                 >
//                   <div style={{display: "flex", gap: 10, alignItems: "center"}}>
//                     {item.icon}
//                     {item.value}
//                   </div>
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//
//       </nav>
//     </header>
//   );
// };
//
// export default Header;
