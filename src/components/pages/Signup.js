import React, { useState } from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { login } from '../../store/action';
import { config, staticDataUrls } from '../../config';
import { Button, Form, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import toast from 'toasted-notes';
import Select from 'react-select';
import logo from '../../assets/img/logo.png';
import { countries, message, renderErrorMessage, roles } from '../../store/staticData';
import { Route, Link, useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input';
import { getArrayObj } from '../../helpers/getArrayObj';

const SignUp = () => {

    const dispatch = useDispatch();

    const history = useHistory();

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [userList, setUserList] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState(null);

    React.useEffect(() => {
        axios.get(config.apiURL + staticDataUrls.user).then(res => {
            if (res.statusText === "OK") {
                setUserList(res.data)
            };
        });
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value.trim();
        };

        if (!data.name) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Name")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };
        if (!data.surname) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Surname")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };
        if (!data.email) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Email")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
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
        if (!data.confirm_password) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Confirm password")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };

        if (data.confirm_password !== data.password) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.invalid_confirm_password)}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };

        // redux state is Loading loader
        // this.setState({ loading: true });

        data['role_id'] = roles.find(x => x.name === "Admin")?.id;
        data['created_at'] = new Date().toISOString().split("T")[0];
        data['company_id'] = 0;
        data['status'] = true;

        if (!data.role_id) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Role")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };

        data.confirm_password && delete data.confirm_password;

        // console.log('data', data);

        // check is username || email exist on database
        axios.get(config.apiURL + staticDataUrls.user).then(userListRes => {
            if (userListRes.statusText === "OK") {

                let findUsername = userListRes.data.find(item => item.username === data.username);
                let findEmail = userListRes.data.find(item => item.email === data.email);

                if (findUsername) {
                    toast.notify(() => (
                        <div className="alert alert-danger m-3">
                            <h5>{message.error}</h5>
                            <p className="mb-0">
                                {renderErrorMessage(message.exist, "Username")}
                            </p>
                        </div>), { position: "top-right", duration: message.duration }
                    );
                    return;
                };
                if (findEmail) {
                    toast.notify(() => (
                        <div className="alert alert-danger m-3">
                            <h5>{message.error}</h5>
                            <p className="mb-0">
                                {renderErrorMessage(message.exist, "Email")}
                            </p>
                        </div>), { position: "top-right", duration: message.duration }
                    );
                    return;
                };

                axios.post(config.apiURL + staticDataUrls.user, data).then(res => {
                    if (res.statusText === "Created") {

                        let currentUserRole = getArrayObj(roles, res.data.role_id);
                        if (currentUserRole) {
                            dispatch(login(res.data, currentUserRole));
                            history.push('/');
                        }
                    }
                });
            };
        });
    };

    return (
        <div className="auth-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <div className="auth-form-wrapper p-4 p-md-5">
                            <div className="form-logo signup">
                                <img src={logo} alt="logo" />
                            </div>
                            <h4 className="text-center text-warning">Sign up</h4>
                            <p className="form_top_title">
                                Are you already a user?
                                <Link
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </p>
                            <Form className='row' onSubmit={e => handleSubmit(e)}>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-group">
                                        <Label for="name" className="font-weight-bold">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Enter name"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-group">
                                        <Label for="surname" className="font-weight-bold">Surname</Label>
                                        <Input
                                            id="surname"
                                            name="surname"
                                            placeholder="Enter surname"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-group">
                                        <Label for="email" className="font-weight-bold">Email</Label>
                                        <Input
                                            id="email"
                                            type='email'
                                            name="email"
                                            placeholder="Enter email"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-group">
                                        <Label for="username" className="font-weight-bold">Username</Label>
                                        <Input
                                            id="username"
                                            name="username"
                                            placeholder="Enter username"
                                        />
                                    </div>
                                </div>
                                <hr className='w-100' />
                                <div className="col-md-12 col-lg-6">
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
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-group position-relative">
                                        <Label for="confirm_password" className="font-weight-bold">Confirm password</Label>
                                        <Input
                                            id="confirm_password"
                                            name="confirm_password"
                                            type={isShowConfirmPassword ? "text" : "password"}
                                            placeholder="Enter confirm password"
                                        // onChange={(e) => {
                                        //   this.setState({ newPasswordValue: e.target.value })
                                        // }}
                                        />
                                        <FontAwesomeIcon
                                            icon={isShowConfirmPassword ? faEye : faEyeSlash}
                                            className="eye-icon"
                                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Button
                                            color="warning"
                                            className="font-weight-bold mt-4"
                                            block
                                        >
                                            Sign Up
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;