import React, { Component, Fragment } from 'react'
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Link } from 'react-router-dom';
import Loading from '../layout/Loading'

class EmployeeProfile extends Component {
    state = {
        departments: {},
        users: {},
        loading: true,
    }
    componentDidMount() {
        this.onFetchData()
    }
    onFetchData = () => {
        Axios.get(`${API_URL}api/department`)
            .then(res => {
                this.setState({
                    departments: res.data
                })
            })
            .catch(error => console.log(error.response))
        Axios.get(`${API_URL}api/user`)
            .then(res => {
                this.setState({
                    loading: false,
                    users: res.data
                })
            })
            .catch(error => console.log(error.response))
    }
    render() {
        let { departments, users, loading } = this.state
        return (
            <Fragment>
                <div className="card">
                    <div className="card-header">
                        <strong className="card-title">Others Profile</strong>
                    </div>
                    {loading && <Loading />}
                    <div className="card-body">
                        {Object.keys(departments).length !== 0 &&
                            departments.map(depart => <table className="table" key={depart.id}>
                                <thead>
                                    <tr>
                                        <th colSpan="10" className="bg-dark text-white">{depart.name}</th>
                                    </tr>
                                    <tr>
                                        <th>ID</th>
                                        <th colSpan="2">Name</th>
                                        <th>Designation</th>
                                        <th>Email</th>
                                        <th>Contact Number</th>
                                        <th>Joining Date</th>
                                        <th>View More</th>
                                    </tr>
                                    {Object.keys(users).length !== 0 &&
                                        users.map(user => Number(user.department_id) === Number(depart.id) && <tr key={user.id}>
                                            <td>{user.employee_id}</td>
                                            <td colSpan="2"><Link to={`/profile/${user.id}`}>{user.name}</Link></td>
                                            <td>{user.designation}</td>
                                            <td>{user.email}</td>
                                            <td>{user.contact !== 'NULL' && user.contact}</td>
                                            <td>{user.joining_date}</td>
                                            <td><Link to={`/profile/${user.id}`}>Click Here</Link></td>
                                        </tr>)}

                                </thead>
                            </table>)}
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default EmployeeProfile