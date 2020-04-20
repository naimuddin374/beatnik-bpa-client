import React, { Component, Fragment } from 'react';
import { API_URL } from '../../store/actions/types';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import AudienceSection from './AudienceSection';


class SelectedUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: props.projectId,
            authUser: props.authUser,
            users: [],
            isAddNew: false,
            getUsers: [],
        }
    }
    componentDidMount() {
        this.fetchData()
        this.fetchUsers()
    }
    fetchData = () => {
        Axios.get(`${API_URL}api/project-user/${this.state.projectId}`)
            .then(res => {
                this.setState({
                    users: res.data,
                })
            })
            .catch(err => console.log(err.response))
        this.fetchUsers()
    }
    fetchUsers = () => {
        this.setState({ getUsers: [] })
        Axios.get(`${API_URL}api/users-by-department/${this.state.authUser.department_id}`)
            .then(res => {
                this.setState({
                    getUsers: res.data.filter(item => item.id !== this.state.authUser.id),
                })
            })
            .catch(err => console.log(err.response))
    }
    deleteHandler(id) {
        Axios.delete(`${API_URL}api/project-user/${id}`)
            .then(res => {
                this.fetchData()
            })
            .catch(err => console.log(err.response))
    }
    actionIsDone = () => {
        this.fetchData()
        this.fetchUsers()
    }
    render() {
        let { projectId, users, isAddNew, getUsers } = this.state
        return (
            <Fragment>
                <div className="row">
                    <div className="col-lg-2 float-right">
                        <a href="#blank" onClick={() => this.setState({ isAddNew: !isAddNew })}>Add User</a>
                    </div>
                    {Object.keys(users).length !== 0 &&
                        users.map(item =>
                            <div className="col-lg-2" key={item.id}>
                                <Link to={`/profile/${item.user_id}`}>{item.user_name}</Link> <i onClick={() => this.deleteHandler(item.id)} className="text-danger fa fa-trash" />
                            </div>
                        )
                    }
                </div>
                {isAddNew && Object.keys(getUsers).length !== 0 && <AudienceSection users={getUsers} projectId={projectId} actionIsDone={this.actionIsDone} />}
            </Fragment>
        );
    }
}
export default SelectedUsers