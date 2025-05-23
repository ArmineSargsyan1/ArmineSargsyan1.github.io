import React, {useState, useEffect} from 'react';
import Api from "../../../Api";
import Input from "../Input";
import Button from "../Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import Utils from "../../helpers/Utils";
import _ from "lodash";
import {Link, useNavigate} from "react-router-dom";

const UpdatePassword = ({email}) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    repeatPassword: '',
    key: ''
  });

  const navigate = useNavigate()

  const [error, setError] = useState({});
  const [status, setStatus] = useState('');
  const [timer, setTimer] = useState(60);
  const [start, setStart] = useState(true);


  useEffect(() => {
    if (start) {
      let timer = setInterval(() => {
        setTimer((time) => {
          if (time === 0) {
            clearInterval(timer);
            setStart(false);
            return 0;
          } else return time - 1;
        });

      }, 100);

    }
  }, [start]);

  const handleChange = ({path, value}) => {
    const cleanedValue = path === 'key' ? value.replace(/\s+/g, '') : value;

    setFormData((prevData) => ({
      ...prevData,
      [path]: cleanedValue,
    }));

    // setError((prev) => ({ ...prev, [path]: '' }));
    setError({})
  };

  function validateData(formData) {
    const errors = {};
    const {newPassword, repeatPassword, key} = formData;

    // Validate newPassword
    if (!newPassword?.trim()) {
      errors.newPassword = 'Password should not be empty.';
    } else if (!Utils.isPassword(newPassword)) {
      errors.newPassword = 'Your password must be at least 8 characters long.';
    }

    // Validate repeatPassword
    if (!repeatPassword?.trim()) {
      errors.repeatPassword = 'Please confirm your password.';
    } else if (repeatPassword !== newPassword) {
      errors.repeatPassword = 'Passwords do not match.';
    }

    // Validate key
    if (!key?.trim()) {
      errors.key = 'Reset key should not be empty.';
    } else if (key.length < 6) {
      errors.key = 'Reset key must be at least 6 characters long.'
    }

    return errors;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({})
    const {newPassword, key} = formData;


    const validationErrors = validateData(formData);

    if (!_.isEmpty(validationErrors)) {
      setError(validationErrors);
    } else {
      try {
        setStatus('pending');
        await Api.updatePassword({newPassword, key});
        setStatus('success');
      } catch (err) {
        if (err.response.data.message) {
          console.log(8888)
          setStatus('error');
          setError({
            error: 'The reset code may be incorrect or ' +
              'expired please resend the code and try again.'
          });
        }
        ;
      }
    }
  };


  const resendCode = async (email) => {
    try {
      setTimer(60);
      setError({})
      await Api.resendCode({email});
    } catch (err) {
      console.error('Failed to resend code:', err);
    }
  };


  return (
    <>
      {status === 'success' ? (
        <> <p className="success-message">Your password updated succesfully login and.</p>
          <button onClick={() => navigate("/")}>fbfgb</button>
        </>

      ) : (
        <form onSubmit={handleSubmit} className="login__wrapper-content">
          <div className="success-message">
            <h5 className="info-message">
              We've sent a password reset link to <strong>{email}</strong>.<br/>
              Please check your inbox to continue.
            </h5>
          </div>
          <div className="reset-code-section">
            <div className="input__box key-input">
              <Input
                name="key"
                value={formData.key}
                onChange={({target: {value}}) => handleChange({value, path: "key"})}
                label="Reset Key"
                className={error ? 'input-error' : 'input'}
                classNameLabel="label"
              />
              {error.key && <div className="error-message">{error.key}</div>}

            </div>

            <div className="resend-timer-wrapper">
              <div
                className="resend-timer-wrapper-loading"
                style={{
                  width: `${((61 - timer) / 60) * 100}%`,
                }}
              ></div>
              {timer === 0 ? (
                <div
                  className="resend-code-button"
                  onClick={() => {
                    setTimer(60);
                    setStart(true);
                    resendCode(email);
                  }}
                >
                  <span>Send code</span>
                </div>
              ) : (
                <div className="timer-block">
                  <FontAwesomeIcon icon={faClock} className="clock"/>
                  <span className="span-timer">{timer}</span>
                </div>
              )}
            </div>
          </div>

          <div className="input__box">
            <Input
              name="newPassword"
              value={formData.newPassword}
              onChange={({target: {value}}) => handleChange({value, path: "newPassword"})}
              label="Create new Password"
              type="password"
              className={error ? 'input-error' : 'input'}
              placeholder="Create new Password"
            />
            {error.newPassword && <div className="error-message">{error.newPassword}</div>}

          </div>

          <div className="input__box">
            <Input
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={({target: {value}}) => handleChange({value, path: "repeatPassword"})}
              label="Confirm the new password"
              type="password"
              className={error ? 'input-error' : 'input'}
              placeholder="Confirm the new password"
            />
            {error.repeatPassword && <div className="error-message">{error.repeatPassword}</div>}

          </div>

          {status === "error" && <div className="error-message forgot"><span>{error.error}</span></div>}

          <div className="form-button-block" style={{marginTop: 45}}>
            <Button
              type="submit"
              className={
                status === 'pending'
                  ? 'pending-button'
                  : formData.newPassword && formData.repeatPassword && formData.key
                    ? 'active-button'
                    : 'disabled'
              }
              loading={status === "pending"}
              // disabled={!_.isEmpty(error)}
            >
              Change Password
            </Button>

          </div>
        </form>
      )}
      {/*{status === "error" && <p className="error-message">{error}</p>}*/}
    </>
  );
};

export default UpdatePassword;
