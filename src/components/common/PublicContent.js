import React from 'react';
import { connect } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import classNames from 'classnames';
import NavBar from './Navbar';
import { routes } from '../../routes';
import NotFound from "../pages/NotFound";
import Login from '../pages/Login';
import { useSelector } from 'react-redux';

const PublicContent = (props) => {

    const store = useSelector(store => store);
    const history = useHistory();

    React.useEffect(() => {

        // alert('Public content')

        if (!store.isAuth) history.push("/login");

        if (store.isAuth && store.user?.role?.name === "Admin" && !store.user?.company) {
            history.push('/signup/create-company');
        };
    }, [store])

    return (
        <div>
            {
                routes['PUBLIC'].map((route, index) =>
                    <Route key={index} path={route.path} component={route.component} exact={route.exact} />
                )
            }
        </div>
    );
}

const mapStateToProps = store => store;
export default connect(mapStateToProps)(PublicContent);
