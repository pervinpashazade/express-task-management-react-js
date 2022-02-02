import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { Button, Form, Input, Label } from 'reactstrap';
import { message, renderErrorMessage, roles, statusList } from '../../../store/staticData';
import toast from 'toasted-notes';
import axios from 'axios';
import { config, staticDataUrls } from '../../../config';

function EmployeeCreate(props) {

    const store = useSelector(store => store);

    const history = useHistory();

    const [userStatus, setUserStatus] = useState(null);

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
        if (!data.status) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Status")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };

        data['role_id'] = roles.find(x => x.name === "Operator")?.id;
        data['created_at'] = new Date().toISOString().split("T")[0];
        data['company_id'] = store.user.company?.id;
        data['status'] = Number(data.status) ? true : false;
        data['assignedTaskIdList'] = [];
        data['createdTaskIdList'] = [];

        console.log('data', data);

        axios.post(config.apiURL + staticDataUrls.user, data).then(res => {
            if (res.statusText === "Created") {
                toast.notify(() => (
                    <div className="alert alert-success m-3">
                        <h5>{message.success}</h5>
                        <p className="mb-0">
                            {renderErrorMessage(message.create_success, "Employee")}
                        </p>
                    </div>), { position: "top-right", duration: message.duration }
                );
                history.push('/employee/list');
                return;
            };
        });
    }

    return (
        <div className="bg-white rounded p-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="page-header">
                        <h1 className="font-weight-bold">Add new employee</h1>
                    </div>
                </div>
            </div>
            <hr />
            <Form className="row" onSubmit={e => handleSubmit(e)}>
                <div className="col-md-6 col-lg-4 mb-4">
                    <Label for='name' className="font-weight-bold">Name</Label>
                    <Input
                        id='name'
                        name="name"
                        placeholder="Enter name"
                    />
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                    <Label for='surname' className="font-weight-bold">Surname</Label>
                    <Input
                        id='surname'
                        name="surname"
                        placeholder="Enter surname"
                    />
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                    <Label for='email' className="font-weight-bold">Email</Label>
                    <Input
                        id='email'
                        name="email"
                        type='email'
                        placeholder="Enter email"
                    />
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                    <Label for='username' className="font-weight-bold">Username</Label>
                    <Input
                        id='username'
                        name="username"
                        placeholder="Enter username"
                    />
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                    <Label for='password' className="font-weight-bold">Password</Label>
                    <Input
                        id='password'
                        name="password"
                        type='password'
                        placeholder="Enter password"
                    />
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                    <Label id='user_status' className="font-weight-bold">Status</Label>
                    <Select
                        placeholder="Select"
                        name="status"
                        value={userStatus}
                        options={statusList}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.name}
                        onChange={e => setUserStatus(e)}
                    />
                </div>

                {/* submit */}
                <div className="offset-lg-8 col-lg-4 mb-4 d-flex align-items-center mt-4">
                    <Button
                        type="submit"
                        color="success"
                        className="font-weight-bold w-50 mr-1"
                    >
                        Confirm
                    </Button>
                    <Button
                        color="danger"
                        className="font-weight-bold w-50"
                        onClick={() => history.push('/employee/list')}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default EmployeeCreate;
