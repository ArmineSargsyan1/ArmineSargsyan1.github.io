// import React, {useEffect, useState} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import _ from "lodash";
// import Input from "../Input";
// import Button from "../Button";
// import {forgotPassword} from "../../store/actions/user";
//
//
// const ForgotPassword = () => {
//   const dispatch = useDispatch();
//   const status = useSelector(state => state.login.statusForgot)
//   const statusEmail = useSelector(state=>state.login.emailError)
//
//   const [inputName, setInputName] = useState([]);
//   const [isConfirm, setIsConfirm] = useState(false);
//   const [email, setEmail] = useState("")
//   const [userInfo, setUserInfo] = useState({
//     value: "",
//     title: ""
//   })
//   const {value, title} = userInfo
//
//   useEffect(() => {
//     if (inputName[0] === "email" && email.length) {
//       test()
//     }
//     if (email) {
//       setIsConfirm(true)
//     } else {
//       setIsConfirm(false)
//     }
//   }, [email, inputName.length]);
//
//   const onChange = (event) => {
//     let v = event.target.value
//     let n = event.target.name
//     setEmail(v);
//     setUserInfo({value: v, title: n})
//     // if(status === "error"){
//     //   dispatch(setStatusForgot(""))
//     // }
//   }
//
//   const test = () => {
//     const emailValidation = /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]+$/;
//     let newInputName = [...inputName];
//
//     const isValid = emailValidation.test(email);
//     if (!isValid || !email.length) {
//       if (!newInputName.includes("email")) {
//         newInputName.push("email");
//       }
//     } else {
//       newInputName = newInputName.filter(item => item !== "email");
//     }
//
//     setInputName(_.uniq(newInputName));
//     return newInputName.length > 0;
//   };
//
//
//   const login = (e) => {
//     e.preventDefault();
//     const hasErrors = test();
//     if (hasErrors) {
//       return;
//     }
//     if (email) {
//       dispatch(forgotPassword({email}))
//     }
//   }
//
//   return (
//     status !== "ok" ? (
//       <div className="container-form">
//         <div className="title-login">
//           <h2>Reset password</h2>
//         </div>
//
//         <form onSubmit={login}>
//           <div className="login">
//             <div>
//               <Input
//                 name="email"
//                 className={inputName.includes("email") ? "input-error" : "input"}
//                 onBlur={test}
//                 onChange={onChange}
//                 value={email}
//                 id="email"
//                 label="E-mail"
//                 classNameLabel="label"
//                 status={status}
//               />
//             </div>
//
//             <div className="validation-info-login">
//               {status === "error" ? (
//                 <span>{statusEmail}</span>
//               ) : inputName.includes("email") ? (
//                 <span>{!email.length ? "Field Required" : "Please enter correct e-mail."}</span>
//               ) : null}
//             </div>
//           </div>
//
//           <div className="form-button-block" style={{ marginTop: 20 }}>
//             <Button
//               status={status}
//               text="RECEIVE CODE"
//               type={isConfirm ? "submit" : "button"}
//               className={
//                 isConfirm && status !== "pending"
//                   ? "active-button"
//                   : isConfirm && status === "pending"
//                     ? "pending-button"
//                     : "disabled"
//               }
//             >
//               Text
//             </Button>
//           </div>
//         </form>
//       </div>
//     ) : ("fdvd"
//       // <ForgotPasswordChange email={email} />
//     )
//   );
//
// };
//
// export default ForgotPassword;
//




import React, { useState } from 'react';

import Api from "../../../Api";
import Input from "../Input";
import Button from "../Button";
import Utils from "../../helpers/Utils";
import _ from "lodash";
import {toast} from "react-toastify";
import UpdatePassword from "./UpdatePassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };




  const validateEmail = (email) => {
    const errors = {};

    if (!email?.trim()) {
      errors.email = 'Email should not be empty.';
    } else if (!Utils.isEmail(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateEmail(email);

    if (!_.isEmpty(validationErrors)) {
      setError(validationErrors.email);
      return;
    }

    try {
      setStatus('pending');
      await Api.forgotPassword({ email });
      setStatus('success');
    } catch (error) {

      setStatus('error');
      console.log(error.response.data.message)
      setError(error.response.data.message);
      toast.error(error.response.data.message)
    }
  };


  return (
    <div className="container">
      <div className="login">
        <div className="login__wrapper">
      {status === 'success' ? (
        <UpdatePassword email={email}/>
        // <p className="success-message">A reset link has been sent to your email.</p>
      ) : (
        <form onSubmit={handleSubmit} className="login__wrapper-content">
          <div className="input__box">
            <Input
              type={"text"}
              name="email"
              placeholder={"Enter your email..."}
              value={email}
              onChange={handleChange}
              label="E-mail"
              errors={error?.email}
              className={`login__input ${error ? 'error' : ''}`}

            />
            {error && <div className="error-message"><span>{error}</span></div>}
          </div>

          <div className="form-button-block" style={{marginTop: 10}}>

            <Button
              type="submit"
              // className={
              //   status === 'pending'
              //     ? 'pending-button'
              //     : email && !error
              //       ? 'active-button'
              //       : 'disabled'
              // }
              loading={status === "pending"}
              disabled={!(email && _.isEmpty(error))}
            >
              Receive Code
            </Button>
          </div>
        </form>
      )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
