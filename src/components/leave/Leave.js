import React, { Component, Fragment } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import EntryForm from './EntryForm'
import { deleteData, leaveApprove } from '../../store/actions/leaveActions'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import RejectNote from './RejectNote';
import { Link } from 'react-router-dom';


class Leave extends Component {
    state = {
        data: [],
        editData: {},
        isModalOpen: false,
        isRejectModalOpen: false,
        loading: true,
        page: 1,
        limit: 10,
        pages: -1,
        actionType: 'ADD',
        authUser: this.props.auth.user
    }
    componentDidMount() {
        this.onFetchData()
    }
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            isRejectModalOpen: false
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
    leaveApprove(id) {
        this.props.leaveApprove(id)
        setTimeout(() => {
            this.onFetchData()
        }, 500)
    }
    onFetchData = () => {
        let { authUser } = this.state
        this.setState({
            loading: true,
            data: [],
            editData: {},
        })
        Axios.get(`${API_URL}api/all-leave/${authUser.id}`)
            .then(res => {
                this.setState({
                    loading: false,
                    data: res.data
                })
            })
            .catch(error => console.log(error.response))
    }
    actionHandler = data => {
        let { id, status } = data
        let userRole = this.state.authUser.role
        if (userRole === 3 && status === 0) {
            return <span>
                <button
                    className='btn btn-success mr-4'
                    onClick={() => this.leaveApprove(id)}
                ><i className="fa fa-check" /></button>
                <button
                    className="btn btn-danger"
                    onClick={() => this.setState({
                        actionType: "EDIT",
                        editData: data,
                        isRejectModalOpen: true
                    })}
                > <i className="fa fa-close" /> </button>

            </span>
        } else if (userRole === 1 && status === 2) {
            return <span>
                <button
                    className="btn btn-primary"
                    onClick={() => this.setState({
                        actionType: "EDIT",
                        editData: data,
                        isModalOpen: true
                    })}
                > <i className="fa fa-pencil" /> </button>

            </span>
        }
    }
    render() {
        const columns = [
            {
                Header: 'Action',
                Cell: row => <span>
                    {this.actionHandler(row.original)}
                </span>,
            },
            {
                Header: 'Avatar',
                accessor: 'avatar',
                Cell: row => <span className="avatar">
                    <div className="round-img">
                        <img className="employee-image" src={row.original.image ? API_URL + row.original.image : "images/avatar/1.jpg"} alt="Employee Avatar" height="50" />
                    </div>
                </span>,
            },
            {
                Header: 'Employee Name',
                accessor: 'name',
                Cell: row => <span><Link className="btn-link" to={`/profile/${row.original.user_id}`} >{row.original.name}</Link></span>,
            },
            {
                Header: 'Type',
                accessor: 'type',
                Cell: row => <span>{(row.original.type === 1 && 'Casual') || (row.original.status === 2 && 'Sick') || (row.original.status === 3 && 'Other')}</span>,
            },
            {
                Header: 'Supervisor',
                accessor: 'supervisor_name',
            },
            {
                Header: 'Designation',
                accessor: 'designation',
            },
            {
                Header: 'Start Date',
                accessor: 'start_date',
            },
            {
                Header: 'End Date',
                accessor: 'end_date',
            },
            {
                Header: 'Total Day',
                accessor: 'total_day',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: row => <span>{(row.original.status === 0 && <span className="bg-secondary">Waiting for approval</span>) || (row.original.status === 1 && <span className="bg-success">Approved</span>) || (row.original.status === 2 && <span className="bg-danger">Rejected</span>)}</span>,
            },
            {
                Header: 'Created At',
                accessor: 'created_at',
            },
        ];
        let { data, limit, loading, actionType, editData, isModalOpen, isRejectModalOpen } = this.state
        return (
            <Fragment>
                <div className="content">
                    <div className="animated fadeIn">
                        <div className="row">

                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <strong className="card-title">Leave Lists</strong>
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
                                        {isRejectModalOpen &&
                                            <RejectNote
                                                isOpen={isRejectModalOpen}
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
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { deleteData, leaveApprove })(Leave)