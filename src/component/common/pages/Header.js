import React, {useEffect, useRef, useState} from 'react';
import {Link, NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import MobileMenu from "../MobileMenu";
import {ReactComponent as Dashboard} from "../../../assets/image/dashboard.svg";
import {ReactComponent as ProductsIcon} from "../../../assets/image/products.svg";
import {ReactComponent as Settings} from "../../../assets/image/settings.svg";
import {ReactComponent as Category} from "../../../assets/image/category.svg";
import {ReactComponent as AddProducts} from "../../../assets/image/addProducts.svg";
import {ReactComponent as LogOut} from "../../../assets/image/logout.svg";
import {ReactComponent as UserProfileIcon} from "../../../assets/image/user.svg";
import {ReactComponent as UserIcon} from "../../../assets/image/user-solid (4).svg";

import logo from "../../../assets/image/logo.png"
import useQuery from "../../../utils/useQuery";
import Input from "../Input";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
      : (location.pathname.split('/').pop());


  const dispatch = useDispatch();
  const clickedBar = useSelector((state) => state.users.clickedBar);
  const user = useSelector((state) => state.users.user);


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {search} = query


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
      // navigate(`/admin/products?page=${query.page || 1}&search=${encodeURIComponent(search || "")}`)
      navigate(
        `/admin/products?page=${query.page || 1}&search=${encodeURIComponent(search || "")}`,
        {replace: true}
      );

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
    window.location.reload(true)
  };

  const confirmLogout = () => {
    onLogout();
    closeModal();
  };


  const handleClick = (item) => {
    navigate(item, {replace: true});
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
            <img src={logo} className="header__logo"/>
          </Link>

          <h2 className="header__title">{lastWorld || "Profile"} </h2>
        </div>

        {/*<Notification/>*/}
        <div className="header__info">
          <div className="header__search" onClick={getProductsList}>
            <Input
              type="text"
              placeholder="Search products..."
              value={query.search || ""}
              onChange={({target: {value}}) => setQuery({...query, page: 1, search: value})}
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
                {Array.from({length: 1}).map((_, i) => (
                  <div className="skeleton-block" key={i} style={{minHeight: 35, width: 230, marginLeft: 10}}>
                    <div className="skeleton-shimmer"/>
                  </div>
                ))}
              </div>

              : <>
                <Notification/>
                <Link to="/profile" className="user-profile-link">
                  <span className="user-name">{user.firstName} {user.lastName}</span>
                  {user.avatar?.[0]?.path ? (
                    <img
                      src={user.avatar[0].path}
                      alt={`${user.firstName} ${user.lastName}`}
                      // className="user-avatars"
                    />
                  ) : (
                    <UserIcon style={{borderRadius: "50%", background: "#f0f0f0", padding: "3px"}}/>
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

              <NavLink
                to={item.path}
                className={({isActive}) =>
                  isActive ? 'nav__link active' : 'nav__link'
                }
              >
                <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                  {item.icon}
                  {item.value}
                </div>
              </NavLink>


              {/*<div onClick={()=> navigate(item.path, { replace: true })} className="nav__link" style={{cursor: 'pointer'}}>*/}
              {/*  <div style={{display: "flex", gap: 8, alignItems: "center"}}>*/}
              {/*    {item.icon}*/}
              {/*    {item.value}*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<NavLink to={item.path, { replace: true }} className="nav__link">*/}
              {/*  <div style={{display: "flex", gap: 8, alignItems: "center"}}>*/}
              {/*    {item.icon}*/}
              {/*    {item.value}*/}

              {/*  </div>*/}
              {/*</NavLink>*/}
            </li>
          ))}

          <div className="nav__link-buttons">

            <Button
              className="add-product-btn nav"
              onClick={() => {
                navigate(`/admin/category`, {
                  state: true
                });


              }}>
              <AddProducts/>
              <span>Add Product</span>
            </Button>

            <Button className="nav__link-button" onClick={openModal}>
              <LogOut className="logout-icon"/>
              <span>Sign Out</span>
            </Button>

          </div>

        </ul>


      </nav>

      <ClearCartModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmLogout}
        desc={"You're about to sign out. Are you sure you want to continue"}
        buttonDesc={"Sign out"}
      />
    </header>
  );
};

export default Header;
