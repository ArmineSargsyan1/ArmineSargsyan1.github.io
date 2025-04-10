// import React, {useCallback, useEffect, useState} from 'react';
//
// import {NavLink, useNavigate} from "react-router-dom";
// import {ToastContainer, toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";
// import Input from "../Input";
// import Button from "../Button";
// import {useDispatch, useSelector} from "react-redux";
//
//
// const fields = [
//   {
//     id: 1,
//     path: "email",
//     type: "text",
//     placeholder: "Enter your First Name...",
//     label: "Email",
//
//   },
//
//   {
//     id: 2,
//     path: "password",
//     type: "password",
//     placeholder: "Enter your Password...",
//     label: "Password",
//   },
//
// ];
//
// const Login = () => {
//
//   const navigate = useNavigate()
//   const dispatch = useDispatch();
//
//   const { loading } = useSelector((state) => state);
//
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });
//
//
//
//   const onChange = useCallback((path, value)=>{
//     setUser((prev) => ({...prev, [path]: value}))
//     // setError("")
//   }, [])
//
//   const onLogin = async (e) => {
//     e.preventDefault();
//
//     try {
//       const {data} = await axios.post(`https://world-of-construction.onrender.com/users/login`, {
//         email: user.email,
//         password: user.password,
//       })
//       localStorage.setItem("token", data.token ? data.token : "")
//
//
//       console.log(data)
//       if (data.token) {
//         toast.success("success")
//         navigate("/")
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setError(error.response.data.message);
//     }
//
//
//   }
//
//
//   return (
//     <>
//       <div className="login">
//         <div className="login__wrapper">
//           <form className="login__wrapper-content" onSubmit={onLogin}>
//             <h2 className="login__title">Login</h2>
//
//               {fields.map((
//                 {
//                   path,
//                   type,
//                   id,
//                   label,
//                   placeholder
//                 }) => (
//                 <div key={id} className="input__box">
//                   <Input
//                     path={path}
//                     type={type}
//                     id={id}
//                     label={label}
//                     placeholder={placeholder}
//                     value={user[path]}
//                     onChange={({target: {value}}) => onChange(path, value)}
//                     errors={error}
//                     // className={`login__input ${errors.password ? 'error' : ''}`}
//
//                   />
//                 </div>
//               ))}
//
//             <button
//               type="submit"
//               className="login__button"
//               // disabled={loading}
//             >
//               {/*{loading ? 'Logging in...' : 'Login'}*/}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
//
//
//   // return (
//   //   <div className="login">
//   //     <div className="login__wrapper">
//   //       <form
//   //         className="login__wrapper-content"
//   //         onSubmit={onLogin}
//   //       >
//   //         <h2 className="login__title">Login</h2>
//   //
//   //         {fields.map((
//   //           {
//   //             path,
//   //             type,
//   //             id,
//   //             label,
//   //             placeholder
//   //           }) => (
//   //           <div key={id} className="input__box">
//   //             <Input
//   //               path={path}
//   //               type={type}
//   //               id={id}
//   //               label={label}
//   //               placeholder={placeholder}
//   //               value={user[path]}
//   //               onChange={({target: {value}}) => onChange(path, value)}
//   //               errors={error}
//   //             />
//   //           </div>
//   //         ))}
//   //
//   //         <Button
//   //           type="submit"
//   //           className="login__button"
//   //         >
//   //           Login
//   //         </Button>
//   //
//   //         {/*{error && <NavLink className="error" to={"/restart"}> Forgot Password?</NavLink>}*/}
//   //
//   //         {/*<div className="register__link">*/}
//   //         {/*  No account? <NavLink to={"/register"}>Sign up</NavLink>*/}
//   //         {/*</div>*/}
//   //       </form>
//   //     </div>
//   //     <ToastContainer/>
//   //   </div>
//   // );
// };
//
// export default Login;
//
//






















import React, {useCallback, useEffect, useState} from 'react';

import {useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Input from "../Input";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, setLogin} from "../../store/actions/user";
import Button from "../Button";


const fields = [
  {
    id: 1,
    path: "email",
    type: "text",
    placeholder: "Enter your email...",
    label: "Email",

  },

  {
    id: 2,
    path: "password",
    type: "password",
    placeholder: "Enter your Password...",
    label: "Password",
  },

];

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const  loading = useSelector((state) => state.users.loading);
  const  error = useSelector((state) => state.users.error);

  const  token  = useSelector((state) => state.users.token);
  const user = useSelector((state) => state.users.user);


  const onChange = useCallback((path, value) => {
    dispatch(setLogin({ path, value }));
  }, [dispatch]);

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(user))


  }

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token]);

  return (
    <>
      <div className="login">
        <div className="login__wrapper">
          <form className="login__wrapper-content" onSubmit={onLogin}>
            <h2 className="login__title">Login</h2>

            {fields.map((
              {
                path,
                type,
                id,
                label,
                placeholder
              }) => (
              <div key={id} className="input__box">
                <Input
                  path={path}
                  type={type}
                  id={id}
                  label={label}
                  placeholder={placeholder}
                  value={user[path]}
                  onChange={({target: {value}}) => onChange(path, value)}
                  // errors={error}
                  // className={`login__input ${errors.password ? 'error' : ''}`}

                />
              </div>
            ))}

            <Button
              type="submit"
              className="login__button"
               // disabled={loading}
              loading={loading}
            >
             Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;


