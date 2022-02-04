import React, { useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { Button, Form, Input, Label } from 'reactstrap';
import { message, renderErrorMessage, roles, statusList, taskPriorityList, taskStatusList } from '../../../store/staticData';
import toast from 'toasted-notes';
import axios from 'axios';
import { config, staticDataUrls } from '../../../config';

function EmployeeCreate(props) {

    const store = useSelector(store => store);

    const history = useHistory();

    const [taskStatus, setTaskStatus] = useState(taskStatusList.find(x => x.id === 1));
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [deadline, setDeadline] = useState(null);
    const [userList, setUserList] = useState([]);
    const [selectedUsersForAssign, setSelectedUsersForAssign] = useState([]);

    React.useEffect(() => {
        getEmployeeListByCompany(store.user.company?.id);
    }, [])

    const getEmployeeListByCompany = companyId => {
        if (!companyId) return [];

        axios.get(config.apiURL + staticDataUrls.user).then(res => {
            axios.get(config.apiURL + staticDataUrls.user).then(res => {
                if (res.statusText === "OK") {
                    setUserList(res.data.filter(x => x.id !== store.user.id && x.company_id === companyId))
                };
            });
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value.trim();
        };

        if (!data.title) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Task title")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };
        if (!data.description) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Task description")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };
        if (!data.priority_id) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Task priority")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };
        if (!data.status_id) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Task status")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        };
        if (!selectedUsersForAssign || !selectedUsersForAssign.length) {
            toast.notify(() => (
                <div className="alert alert-danger m-3">
                    <h5>{message.error}</h5>
                    <p className="mb-0">
                        {renderErrorMessage(message.required, "Select user to assign")}
                    </p>
                </div>), { position: "top-right", duration: message.duration }
            );
            return;
        }

        data['created_at'] = new Date().toISOString().split("T")[0];
        data['created_user_id'] = store.user?.id;
        data['company_id'] = store.user?.company?.id;
        data['assignedUserIdList'] = selectedUsersForAssign.map(item => item.id);

        if (!data.end_date) {
            data['end_date'] = '';
        };
        if (!data.end_hour) {
            data['end_hour'] = '';
        };

        console.log('data', data);

        axios.post(config.apiURL + staticDataUrls.task, data).then(res => {
            if (res.statusText === "Created") {
                toast.notify(() => (
                    <div className="alert alert-success m-3">
                        <h5>{message.success}</h5>
                        <p className="mb-0">
                            {renderErrorMessage(message.create_success, "Task")}
                        </p>
                    </div>), { position: "top-right", duration: message.duration }
                );

                data.assignedUserIdList.map(userId => {
                    let assignedUser = userList.find(x => x.id === userId);
                    let recentTaskIdList = assignedUser.assignedTaskIdList;
                    recentTaskIdList.push(Number(res.data.id));

                    axios.put(config.apiURL + staticDataUrls.user + `/${assignedUser.id}`, {
                        assignedTaskIdList: recentTaskIdList
                    });
                })

                history.push('/task/list');
                return;
            };
        });
    }

    return (
        <div className="bg-white rounded p-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="page-header">
                        <h1 className="font-weight-bold">Create new task</h1>
                    </div>
                </div>
            </div>
            <hr />
            <Form className="row" onSubmit={e => handleSubmit(e)}>
                <div className="col-md-6 mb-4">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <Label for='title' className="font-weight-bold">Title</Label>
                            <Input
                                id='title'
                                name="title"
                                placeholder="Enter task title"
                            />
                        </div>
                        <div className="col-12 mb-4">
                            <Label for='description' className="font-weight-bold">Description</Label>
                            <Input
                                id='description'
                                name="description"
                                type='textarea'
                                rows="7"
                                placeholder="Enter task description"
                            />
                        </div>
                    </div>
                </div>
                <hr className='w-100 mb-4 d-md-none' />
                <div className="col-md-6 mb-4">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <Label id='priority_id' className="font-weight-bold">Priority</Label>
                            <Select
                                placeholder="Select"
                                name="priority_id"
                                value={selectedPriority}
                                options={taskPriorityList}
                                getOptionValue={option => option.id}
                                getOptionLabel={option => option.name}
                                onChange={e => setSelectedPriority(e)}
                            />
                        </div>
                        <div className="col-md-6 mb-4">
                            <Label id='user_status' className="font-weight-bold">Status</Label>
                            <Select
                                placeholder="Select"
                                name="status_id"
                                value={taskStatus}
                                options={
                                    taskStatusList.filter(x =>
                                        x.id !== 5 && x.id !== 9 && x.id !== 10
                                    )
                                }
                                getOptionValue={option => option.id}
                                getOptionLabel={option => option.name}
                                onChange={e => setTaskStatus(e)}
                            />
                        </div>
                        <div className="col-md-12 col-lg-6 mb-4">
                            <Label id='end_date' className="font-weight-bold">Deadline</Label>
                            <Input
                                id='end_date'
                                name='end_date'
                                type='date'
                                onChange={e => setDeadline(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 col-lg-6 mb-4">
                            <Label id='end_hour' className="font-weight-bold">Hour (optional)</Label>
                            <Input
                                id='end_hour'
                                name='end_hour'
                                type='time'
                                disabled={!deadline}
                            />
                        </div>
                        <hr className='w-100 mb-4' />
                        <div className="col-md-12 mb-4">
                            <Label id='assignedUserIdList' className="font-weight-bold">Assign</Label>
                            <Select
                                isMulti
                                placeholder="Select"
                                value={selectedUsersForAssign}
                                options={userList}
                                getOptionValue={option => option.id}
                                getOptionLabel={option => option.name + ' ' + option.surname}
                                onChange={e => setSelectedUsersForAssign(e)}
                            />
                        </div>
                    </div>
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
                        onClick={() => history.push('/task/list')}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default EmployeeCreate;
