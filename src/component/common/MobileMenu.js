import React from 'react';
import {createPortal} from "react-dom";

import {ReactComponent as XIcon} from "../../assets/image/close-x.svg";
import {ReactComponent as BarsIcon} from "../../assets/image/bars-solid.svg";



const MobileMenu = ({clickedBar, onChangeMenu, setClickedBar}) => createPortal(

  <div>
    <div className="mobile__container" onClick={()=>setClickedBar(false)}></div>

    <div className="mobile">
      <BarsIcon
        className={`nav__icon ${clickedBar ? "" : "active"}`}
        onClick={onChangeMenu}
      />
      <XIcon
        className={`nav__icon ${clickedBar ? "active" : ""}`}
        onClick={onChangeMenu}
      />
    </div>
  </div>,

  document.getElementById("root")
)


export default MobileMenu;
