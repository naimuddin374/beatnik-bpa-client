import React, { Component, Fragment } from 'react'
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Link } from 'react-router-dom';
import Loading from '../layout/Loading'
import { connect } from 'react-redux';


class MyTeam extends Component {
    constructor(props) {
        super(props)

        this.state = {
            authUser: props.auth.user,
            users: {},
            loading: true,
        }
    }
    componentDidMount() {
        this.onFetchData()
    }
    onFetchData = () => {
        Axios.get(`${API_URL}api/my-team/${this.state.authUser.id}`)
            .then(res => {
                this.setState({
                    loading: false,
                    users: res.data
                })
            })
            .catch(error => console.log(error.response))
    }
    render() {
        let { users, loading } = this.state
        return (
            <Fragment>
                <div className="content">
                    <div className="animated fadeIn">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <strong className="card-title">Team</strong>
                                    </div>
                                    {loading && <Loading />}
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th rowSpan="2">Name</th>
                                                    <th>Designation</th>
                                                    <th>Email</th>
                                                    <th>Available Casual</th>
                                                    <th>Available Sick</th>
                                                    <th>Contact Number</th>
                                                    <th>Joining Date</th>
                                                    <th>View More</th>
                                                </tr>
                                            </thead>
                                            {Object.keys(users).length !== 0 &&
                                                users.map(user =>
                                                    <tbody key={user.id}>
                                                        <tr>
                                                            <td rowSpan="2">{user.employee_id}</td>
                                                            <td><Link to={`/profile/${user.id}`}>{user.name}</Link></td>
                                                            <td>{user.designation}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.casual_leave}</td>
                                                            <td>{user.sick_leave}</td>
                                                            <td>{user.contact !== 'NULL' && user.contact}</td>
                                                            <td>{user.joining_date}</td>
                                                            <td><Link to={`/profile/${user.id}`}>Click Here</Link></td>
                                                        </tr>
                                                    </tbody>
                                                )}
                                        </table>
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
export default connect(mapStateToProps)(MyTeam)