import React, { useState } from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { changeValue, login } from '../../store/action';
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
import { useSelector } from 'react-redux';

const CompanyCreate = () => {

    const store = useSelector(store => store);
    const dispatch = useDispatch();

    const history = useHistory();

    const [selectedRole, setSelectedRole] = useState(roles.find(x => x.name === "Admin"));
    const [phoneNumber, setPhoneNumber] = useState(null);

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
                        {renderErrorMessage(message.required, "Company name")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };

        if (!phoneNumber) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Company phone")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };

        if (!data.address) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Company address")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };

        // redux state is Loading loader
        // this.setState({ loading: true });

        data['admin_id'] = store.user.id;
        data['phone'] = phoneNumber;
        data['employeeIdList'] = [];

        console.log('data', data);

        axios.get(config.apiURL + staticDataUrls.company).then(companyListRes => {
            if (companyListRes.statusText === "OK") {
                let findCompanyName = companyListRes.data.find(x => x.name === data.name);
                let findCompanyPhone = companyListRes.data.find(x => x.phone === phoneNumber);

                if (findCompanyName) {
                    toast.notify(() => (
                        <div className="alert alert-danger m-3">
                            <h5>{message.error}</h5>
                            <p className="mb-0">
                                {renderErrorMessage(message.exist, "Company name")}
                            </p>
                        </div>), { position: "top-right", duration: message.duration }
                    );
                    return;
                };
                if (findCompanyPhone) {
                    toast.notify(() => (
                        <div className="alert alert-danger m-3">
                            <h5>{message.error}</h5>
                            <p className="mb-0">
                                {renderErrorMessage(message.exist, "Company phone")}
                            </p>
                        </div>), { position: "top-right", duration: message.duration }
                    );
                    return;
                };

                axios.post(config.apiURL + staticDataUrls.company, data).then(res => {
                    if (res.statusText === "Created") {

                        axios.put(config.apiURL + `${staticDataUrls.user}/${store.user.id}`, {
                            company_id: res.data.id
                        }).then(res => {
                            if (res.statusText === "OK") {
                                dispatch(changeValue('user', 'company', res.data));
                                history.push('/');
                            }
                        });
                    };
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
                            <h4 className="text-center text-warning">
                                {
                                    `Welcome${store.user?.name ? ', ' + store.user.name : ''} 
                                    ${store.user?.surname ? ' ' + store.user.surname : ''}!`
                                }
                            </h4>
                            <p className="form_top_title">
                                Enter company details or move to
                                <Link
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </p>
                            <Form className='row' onSubmit={e => handleSubmit(e)}>
                                <hr className='w-100' />
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-group">
                                        <Label for="name" className="font-weight-bold">Company name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Your company name"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-group">
                                        <Label className="font-weight-bold">Position</Label>
                                        <Select
                                            placeholder="Select your position"
                                            isDisabled
                                            value={selectedRole}
                                            options={roles}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={e => setSelectedRole(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-group">
                                        <Label for="company_phone" className="font-weight-bold">Company phone</Label>
                                        <PhoneInput
                                            labels={countries}
                                            defaultCountry="AZ"
                                            className="reactPhoneInput"
                                            value={phoneNumber}
                                            placeholder="Enter phone number"
                                            onChange={phoneNumber => setPhoneNumber(phoneNumber)}
                                            error={phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : 'Invalid phone number') : 'Phone number required'}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-group">
                                        <Label for="address" className="font-weight-bold">Address</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            placeholder="Enter company address"
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
                                            Confirm
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

export default CompanyCreate;