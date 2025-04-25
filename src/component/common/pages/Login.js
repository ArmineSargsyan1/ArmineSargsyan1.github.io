import React, {useCallback, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Input from "../Input";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, setFieldValue,} from "../../store/actions/user";
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

  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const message = useSelector((state) => state.users.message);
  const token = useSelector((state) => state.users.token);
  const user = useSelector((state) => state.users.user);


  const onChange = useCallback((path, value) => {
    dispatch(setFieldValue({path, value}));

  }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(user))

  }

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token]);

    if (token) {
      window.location.reload(true)
    }


  return (
    <>

      <div className="login">
        <div className="login__wrapper">
          <form className="login__wrapper-content" onSubmit={onLogin}>
            <h2 className="login__title">Login</h2>

            {fields.map(({ path, type, id, label, placeholder }) =>
            {
              return (
                <div key={id} className="input__box">
                  <Input
                    path={path}
                    type={type}
                    id={id}
                    label={label}
                    placeholder={placeholder}
                    value={user[path]}
                    onChange={({ target: { value } }) => onChange(path, value)}
                    errors={error?.[path]}
                    className={`login__input ${error?.[path] ? 'error' : ''}`}
                  />
                  {error?.[path] && <div className="error-message">{error?.[path]}</div>}
                </div>
              );
            })
            }

            {message && <div className="error-message">{message}</div>}

            <Button
              type="submit"
              className="login__button"
              disabled={loading}
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

