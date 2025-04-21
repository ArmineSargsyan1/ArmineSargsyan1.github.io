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

//verjn
// import React, {useEffect, useRef, useState} from 'react';
// import {Link, NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
// import MobileMenu from "../MobileMenu";
// import {ReactComponent as Dashboard} from "../../../assets/image/dashboard.svg";
// import {ReactComponent as ProductsIcon} from "../../../assets/image/products.svg";
// import {ReactComponent as Settings} from "../../../assets/image/settings.svg";
// import {ReactComponent as Category} from "../../../assets/image/category.svg";
// import {ReactComponent as AddProducts} from "../../../assets/image/addProducts.svg";
//
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
// import {setClickedBar} from "../../store/actions/user";
//
// const menuLink = [
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
//   },
//   {
//     path: "/settings",
//     value: "Settings",
//     icon: <Settings/>
//   },
//
//   {
//     path: "/admin/category",
//     state: true,
//     value: "Add product",
//     icon: <AddProducts/>
//   },
//
//   {
//     path: "/login",
//     value: "login",
//     icon: <Login/>
//   },
//
//   // localStorage.getItem('token') && {
//   //   path: "/login",
//   //   value: "logout",
//   //   icon: <LogOut/>
//   // },
// ]
//    .filter(Boolean);
//
//
//
// const Header = () => {
//
//   const navigate = useNavigate()
//   const {query, setQuery} = useQuery();
//
//   const location = useLocation();
//   const params = useParams()
//
//
//   const lastWorld = location.pathname === "/" ? 'Dashboard' :
//     params
//     ? location.pathname.split('/')[2]
//     : (location.pathname.split('/').pop() );
//
//
//   const dispatch = useDispatch();
//   const clickedBar = useSelector((state) => state.users.clickedBar);
//
//
//   const [sidebarWidth, setSidebarWidth] = useState(0);
//   const sidebarRef = useRef(null);
//
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//
//   const {search, minPrice, maxPrice} = query
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//
//   useEffect(() => {
//     if (windowWidth >= 992) {
//       dispatch(setClickedBar(false));
//     }
//   }, [windowWidth]);
//
//   const onChangeMenu = () => {
//     dispatch(setClickedBar(!clickedBar));
//   };
//
//
//
//   const getProductsList = () => {
//     if (!params.categoryId
//       && search && search.trim()
//       && lastWorld !== "products"
//     ) {
//       navigate(`/admin/products?page=${query.page || 1}&search=${encodeURIComponent(search || "")}`)
//
//     }
//   };
//
//
//   useEffect(() => {
//     getProductsList()
//   }, [search]);
//
//
//   const onKeyDown = (e) => {
//     if (e.key === "Enter") {
//
//       getProductsList();
//     }
//   };
//
//
//   return (
//     <header className="header">
//       <MobileMenu
//       clickedBar={clickedBar}
//       onChangeMenu={onChangeMenu}
//       setClickedBar={setClickedBar}
//     />
//       <div className="search-bar">
//         <div className="header__info">
//
//           <Link to={"/"}>
//             <Logo className="header__logo"/>
//           </Link>
//
//           <h2 className="header__title">{lastWorld}</h2>
//         </div>
//
//
//         <div className="header__info">
//           <div className="header__search" onClick={ getProductsList}>
//             <Input
//               type="text"
//               placeholder="Search products..."
//               value={query.search || ""}
//               onChange={({ target: { value } }) => setQuery({ ...query, page: 1, search: value })}
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
//
//             <li className="nav__list" key={item.path}>
//             <NavLink to={item.path} className="nav__link">
//                 <div style={{display: "flex", gap: 8, alignItems: "center"}}>
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



