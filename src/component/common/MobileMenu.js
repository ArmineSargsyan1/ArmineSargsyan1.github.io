// import React from 'react';
// import {createPortal} from "react-dom";
//
// import {ReactComponent as XIcon} from "../../assets/image/close-x.svg";
// import {ReactComponent as BarsIcon} from "../../assets/image/bars-solid.svg";
// import {setClickedBar} from "../store/actions/user";
// import {useSelector} from "react-redux";
//
//
//
// const MobileMenu = ({clickedBar, onChangeMenu}) =>
// const clickedBar = useSelector((state) => state.users.clickedBar);
//
// createPortal(
//
//
//
//   <div>
//     <div className="mobile__container" onClick={()=>setClickedBar(false)}></div>
//
//     <div className="mobile">
//       <BarsIcon
//         className={`nav__icon ${!clickedBar ?"active" : ""}`}
//         onClick={onChangeMenu}
//       />
//       <XIcon
//         className={`nav__icon ${!clickedBar ? "" : "active"}`}
//         onClick={onChangeMenu}
//       />
//     </div>
//   </div>,
//
//   document.getElementById("root")
// )
//
//
// export default MobileMenu;
//
//
// // import React from 'react';
// // import {createPortal} from "react-dom";
// //
// // import {ReactComponent as XIcon} from "../../assets/image/close-x.svg";
// // import {ReactComponent as BarsIcon} from "../../assets/image/bars-solid.svg";
// //
// //
// //
// // const MobileMenu = ({clickedBar, onChangeMenu, setClickedBar}) => createPortal(
// //
// //   <div>
// //     <div className="mobile__container" onClick={()=>setClickedBar(false)}></div>
// //
// //     <div className="mobile">
// //       <BarsIcon
// //         className={`nav__icon ${clickedBar ? "" : "active"}`}
// //         onClick={onChangeMenu}
// //       />
// //       <XIcon
// //         className={`nav__icon ${clickedBar ? "active" : ""}`}
// //         onClick={onChangeMenu}
// //       />
// //     </div>
// //   </div>,
// //
// //   document.getElementById("root")
// // )
// //
// //
// // export default MobileMenu;



import React from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as XIcon } from '../../assets/image/close-x.svg';
import { ReactComponent as BarsIcon } from '../../assets/image/bars-solid.svg';
import { setClickedBar } from '../store/actions/user';

const MobileMenu = ({ onChangeMenu }) => {
  const dispatch = useDispatch();
  const clickedBar = useSelector((state) => state.users.clickedBar);

  return createPortal(
    <div>
      <div
        className="mobile__container"
        onClick={() => dispatch(setClickedBar(false))}
      ></div>

      <div className="mobile">
        <BarsIcon
          className={`nav__icon ${clickedBar ? 'active' : ''}`}
          onClick={onChangeMenu}
        />
        <XIcon
          className={`nav__icon ${!clickedBar ? 'active' : ''}`}
          onClick={onChangeMenu}
        />
      </div>
    </div>,
    document.getElementById('root')
  );
};

export default MobileMenu;
