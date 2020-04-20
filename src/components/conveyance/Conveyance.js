import React, { Component, Fragment } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import EntryForm from './EntryForm'
import { rejectData, approveData } from '../../store/actions/conveyanceActions'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Link } from 'react-router-dom';


class Conveyance extends Component {
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
        this.props.approveData(id)
        setTimeout(() => {
            this.onFetchData()
        }, 500)
    }
    rejectHandler = id => {
        this.props.rejectData(id)
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
        Axios.get(`${API_URL}api/conveyance`)
            .then(res => {
                let { authUser } = this.state
                let data = res.data
                if (Number(authUser.role) !== 5) {
                    data = data.filter(item => Number(item.user_id) === Number(authUser.id))
                }
                this.setState({
                    loading: false,
                    data
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
                Header: 'Avatar',
                accessor: 'avatar',
                Cell: row => <span className="avatar">
                    <div className="round-img">
                        <img className="employee-image" src={row.original.image ? API_URL + row.original.image : "images/no_image.png"} alt="Employee Avatar" />
                    </div>
                    <Link className="btn-link" to={`/profile/${row.original.user_id}`} >{row.original.user_name}</Link>
                </span>,
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Purpose',
                accessor: 'note',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: row => <span>{(Number(row.original.status) === 0 && <span className="bg-secondary">Pending</span>) || (Number(row.original.status) === 1 && <span className="bg-success">Approve</span>) || (Number(row.original.status) === 2 && <span className="bg-danger">Rejected</span>)}</span>,
            },
            {
                Header: 'Action',
                Cell: row => this.accessHandler(row.original),
            },
        ];
        let { data, limit, loading, actionType, editData, isModalOpen } = this.state
        return (
            <Fragment>
                {/* <div className="content">
                    <div className="animated fadeIn">
                        <div className="row">
                            <div className="col-md-12"> */}

                <div className="card">
                    <div className="card-header">
                        <strong className="card-title">Conveyance Lists</strong>
                        <button className="btn btn-primary float-right" onClick={() => this.setState({
                            actionType: "ADD",
                            isModalOpen: true
                        })}>Apply for Conveyance</button>
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
                {/* </div>
                        </div>
                    </div>
                </div> */}
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { rejectData, approveData })(Conveyance)