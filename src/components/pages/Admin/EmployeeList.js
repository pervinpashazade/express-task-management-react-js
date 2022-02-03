import React, { useEffect, useState } from 'react';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { config, staticDataUrls, tableConfig } from '../../../config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';

function EmployeeList() {

    const store = useSelector(store => store);

    const [emplooyeList, setEmployeeList] = useState([]);

    const columns = [{
        dataField: 'id',
        text: '#',
        formatter: (cell, row, index) => {
            return index + 1
        },
    }, {
        dataField: 'name',
        text: 'Name',
        sort: true,
    }, {
        dataField: 'surname',
        text: 'Surname',
        sort: true,
    }, {
        dataField: 'assignedTaskIdList',
        text: 'Assigned tasks',
        sort: true,
        formatter: (cell, row) => {
            return cell?.length;
        }
    }, {
        dataField: 'status',
        text: 'Status',
        sort: true,
        formatter: (cell) => {
            if (cell) {
                return <FontAwesomeIcon icon={faCheck} color='green' />
            };
            return <FontAwesomeIcon icon={faTimes} color='red' />
        }
    }, {
        dataField: 'browse',
        text: '',
        formatter: (cell, row) => {
            return <Button size='sm' color="warning" className='font-weight-bold'>
                ...
            </Button>
        }
    }];

    useEffect(() => {
        getEmployeeListByCompany(store.user.company?.id);
    }, [])

    const getEmployeeListByCompany = companyId => {
        if (!companyId) return [];

        axios.get(config.apiURL + staticDataUrls.user).then(res => {
            if (res.statusText === "OK") {
                // console.log('res data list', res.data.filter(x => x.id !== store.user.id && x.company_id === companyId));

                setEmployeeList(res.data.filter(x => x.id !== store.user.id && x.company_id === companyId))
            };
        });
    };

    return (
        <div className="bg-white rounded p-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="page-header">
                        <h1 className="font-weight-bold">Employee list</h1>
                        <Link
                            to={'/employee/create'}
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
                    data={emplooyeList}
                    {...tableConfig}
                    columns={columns}
                    wrapperClasses="table-responsive"
                />
                {/* <Pagination
                    total_count={this.state.total}
                    rows_on_page={this.state.rows}
                    page={this.state.page}
                    getData={this.getData}
                    setRowCount={this.setRowCount}
                /> */}
            </div>
        </div>
    )
}

export default EmployeeList;
