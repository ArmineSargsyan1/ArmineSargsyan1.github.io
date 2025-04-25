import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {getUserProfileRequest, logoutUser} from '../store/actions/user';
import {useNavigate} from "react-router-dom";
import Button from "./Button";
import Loader from "./Loader";
//
// const AdminUserProfile = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.users.user);
//
//   useEffect(() => {
//     dispatch(getUserProfileRequest());
//   }, []);
//
//   if (!user || !user.firstName) {
//     return <p>Loading user data...</p>;
//   }
//
//   const {
//     email,
//     role,
//     status,
//     address,
//     gender,
//     activationKey,
//     dateOfBirth,
//     createdAt,
//     updatedAt,
//     avatar,
//     firstName,
//     lastName,
//   } = user;
//
//   const userDetails = [
//     { label: "📧 Email", value: email },
//     { label: "🏷 Role", value: role },
//     { label: "🔐 Status", value: status },
//     { label: "📍 Address", value: address },
//     { label: "🧍 Gender", value: gender },
//     { label: "🔑 Activation Key", value: activationKey },
//     { label: "🎂 Date of Birth", value: moment(dateOfBirth).format('DD/MM/YYYY') },
//     { label: "🕒 Created At", value: moment(createdAt).format('DD/MM/YYYY HH:mm') },
//     { label: "📝 Updated At", value: moment(updatedAt).format('DD/MM/YYYY HH:mm') },
//   ];
//
//   return (
//     <div className="admin-user-profile">
//       <h2>
//         {firstName} {lastName}
//       </h2>
//
//       <div className="user-details">
//         {userDetails.map((item, index) => (
//           <p key={index}>
//             <strong>{item.label}:</strong> {item.value}
//           </p>
//         ))}
//       </div>
//
//       {!!avatar?.length && (
//         <div className="user-avatar">
//           <strong>🖼 Avatar:</strong>
//           <img
//             src={avatar[0].path}
//             alt={`${firstName} ${lastName}`}
//             width="120"
//             style={{ marginTop: 10, borderRadius: 8 }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default AdminUserProfile;




const AdminUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(getUserProfileRequest());
  }, [dispatch]);



  const {
    email,
    role,
    status,
    address,
    gender,
    activationKey,
    dateOfBirth,
    createdAt,
    updatedAt,
    avatar,
    firstName,
    lastName,
  } = user;

  const userDetails = [
    { label: "📧 Email", value: email },
    { label: "🏷 Role", value: role },
    { label: "🔐 Status", value: status },
    { label: "📍 Address", value: address },
    { label: "🧍 Gender", value: gender },
    { label: "🔑 Activation Key", value: activationKey },
    { label: "🎂 Date of Birth", value: moment(dateOfBirth).format('DD/MM/YYYY') },
    { label: "🕒 Created At", value: moment(createdAt).format('DD/MM/YYYY HH:mm') },
    { label: "📝 Updated At", value: moment(updatedAt).format('DD/MM/YYYY HH:mm') },
  ];

  const onLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    loading ? (
      <Loader height="600" width="100%" count={1} className="admin-user-profile" iCount={1}/>
    ) : (
      <div className="admin-user-profile">
        <h2>
          {firstName} {lastName}
        </h2>

        <div className="user-details">
          {userDetails.map((item, index) => (
            <p key={index}>
              <strong>{item.label}:</strong> {item.value}
            </p>
          ))}
        </div>

        {!!avatar?.length && (
          <div className="user-avatar">
            <strong>🖼 Avatar:</strong>
            <img
              src={avatar[0].path}
              alt={`${firstName} ${lastName}`}
              width="120"
              style={{ marginTop: 10, borderRadius: 8 }}
            />
          </div>
        )}

        {/*<Button className="logout-button" onClick={onLogout}>*/}
        {/*  🔓 Sign Out*/}
        {/*</Button>*/}
      </div>
    )
  );

};

export default AdminUserProfile