// // verjn
// import React, {useEffect, useRef, useState} from 'react';
// import {Link, NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
// import MobileMenu from "../MobileMenu";
// import {ReactComponent as Dashboard} from "../../../assets/image/dashboard.svg";
// import {ReactComponent as ProductsIcon} from "../../../assets/image/products.svg";
// import {ReactComponent as Settings} from "../../../assets/image/settings.svg";
// import {ReactComponent as Category} from "../../../assets/image/category.svg";
// import {ReactComponent as AddProducts} from "../../../assets/image/addProducts.svg";
//
// import {ReactComponent as Login} from "../../../assets/image/login.svg";
// import {ReactComponent as LogOut} from "../../../assets/image/logout.svg";
//
// import {ReactComponent as DownArrow} from "../../../assets/image/caret-down-solid.svg";
// import {ReactComponent as Logo} from "../../../assets/image/downArrow.svg";
// import {ReactComponent as UserProfileIcon} from "../../../assets/image/user.svg";
//
//
// import useQuery from "../../../utils/useQuery";
// import Input from "../Input";
// import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {fetchProducts} from "../../store/actions/adminProduct";
// import {useDispatch, useSelector} from "react-redux";
// import {getUserProfileRequest, setClickedBar} from "../../store/actions/user";
// import Notification from "../Notification";
// import _ from "lodash";
//
// const menuLink = [
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
//   },
//   {
//     path: "/settings",
//     value: "Settings",
//     icon: <Settings/>
//   },
//
//   {
//     path: "/profile",
//     value: "Profile",
//     icon: <UserProfileIcon/>
//   },
//   {
//     path: "/login",
//     value: "login",
//     icon: <Login/>
//   },
//
//   // localStorage.getItem('token') && {
//   //   path: "/login",
//   //   value: "logout",
//   //   icon: <LogOut/>
//   // },
// ]
//    .filter(Boolean);
//
//
//
// const Header = () => {
//
//   const navigate = useNavigate()
//   const {query, setQuery} = useQuery();
//
//   const location = useLocation();
//   const params = useParams()
//
//   const lastWorld = location.pathname === "/" ? 'Dashboard' :
//     params
//     ? location.pathname.split('/')[2]
//     : (location.pathname.split('/').pop() );
//
//
//   const dispatch = useDispatch();
//   const clickedBar = useSelector((state) => state.users.clickedBar);
//   const user = useSelector((state) => state.users.user);
//
//   const [sidebarWidth, setSidebarWidth] = useState(0);
//   const sidebarRef = useRef(null);
//
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//
//   const {search, minPrice, maxPrice} = query
//
//
//   useEffect(() => {
//     dispatch(getUserProfileRequest())
//   }, []);
//
//
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//
//   useEffect(() => {
//     if (windowWidth >= 992) {
//       dispatch(setClickedBar(false));
//     }
//   }, [windowWidth]);
//
//   const onChangeMenu = () => {
//     dispatch(setClickedBar(!clickedBar));
//   };
//
//
//
//   const getProductsList = () => {
//     if (!params.categoryId
//       && search && search.trim()
//       && lastWorld !== "products"
//     ) {
//       navigate(`/admin/products?page=${query.page || 1}&search=${encodeURIComponent(search || "")}`)
//
//     }
//   };
//
//
//   useEffect(() => {
//     getProductsList()
//   }, [search]);
//
//
//   const onKeyDown = (e) => {
//     if (e.key === "Enter") {
//
//       getProductsList();
//     }
//   };
//
//   return (
//     <header className="header">
//       <MobileMenu
//       clickedBar={clickedBar}
//       onChangeMenu={onChangeMenu}
//       setClickedBar={setClickedBar}
//     />
//       <div className="search-bar">
//         <div className="header__info">
//
//           <Link to={"/"}>
//             <Logo className="header__logo"/>
//           </Link>
//
//           <h2 className="header__title">{lastWorld || "Profile"} </h2>
//         </div>
//
//         {/*<Notification/>*/}
//         <div className="header__info">
//           <div className="header__search" onClick={ getProductsList}>
//             <Input
//               type="text"
//               placeholder="Search products..."
//               value={query.search || ""}
//               onChange={({ target: { value } }) => setQuery({ ...query, page: 1, search: value })}
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
//             {user.avatar
//               && <>
//                 <Notification/>
//                 <Link to="/profile" className="user-profile-link">
//                   <span className="user-name">{user.firstName} {user.lastName}</span>
//                   {user.avatar?.[0]?.path && (
//                     <img
//                       src={user.avatar[0].path}
//                       alt={`${user.firstName} ${user.lastName}`}
//                       className="user-avatar"
//                     />
//                   )}
//                 </Link>
//
//
//               </>
//             }
//             <LogOut className="down-arrow">
//             {/*<DownArrow className="down-arrow"/>*/}
//           </div>
//         </div>
//
//
//       </div>
//       <nav className="nav">
//       <ul className={`nav__block ${!clickedBar ? "active" : ""}`}>
//           {menuLink.map((item) => (
//
//             <li className="nav__list" key={item.path}>
//               <NavLink to={item.path} className="nav__link">
//                 <div style={{display: "flex", gap: 8, alignItems: "center"}}>
//                   {item.icon}
//                   {item.value}
//
//                 </div>
//               </NavLink>
//             </li>
//           ))}
//           <li className="nav__list" key="add-product">
//             <div
//               className="nav__link"
//               style={{cursor: "pointer"}}
//               onClick={() => {
//                 // const categoryId = "replace_with_default_or_dynamic_id"; // Set or fetch dynamically
//                 navigate(`/admin/category`, {
//                   state: true
//                 });
//               }}
//             >
//               <div style={{display: "flex", gap: 8, alignItems: "center"}}>
//                 <AddProducts/>
//                 Add Product
//               </div>
//             </div>
//           </li>
//         </ul>
//
//
//       </nav>
//
//     </header>
//   );
// };
//
// export default Header;


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





  import React, {useEffect, useRef, useState} from 'react';
  import {Link, NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
  import MobileMenu from "../MobileMenu";
  import {ReactComponent as Dashboard} from "../../../assets/image/dashboard.svg";
  import {ReactComponent as ProductsIcon} from "../../../assets/image/products.svg";
  import {ReactComponent as Settings} from "../../../assets/image/settings.svg";
  import {ReactComponent as Category} from "../../../assets/image/category.svg";
  import {ReactComponent as AddProducts} from "../../../assets/image/addProducts.svg";

  import {ReactComponent as Login} from "../../../assets/image/login.svg";
  import {ReactComponent as LogOut} from "../../../assets/image/logout.svg";

  import {ReactComponent as Logo} from "../../../assets/image/downArrow.svg";
  import {ReactComponent as UserProfileIcon} from "../../../assets/image/user.svg";


  import useQuery from "../../../utils/useQuery";
  import Input from "../Input";
  import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
  import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
  import {fetchProducts} from "../../store/actions/adminProduct";
  import {useDispatch, useSelector} from "react-redux";
  import {getUserProfileRequest, logoutUser, setClickedBar} from "../../store/actions/user";
  import Notification from "../Notification";
  import _ from "lodash";
  import Button from "../Button";
import ClearCartModal from "../ClearCardModal";
import Loader from "../Loader";

  const menuLink = [
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

    {
      path: "/profile",
      value: "Profile",
      icon: <UserProfileIcon/>
    },

  ]
    .filter(Boolean);



  const Header = () => {

    const navigate = useNavigate()
    const {query, setQuery} = useQuery();

    const location = useLocation();
    const params = useParams()

    const lastWorld = location.pathname === "/" ? 'Dashboard' :
      params
        ? location.pathname.split('/')[2]
        : (location.pathname.split('/').pop() );


    const dispatch = useDispatch();
    const clickedBar = useSelector((state) => state.users.clickedBar);
    const user = useSelector((state) => state.users.user);
    const  token  = useSelector((state) => state.users.token);

    const [sidebarWidth, setSidebarWidth] = useState(0);
    const sidebarRef = useRef(null);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {search, minPrice, maxPrice} = query


    useEffect(() => {
      dispatch(getUserProfileRequest())
    }, []);


    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
      if (windowWidth >= 992) {
        dispatch(setClickedBar(false));
      }
    }, [windowWidth]);

    const onChangeMenu = () => {
      dispatch(setClickedBar(!clickedBar));
    };



    const getProductsList = () => {
      if (!params.categoryId
        && search && search.trim()
        && lastWorld !== "products"
      ) {
        navigate(`/admin/products?page=${query.page || 1}&search=${encodeURIComponent(search || "")}`)

      }
    };


    useEffect(() => {
      getProductsList()
    }, [search]);


    const onKeyDown = (e) => {
      if (e.key === "Enter") {

        getProductsList();
      }
    };


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const onLogout = () => {
      dispatch(logoutUser());
      navigate('/login');
    };

    const confirmLogout = () => {
      onLogout();
      closeModal();
    };

    return (
      <header className="header">
        <MobileMenu
          clickedBar={clickedBar}
          onChangeMenu={onChangeMenu}
          setClickedBar={setClickedBar}
        />
        <div className="search-bar">
          <div className="header__info">

            <Link to={"/"}>
              <Logo className="header__logo"/>
            </Link>

            <h2 className="header__title">{lastWorld || "Profile"} </h2>
          </div>

          {/*<Notification/>*/}
          <div className="header__info">
            <div className="header__search" onClick={ getProductsList}>
              <Input
                type="text"
                placeholder="Search products..."
                value={query.search || ""}
                onChange={({ target: { value } }) => setQuery({ ...query, page: 1, search: value })}
                onKeyDown={onKeyDown}
              />

              <FontAwesomeIcon
                icon={faMagnifyingGlass} className="glass"
                onClick={getProductsList}
              />

            </div>
            <div className="header__user-profile">
              {_.isEmpty(user)
                ?
                <div className="loader-wrapper header__user-profile loading">
                  {Array.from({ length: 1 }).map((_, i) => (
                    <div className="skeleton-block" key={i} style={{ minHeight: 35, width: 230, marginLeft: 10}}>
                      <div className="skeleton-shimmer" />
                    </div>
                  ))}
                </div>

                :<>
                  <Notification/>
                  <Link to="/profile" className="user-profile-link">
                    <span className="user-name">{user.firstName} {user.lastName}</span>
                    {user.avatar?.[0]?.path && (
                      <img
                        src={user.avatar[0].path}
                        alt={`${user.firstName} ${user.lastName}`}
                        // className="user-avatars"
                      />
                    )}
                  </Link>
                </>
              }

            </div>
          </div>


        </div>
        <nav className="nav">
          <ul className={`nav__block ${!clickedBar ? "active" : ""}`}>
            {menuLink.map((item) => (

              <li className="nav__list" key={item.path}>
                <NavLink to={item.path} className="nav__link">
                  <div style={{display: "flex", gap: 8, alignItems: "center"}}>
                    {item.icon}
                    {item.value}

                  </div>
                </NavLink>
              </li>
            ))}
            <li className="nav__list" key="add-product">
              <div
                className="nav__link"
                style={{cursor: "pointer"}}
                onClick={() => {
                  navigate(`/admin/category`, {
                    state: true
                  });
                }}
              >
              </div>
            </li>

              <div className="nav__link-buttons">
                <Button className="nav__link-button" onClick={() => {
                  navigate(`/admin/category`, {
                    state: true
                  });
                }}>
                  <AddProducts/>
                  <span>Add Product</span>
                </Button>

                {token ? <Button className="nav__link-button" onClick={openModal}>
                  <LogOut className="logout-icon"/>
                  <span>Sign Out</span>
                </Button>

                  :   <Button
                    style={{backgroundColor: "limegreen"}}
                    onClick={() => {navigate(`/login`);}}

                  >
                    <Login className="logout-icon" style={{marginRight: 20}}/>
                    <span >Sign in</span>
                  </Button>
                }


              </div>

          </ul>


        </nav>

        <ClearCartModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmLogout}
          desc={"You're about to sign out. Are you sure you want to continue"}
        />
      </header>
  );
  };

  export default Header;
