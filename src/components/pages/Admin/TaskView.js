import React, { useState, useEffect } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { Button, Form, Input, Label } from 'reactstrap';
import { message, renderErrorMessage, roles, statusList, taskPriorityList, taskStatusList } from '../../../store/staticData';
import toast from 'toasted-notes';
import axios from 'axios';
import { config, staticDataUrls, tableConfig } from '../../../config';
import BootstrapTable from 'react-bootstrap-table-next';

function EmployeeCreate(props) {

    const id = props.match.params.id;

    const store = useSelector(store => store);

    const history = useHistory();

    const [data, setData] = useState(null);
    const [userList, setUserList] = useState([]);
    const [assignedUserList, setAssignedUserList] = useState([]);

    useEffect(() => {
        axios.get(config.apiURL + staticDataUrls.task + `/${id}`).then(res => {
            if (res.statusText = "OK") {
                setData(res.data);
            };
        });
        axios.get(config.apiURL + staticDataUrls.user).then(res => {
            if (res.statusText = "OK") {
                setUserList(res.data);
            };
        });
    }, []);

    const getTaskAuthor = () => {
        let user = userList.find(x => x.id === data.created_user_id);
        if (!user) return '';
        return `${user.name ? user.name + ' ' : ''} ${user.surname ? user.surname + ' ' : ''}`
    };

    const getAssignedUserList = () => {
        if (data && userList.length) {
            let arr = [];
            userList.map(userListItem => {

                data.assignedUserIdList.map(id => {
                    
                    if (Number(userListItem.id) === Number(id)){
                        arr.push(userListItem);
                    }
                })

                // console.log('tets 2 find', data.assignedUserIdList.find(x => Number(x) === Number(item.id)));
            });
            console.log('arr', arr);
            if(arr.length){
                setAssignedUserList(arr);
            }
        }
    };

    useEffect(() => {
        getAssignedUserList();
    }, [data,userList])

    const columns = [{
        dataField: 'id',
        text: '#',
        formatter: (cell, row, index) => {
            return index + 1
        },
    }, {
        dataField: 'user',
        text: 'Assigned users',
        sort: true,
        formatter: (cell, row) => {
            return (
                (row.name ? row.name + ' ' : '') +
                (row.surname ? row.surname : '')
            );
        }
    }, {
        dataField: 'username',
        text: 'Usename',
        sort: true,
        formatter: (cell) => {
            if(!cell) return '';

            return '@' + cell;
        }
    }, {
        dataField: 'email',
        text: 'Email',
        sort: true,
    }];

    return (
        <div className="bg-white rounded p-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="page-header">
                        <h1 className="font-weight-bold">Task details</h1>
                    </div>
                </div>
            </div>
            <hr />
            {
                data ?
                    <>
                        <div className="row">
                            <div className="col-md-8 mb-4">
                                <div className="row">
                                    <div className="col-12 mb-4">
                                        <Label className="font-weight-bold">Title</Label>
                                        <p>{data.title}</p>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <Label className="font-weight-bold">Description</Label>
                                        <p>{data.description}</p>
                                    </div>
                                </div>
                            </div>
                            <hr className='w-100 mb-4 d-md-none' />
                            <div className="col-md-4 mb-4">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <Label className="font-weight-bold">Priority</Label>
                                        <p>
                                            {
                                                taskPriorityList.find(x => x.id === Number(data.priority_id))?.name
                                            }
                                        </p>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <Label className="font-weight-bold">Status</Label>
                                        <p>
                                            {
                                                taskStatusList.find(x => x.id === Number(data.status_id))?.name
                                            }
                                        </p>
                                    </div>
                                    <div className="col-md-12 col-lg-6 mb-4">
                                        <Label className="font-weight-bold">Create date</Label>
                                        <p>{data.created_at}</p>
                                    </div>
                                    <div className="col-md-12 col-lg-6 mb-4">
                                        <Label className="font-weight-bold">Deadline</Label>
                                        <p>
                                            {
                                                data.end_date + `${data.end_hour ? ' ' + data.end_hour : ''}`
                                            }
                                        </p>
                                    </div>
                                    <div className="col-md-12 col-lg-6 mb-4">
                                        <Label className="font-weight-bold">Author</Label>
                                        <p>{getTaskAuthor()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <BootstrapTable
                                bootstrap4
                                striped
                                keyField='id'
                                data={assignedUserList}
                                {...tableConfig}
                                columns={columns}
                                wrapperClasses="table-responsive"
                            />
                        </div>
                    </>
                    :
                    <div className="row">
                        <div className="col-md-12">
                            <div className="alert alert-warning">
                                Data not found!
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default EmployeeCreate;
