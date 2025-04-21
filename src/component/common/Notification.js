import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faEnvelopeCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as BellIcon} from "../../assets/image/bell.svg";

import _ from "lodash";
// import {FallingLines} from "react-loader-spinner";
import {
  addNotification,
  loadUnreadNotifications,
  markNotificationAsRead,
  setReadStatus,
  setStatus
} from "../store/actions/notification";
import moment from "moment";
import {getUserProfileRequest} from "../store/actions/user";

const serverUrl = 'https://world-of-construction.onrender.com';
const socket = io(serverUrl);


const Notifications = () => {
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.notification.notifications);
  const unreadCount = useSelector((state) => state.notification.unreadCount);
  const statusRead = useSelector(state => state.notification.statusRead)
  const status = useSelector(state => state.notification.status)
  const user = useSelector((state) => state.users.user);

  const [isNotification, setIsNotification] = useState(false);
  let menuRef = useRef();
  const [id, setId] = useState([])


  useEffect(() => {
    dispatch(getUserProfileRequest())
  }, []);


  useEffect(() => {
    if (user.id) {
      socket.emit('register', user.id);

      socket.on('connect', () => {
        console.log('Successfully connected to the server!', socket.id);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socket.on('review_reply', (data) => {
        console.log('New notification:', data);
        dispatch(addNotification(data));
        dispatch(loadUnreadNotifications());
      });

      dispatch(loadUnreadNotifications());

      return () => {
        socket.off('review_reply');
        socket.disconnect();
      };
    }
  }, [user.id, dispatch]);




  useEffect(() => {
    let handler = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setIsNotification(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousemove", handler);
    }
  })
  useEffect(() => {
    if (statusRead === "ok" && status === "ok") {
      setId([])
    }
  }, [statusRead, status]);

  const openNotifications = () => {
    if (!isNotification) {
      setIsNotification(true);
    } else {
      setIsNotification(false);
    }
  }
  const handleMarkAsRead = async (id) => {
    setId(prevState => _.uniq([...prevState, id]))
    dispatch(setStatus(""))
    dispatch(setReadStatus(""))
    await dispatch(markNotificationAsRead(id));
    await dispatch(loadUnreadNotifications());
  };

  console.log(notifications, "A")
  return (

    <div ref={menuRef} className="notification-container">
      <div className="notification-bell" onClick={openNotifications}>
        {/*<FontAwesomeIcon icon={faBell} className={isNotification ? "bell-icon-active" : "bell-icon"}/>*/}
        <BellIcon className={isNotification ? "bell-icon-active" : "bell-icon"}/>
        {isNotification &&<div className="notification-arrow"></div>}
        {unreadCount !== 0 && (
          <div className="notification-count">
            <strong>{unreadCount}</strong>
          </div>
        )}
      </div>

      {isNotification && (
        <div className="notification-dropdown">


          <div className="notifications-header">
            <h2>Notifications</h2>
          </div>

          <div className="notifications-content">
            {notifications.length ? (
              notifications.map((notification) => {
                const isLoading = id.includes(notification.id);
                const notificationClass = isLoading
                  ? "notification-item notification-loading"
                  : `notification-item ${notification.read ? "read" : "unread"}`;

                return (
                  <div className={notificationClass} key={notification.id}>
                    <div
                      className="notification-block"
                      style={{opacity: isLoading ? 0.2 : 1}}
                    >
                      <div className="notification-image-container">
                        {notification.productImage ? (
                          <div className="notification-image">
                            <img src={notification.productImage} alt="Product"/>
                          </div>
                        ) : (
                          <div className="notification-image loading-gradient-n"/>
                        )}
                      </div>

                      {notification.productName && notification.message && notification.createdAt ? (
                        <div className="notification-info">
                      <span className="notification-date">
                        {moment(notification.createdAt).format("DD/MM/YYYY")}
                      </span>
                          <strong className="notification-title">
                            {notification.productName}
                          </strong>
                          <span className="notification-message">
                        {notification.message}
                      </span>
                        </div>
                      ) : (
                        <div
                          className="notification-info loading-gradient-n"
                          style={{height: 60}}
                        />
                      )}
                    </div>

                    <FontAwesomeIcon
                      icon={faEnvelopeCircleCheck}
                      className={isLoading ? "envelope-icon-active" : "envelope-icon"}
                      onClick={() => handleMarkAsRead(notification.id)}
                    />

                    {isLoading && <div className="loading-n"/>}
                  </div>
                );
              })
            ) : status === "ok" ? (
              <div className="notification-empty">
                <h2>🎉 You're all caught up! No new notifications.</h2>
              </div>
            ) : (
              Array.from({length: 4}).map((_, i) => (
                <div className="notification-item loading" key={i}>
                  <div className="notification-block">
                    <div className="notification-image loading-gradient-n"/>
                    <div
                      className="notification-info loading-gradient-n"
                      style={{height: 60}}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>



    // <div ref={menuRef}>
    //   <div className="bell" onClick={openNotifications}>
    //     <FontAwesomeIcon icon={faBell} className={isNotification ? "bell-icon-active" : "bell-icon"}/>
    //     {unreadCount !== 0 ?
    //       <div className="count">
    //         <strong>{unreadCount}</strong>
    //       </div>
    //       : null}
    //   </div>
    //
    //
    //   {isNotification ? <div className="messages">
    //     <div className="sur"></div>
    //
    //     <div className="notifications-header">
    //       <h2>Notifications</h2>
    //     </div>
    //
    //     <div className="notifications-info">
    //
    //       {notifications.length ? notifications.map((notification) => {
    //
    //           return (
    //             <>
    //               <div className={!id.includes(notification.id) ? `messages-block ${notification.read ? 'read' : 'unread'}` : "messages-loading"} >
    //                 <div className="message-block" style={{
    //                   opacity:!id.includes(notification.id) ? 1 : 0.2
    //                 }}>
    //                   <div className="img-block">
    //                     {notification.productImage ?
    //                       <div className="message-img">
    //                         <img src={notification.productImage}/>
    //
    //                       </div>
    //
    //                       :
    //                       <div className="message-img loading-gradient-n">
    //                       </div>}
    //                   </div>
    //
    //
    //                   {notification.productName && notification.message && notification.createdAt ?
    //                     <div className="message-info">
    // <span className="message-data">
    //   {moment(notification.createdAt).format('DD/MM/YYYY')}
    // </span>
    //                       <strong className="message-name">{notification.productName}</strong>
    //                       <span className="message-m">{notification.message}</span>
    //                     </div> :
    //                     <div className="message-info loading-gradient-n" style={{
    //                       width: "100%",
    //                       height: 60,
    //                     }}>
    //
    //                     </div>}
    //                 </div>
    //
    //                 <FontAwesomeIcon icon={faEnvelopeCircleCheck}
    //                                  className={id.includes(notification.id) ? "envelope-active" : "envelope"}
    //                                  onClick={() => handleMarkAsRead(notification.id)}/>
    //                 {id.includes(notification.id) && (
    //                   <div className="loading-n" style={{}}>
    //                     {/*<FallingLines*/}
    //                     {/*  color="#4fa94d"*/}
    //                     {/*  width="100"*/}
    //                     {/*  visible={true}*/}
    //                     {/*  ariaLabel="falling-circles-loading"*/}
    //                     {/*/>*/}
    //                   </div>)}
    //               </div>
    //             </>
    //
    //           )
    //         }) :
    //         status === "ok" ?
    //           <div className="notifications-no">
    //             <h2>🎉 You're all caught up! No new notifications.</h2>
    //           </div>
    //
    //           :
    //
    //           Array.from({length: 4}).map((i) => (
    //             <div className="messages-block ">
    //               <div className="message-block">
    //                 <div className="img-block">
    //                   <div className="message-img loading-gradient-n">
    //                   </div>
    //                 </div>
    //
    //                 <div className="message-info loading-gradient-n" style={{
    //                   width: "100%",
    //                   height: 60,
    //                 }}>
    //
    //                 </div>
    //               </div>
    //             </div>
    //           ))
    //       }
    //     </div>
    //   </div> : null}
    // </div>

  );
}

export default Notifications;
