import React, { Component, Fragment } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import EntryForm from './EntryForm'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Link } from 'react-router-dom';


class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editData: {},
            isModalOpen: false,
            loading: true,
            page: 1,
            limit: 10,
            pages: -1,
            actionType: 'ADD',
            authUser: props.auth.user
        }
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
    approveHandler = id => {
        setTimeout(() => {
            this.onFetchData()
        }, 500)
    }
    rejectHandler = id => {
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
        Axios.get(`${API_URL}api/project`)
            .then(res => {
                this.setState({
                    loading: false,
                    data: res.data
                })
            })
            .catch(error => console.log(error.response))
    }
    accessHandler = data => {
        let { authUser } = this.state
        if (Number(authUser.role) !== 5 || Number(data.status) !== 0) return null
        return <span>
            <button className="btn btn-success mr-2 btn-sm" onClick={() => window.confirm('Are you sure?') && this.approveHandler(data.id)}><i className="fa fa-check"></i></button>
            <button className="btn btn-danger ml-2 btn-sm" onClick={() => window.confirm('Are you sure?') && this.rejectHandler(data.id)}><i className="fa fa-close"></i></button>
        </span>
    }
    render() {
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                Cell: row => <Link to={`/project-detail/${row.original.id}`}>{row.original.name}</Link>,
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Dateline',
                accessor: 'dateline',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: row => <span>{(Number(row.original.status) === 1 && "Pitch") || (Number(row.original.status) === 2 && "Active") || (Number(row.original.status) === 3 && "Completed") || (Number(row.original.status) === 4 && "Archive")}</span>,
            },
            {
                Header: 'Action',
                Cell: row => <span><button className="btn btn-primary btn-sm" onClick={() => this.setState({
                    actionType: "EDIT",
                    editData: row.original,
                    isModalOpen: true
                })}><i className="fa fa-edit"></i></button>
                    <button className="btn btn-danger ml-5 btn-sm" onClick={() => window.confirm('Are you sure?') && this.deleteHandler(row.original.id)}><i className="fa fa-trash"></i></button>
                </span>,
            },
        ];
        let { data, limit, loading, actionType, editData, isModalOpen } = this.state
        return (
            <Fragment>
                <div className="card">
                    <div className="card-header">
                        <strong className="card-title">Project Lists</strong>
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
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps)(Project)