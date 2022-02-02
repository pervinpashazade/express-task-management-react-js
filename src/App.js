import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import SideBar from './components/common/SideBar';
import Content from './components/common/Content';
import Login from './components/pages/Login';
import './assets/bootstrap/bootstrap.scss';
import './assets/scss/style.scss';
import { HashRouter, Switch, useHistory } from 'react-router-dom';
import PublicContent from './components/common/PublicContent';
import { useSelector } from 'react-redux';
import { message, renderErrorMessage, roles } from './store/staticData';
import toaster from 'toasted-notes';

const App = () => {

  const store = useSelector(store => store);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(window.innerWidth > 728);
  const [isAuth, setIsAuth] = useState(store.isAuth);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsAuth(store.isAuth);
  }, [store.isAuth]);

  // const renderContent = () => {
  //   if (isAuth && store.user) {
  //     if (!store.user.role) {
  //       toaster.notify(() => (
  //         <div className="alert alert-danger m-3">
  //           <h5>{message.error}</h5>
  //           <p className="mb-0">
  //             {renderErrorMessage(message.invalid_role_id, "Role")}
  //           </p>
  //         </div>), { position: "top-right", duration: message.duration }
  //       );
  //       return <PublicContent />
  //     };

  //     if (store.user.role.name === "Admin") {
  //       if (store.user.company) {
  //         return <Content />
  //       } else {
  //         return <PublicContent />
  //       }
  //     };

  //     if (!store.user.company) {
  //       toaster.notify(() => (
  //         <div className="alert alert-danger m-3">
  //           <h5>{message.error}</h5>
  //           <p className="mb-0">
  //             {renderErrorMessage(message.not_found_user_company)}
  //           </p>
  //         </div>), { position: "top-right", duration: message.duration }
  //       );
  //       return <PublicContent />
  //     } else {
  //       return <Content />
  //     };

  //   } else {
  //     return <PublicContent />
  //   }
  // }

  return (
    <HashRouter>
      {
        isAuth && store.user?.company ?
          <div className="wrapper">
            <SideBar toggle={toggleSideBar} isOpen={isOpen} />
            <Content
              toggle={toggleSideBar}
              isOpen={isOpen}
            />
          </div> :
          <PublicContent />
      }
      {/* {
        renderContent()
      } */}
    </HashRouter>
  );
}

const mapStateToProps = store => store;
export default connect(mapStateToProps)(App);
