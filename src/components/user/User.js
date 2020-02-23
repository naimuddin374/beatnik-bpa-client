import React, { Component, Fragment } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import EntryForm from './EntryForm'
import { deleteData } from '../../store/actions/departmentActions'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL, BASE_URL } from '../../store/actions/types'
import { Link } from 'react-router-dom';

class User extends Component {
    state = {
        data: [],
        editData: {},
        isModalOpen: false,
        loading: true,
        page: 1,
        limit: 10,
        pages: -1,
        actionType: 'ADD',
    }
    componentDidMount() {
        this.onFetchData()
    }
    closeModal = () => {
        this.setState({
            isModalOpen: false
        })
    }
    actionIsDone = () => {
        this.closeModal()
        setTimeout(() => {
            this.onFetchData()
        }, 500)
    }
    deleteHandler = id => {
        this.props.deleteData(id)
        setTimeout(() => {
            this.onFetchData()
        }, 500)
    }
    onFetchData = () => {
        this.setState({
            loading: true,
            data: [],
            editData: {},
        })
        Axios.get(`${API_URL}api/user`)
            .then(res => {
                this.setState({
                    loading: false,
                    data: res.data
                })
            })
            .catch(error => console.log(error.response))
    }
    render() {
        const columns = [
            {
                Header: 'Action',
                Cell: row => <span><button className="btn btn-secondary btn-sm" onClick={() => this.setState({
                    actionType: "EDIT",
                    editData: row.original,
                    isModalOpen: true
                })}><i className="fa fa-edit"></i></button>
                    <button className="btn btn-danger ml-4 btn-sm" onClick={() => { if (window.confirm('Delete the item?')) { this.deleteHandler(row.original.id) } }}><i className="fa fa-trash"></i></button>
                </span>,
            },
            {
                Header: 'ID',
                accessor: 'employee_id',
            },
            {
                Header: 'Avatar',
                accessor: 'avatar',
                Cell: row => <span className="avatar">
                    <div className="round-img">
                        <img className="rounded-circle" src={row.original.image ? API_URL + row.original.image : "images/avatar/1.jpg"} alt="Employee Avatar" height="50" />
                    </div>
                </span>,
            },
            {
                Header: 'Name',
                accessor: 'name',
                Cell: row => <Link className="employee-name" to={`${BASE_URL}profile/${row.original.id}`}>{row.original.name}</Link>,
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Designation',
                accessor: 'designation',
            },
            {
                Header: 'Department',
                accessor: 'department_name',
            },
            {
                Header: 'Supervisor',
                accessor: 'supervisor_name',
            },
            {
                Header: 'Role',
                accessor: 'role',
                Cell: row => <span>{(row.original.role === 1 && "Employee") || (row.original.role === 2 && "HR") || (row.original.role === 3 && "Supervisor") || (row.original.role === 4 && "Admin")}</span>,
            },
            {
                Header: 'Type',
                accessor: 'type',
                Cell: row => <span>{(row.original.type === 1 && "Full Time") || (row.original.type === 2 && "Part Time") || (row.original.type === 3 && "Contact") || (row.original.type === "4" && "Remote")}</span>,
            },
            {
                Header: 'Casual Leave',
                accessor: 'casual_leave',
            },
            {
                Header: 'Sick Leave',
                accessor: 'sick_leave',
            },
            {
                Header: 'Salary',
                accessor: 'salary',
            },
            {
                Header: 'Probation Period',
                accessor: 'probation_period',
            },
        ];
        let { data, limit, loading, actionType, editData, isModalOpen } = this.state
        return (
            <Fragment>
                <div className="content">
                    <div className="animated fadeIn">
                        <div className="row">

                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <strong className="card-title">Employee Lists</strong>
                                        <button className="btn btn-primary float-right" onClick={() => this.setState({
                                            actionType: "ADD",
                                            isModalOpen: true
                                        })}>Add New</button>
                                    </div>
                                    <div className="card-body">
                                        <ReactTable
                                            data={data}
                                            columns={columns}
                                            defaultPageSize={limit}
                                            minRows={1}
                                            noDataText='No rows found!'
                                            loading={loading}
                                        />
                                        {isModalOpen &&
                                            <EntryForm
                                                isOpen={isModalOpen}
                                                isClose={this.closeModal}
                                                actionIsDone={this.actionIsDone}
                                                actionType={actionType}
                                                editData={editData}
                                            />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default connect(null, { deleteData })(User)