import React, {forwardRef, memo, useCallback, useState} from "react";
import {ReactComponent as EyeIcon } from "../../assets/image/eye-solid.svg";
import {ReactComponent as EyeCloseIcon} from "../../assets/image/eye-slash-solid.svg";

const Input = memo (forwardRef((
  {
    type,
    value,
    onChange,
    placeholder,
    className,
    disabled,
    onFocus,
    errors,
    label,
    name,
    ...p
  }, ref) => {

  let password = type === "password"

  const [currentType, setCurrentType] = useState(type === "password" ? "password" : type)


  const changeType = useCallback(() => {
    setCurrentType((prev)=> prev === "password" ? "text" : "password")
  },[password]);

  return (

    <>
      {label && <label className="input__box">
        {label}
      </label>}
      <input
        type={currentType}
        ref={ref}
        className={`input ${errors ? "error" : ""} ${className}` }
        // className={className  ? `input ${className}` : "input"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        {...p}
      />

      {password && (
        <button
          className="eye__icon"
          onClick={changeType}
          type="button"
        >
          {currentType === "password" ?  <EyeCloseIcon/> :<EyeIcon />}
        </button>
      )}

      {/*{errors && <div className="error" >{errors}</div>}*/}

    </>

  );
}))


export default Input;



