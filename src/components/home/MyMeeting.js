import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { API_URL } from '../../store/actions/types';
import { Link } from 'react-router-dom';

class MyMeeting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            page: 1,
            limit: 20,
            pages: -1,
            loading: true,
            authUser: props.auth.user
        }
    }
    componentDidMount() {
        this.onFetchData()
    }
    onFetchData = () => {
        let { authUser } = this.state
        this.setState({
            loading: true,
            data: [],
        })
        Axios.get(`${API_URL}api/my-meetings/${authUser.id}`)
            .then(res => {
                if (Object.keys(res.data).length !== 0) {
                    this.setState({
                        loading: false,
                        data: res.data.filter(item => Number(item.status) === 1)
                    })
                } else {
                    this.setState({
                        loading: false,
                    })
                }
            })
            .catch(error => console.log(error.response))
    }
    render() {
        let { data, limit, loading } = this.state
        const columns = [
            {
                Header: 'Agenda',
                accessor: 'note',
                Cell: row => <span><Link className="btn-link" to={`/meeting-detail/${row.original.id}`} >{row.original.note}</Link></span>,
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Start Time',
                accessor: 'start_time',
            },
            {
                Header: 'End Time',
                accessor: 'end_time',
            },
            {
                Header: 'Creator',
                accessor: 'name',
                Cell: row => <span><Link className="btn-link" to={`/profile/${row.original.user_id}`}>{row.original.name}</Link></span>,
            },
            {
                Header: 'Created At',
                accessor: 'created_at',
            },
        ];
        return (
            <Fragment>
                <div className="card">
                    <div className="card-header">
                        <strong className="card-title">Meeting List</strong>
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
                    </div>
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps)(MyMeeting)