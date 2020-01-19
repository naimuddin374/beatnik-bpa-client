import React, { Component, Fragment } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import EntryForm from './EntryForm'
import { deleteData } from '../../store/actions/departmentActions'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'

class Department extends Component {
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
        Axios.get(`${API_URL}api/department`)
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
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Action',
                Cell: row => <span><button className="btn btn-primary btn-sm" onClick={() => this.setState({
                    actionType: "EDIT",
                    editData: row.original,
                    isModalOpen: true
                })}><i className="fa fa-edit"></i></button>
                    <button className="btn btn-danger ml-2 btn-sm" onClick={() => { if (window.confirm('Delete the item?')) { this.deleteHandler(row.original.id) } }}><i className="fa fa-trash"></i></button>
                </span>,
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
                                        <strong className="card-title">Department Lists</strong>
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
                                        <EntryForm
                                            isOpen={isModalOpen}
                                            isClose={this.closeModal}
                                            actionIsDone={this.actionIsDone}
                                            actionType={actionType}
                                            editData={editData}
                                        />

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
export default connect(null, { deleteData })(Department)