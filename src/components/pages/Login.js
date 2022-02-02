import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { changeValue, login } from '../../store/action';
import { config, staticDataUrls, storageKey } from '../../config';
import { Button, Form, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import toast from 'toasted-notes';
import logo from '../../assets/img/logo.png';
import { message, renderErrorMessage, roles } from '../../store/staticData';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getArrayObj } from '../../helpers/getArrayObj';

const Login = () => {

  const store = useSelector(store => store);
  const dispatch = useDispatch();

  const history = useHistory();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [companyList, setCompanyList] = useState([]);

  React.useEffect(() => {
    axios.get(config.apiURL + staticDataUrls.company).then(res => {
      if (res.statusText === "OK") {
        setCompanyList(res.data)
        console.log('company res', res.data);
      };
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value.trim();
    };

    if (!data.username) {
      toast.notify(() => (
        <div className="alert alert-danger m-3">
          <h5>{message.error}</h5>
          <p className="mb-0">
            {renderErrorMessage(message.required, "Username")}
          </p>
        </div>), { position: "top-right", duration: message.duration }
      );
      return;
    };
    if (!data.password) {
      toast.notify(() => (
        <div className="alert alert-danger m-3">
          <h5>{message.error}</h5>
          <p className="mb-0">
            {renderErrorMessage(message.required, "Password")}
          </p>
        </div>), { position: "top-right", duration: message.duration }
      );
      return;
    };

    // redux state is Loading loader
    // this.setState({ loading: true });

    // console.log('form data', data);


    axios.get(config.apiURL + staticDataUrls.user).then(res => {
      if (res.statusText === "OK") {

        let user = res.data.find(item => item.username === data.username && item.password === data.password);

        if (!user) {
          toast.notify(() => (
            <div className="alert alert-danger m-3">
              <h5>{message.error}</h5>
              <p className="mb-0">
                {renderErrorMessage(message.user_not_found)}
              </p>
            </div>), { position: "top-right", duration: message.duration }
          );
          return;
        };
        if (!user.status) {
          toast.notify(() => (
            <div className="alert alert-danger m-3">
              <h5>{message.error}</h5>
              <p className="mb-0">
                {renderErrorMessage(message.access_denied_login)}
              </p>
            </div>), { position: "top-right", duration: message.duration }
          );
          return;
        };
        if (user.role_id > 3) {
          toast.notify(() => (
            <div className="alert alert-danger m-3">
              <h5>{message.error}</h5>
              <p className="mb-0">
                {renderErrorMessage(message.invalid_role_id)}
              </p>
            </div>), { position: "top-right", duration: message.duration }
          );
          return;
        };

        console.log('user data', user);

        const userRole = getArrayObj(roles, user.role_id <= 3 ? user.role_id : null);
        const userCompany = getArrayObj(companyList, user.company_id.toString());

        console.log('userCompany', userCompany);

        dispatch(login(user, userRole, userCompany));

        history.push('/');
      };
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="auth-form-wrapper p-4 p-md-5">
              <div className="form-logo">
                <img src={logo} alt="logo" />
              </div>
              <h4 className="text-center text-warning">Welcome</h4>
              <p className="form_top_title">
                Please, enter your username &#38; password or
                <Link
                  to="/signup"
                >
                  Sign up
                </Link>
              </p>
              <Form onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                  <Label for="username" className="font-weight-bold">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter username"
                  />
                </div>
                <div className="form-group position-relative">
                  <Label for="password" className="font-weight-bold">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Enter password"
                  // onChange={(e) => {
                  //   this.setState({ newPasswordValue: e.target.value })
                  // }}
                  />
                  <FontAwesomeIcon
                    icon={isShowPassword ? faEye : faEyeSlash}
                    className="eye-icon"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                </div>
                <div className="form-group">
                  <Button
                    color="warning"
                    className="font-weight-bold mt-4"
                    block
                  >
                    Sign In
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

