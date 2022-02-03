import React, { useEffect, useState } from 'react';
import { faCheck, faEye, faPen, faPlus, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { config, staticDataUrls, tableConfig } from '../../../config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { taskPriorityList, taskStatusList } from '../../../store/staticData';

function TaskList() {

    const store = useSelector(store => store);

    const [taskList, setTaskList] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const toggleEditModal = () => {
        setIsOpenEditModal(!isOpenEditModal);
    };

    const toggleDeleteModal = () => {
        setIsOpenDeleteModal(!isOpenDeleteModal);
    };

    useEffect(() => {
        getTaskListByCompany(store.user.company?.id);
    }, [])

    const getTaskListByCompany = companyId => {
        if (!companyId) return [];
        axios.get(config.apiURL + staticDataUrls.task).then(res => {
            if (res.statusText === "OK") {
                console.log('res.data', res.data);

                setTaskList(res.data.filter(x => x.company_id === companyId))
            };
        });
    };

    const columns = [{
        dataField: 'id',
        text: '#',
        formatter: (cell, row, index) => {
            return index + 1
        },
    }, {
        dataField: 'title',
        text: 'Title',
        sort: true,
    }, {
        dataField: 'status_id',
        text: 'Status',
        sort: true,
        formatter: (cell) => {
            if (!cell) return '';

            let status = taskStatusList.find(x => x.id === Number(cell));

            let colorClass = '';

            if (status?.id === 9) {
                colorClass = 'text-danger'
            };
            if (status?.id === 5) {
                colorClass = 'text-success'
            };

            return <span className={`${colorClass}`}>
                {status?.name}
            </span>
        }
    }, {
        dataField: 'priority_id',
        text: 'Priority',
        sort: true,
        formatter: (cell) => {
            if (!cell) return '';

            let priority = taskPriorityList.find(x => x.id === Number(cell));

            return <span className={`${priority.id === 3 ? 'text-warning font-weight-bold' : ''}`}>
                {priority?.name}
            </span>
        }
    }, {
        dataField: 'assignedTaskIdList',
        text: 'Assigned',
        sort: true,
        formatter: (cell, row) => {
            return cell?.length;
        }
    }, {
        dataField: 'end_date',
        text: 'Deadline',
        sort: true,
        formatter: (cell, row) => {
            if (!cell) return '';

            if (row.end_hour) {
                return `${cell} ${row.end_hour}`
            }

            return cell;
        }
    }, {
        dataField: 'browse',
        text: '',
        formatter: (cell, row) => {
            return (
                <div className="text-center">
                    <UncontrolledDropdown>
                        <DropdownToggle color="warning">
                            ...
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem
                                tag={Link} to={`/task/view/${row.id}`}
                            >
                                <FontAwesomeIcon icon={faEye} className="mr-2" />
                                Bax
                            </DropdownItem>
                            <DropdownItem onClick={() => {
                                setSelectedRow(row);
                                toggleEditModal();
                            }}>
                                <FontAwesomeIcon icon={faPen} className="mr-2" />
                                Redakdə et
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => {
                                    setSelectedRow(row);
                                    toggleDeleteModal();
                                }}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                                Sil
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )
        }
    }];

    return (
        <div className="bg-white rounded p-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="page-header">
                        <h1 className="font-weight-bold">Task list</h1>
                        <Link
                            to={'/task/create'}
                            className='btn btn-warning font-weight-bold'
                        >
                            <FontAwesomeIcon icon={faPlus} className='mr-2' />
                            Add new
                        </Link>
                    </div>
                </div>
            </div>
            <hr />
            <div className="mt-4">
                <BootstrapTable
                    bootstrap4
                    striped
                    keyField='id'
                    data={taskList}
                    {...tableConfig}
                    columns={columns}
                    wrapperClasses="table-responsive"
                />
            </div>
        </div>
    )
}

export default TaskList;
