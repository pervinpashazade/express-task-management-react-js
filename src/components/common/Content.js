import React from 'react';
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import classNames from 'classnames';
import NavBar from './Navbar';
// import Dashboard from "../pages/Dashboard";
import { routes } from '../../routes';
import NotFound from "../pages/NotFound";
import { useSelector } from 'react-redux';

const Content = (props) => {

  const store = useSelector(store => store);

  React.useEffect(() => {

    // alert('Content')

    // console.log('routes', routes[store.user?.role?.name]);

    // routes[store.user?.role?.name]?.map(item => console.log('route', item))
  }, [])

  return (
    <div className={classNames('content', { 'is-open': props.isOpen })}>
      <NavBar toggle={props.toggle} />
      {/* <Route path="/" exact component={Dashboard} /> */}
      {/* <Route path="/notifications" exact component={Notifications} /> */}
      {
        routes[store.user?.role?.name] &&
        routes[store.user.role.name].map((route, index) =>
          <Route key={index} path={route.path} component={route.component} exact={route.exact} />
        )
      }
    </div>
  );
}

const mapStateToProps = store => store;
export default connect(mapStateToProps)(Content);
