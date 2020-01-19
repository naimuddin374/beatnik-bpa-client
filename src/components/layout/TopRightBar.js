import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import authUser from '../../util/authUser';
import { API_URL, BASE_URL } from '../../store/actions/types';
import ChangePassword from '../profile/ChangePassword';
import { Link } from 'react-router-dom';

class TopRightBar extends Component {
    state = {
        isModalOpen: false,
        user: []
    }
    closeModal = () => {
        this.setState({
            isModalOpen: false,
        })
    }
    render() {
        return (
            <Fragment>
                <div className="user-area dropdown float-right">
                    <a href="#blank" className="dropdown-toggle active" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className="user-avatar rounded-circle" src={authUser().image ? `${API_URL + authUser().image}` : 'images/admin.jpg'} alt="User Avatar" />
                    </a>
                    <div className="user-menu dropdown-menu">
                        <Link className="nav-link" to={`${BASE_URL}/my-profile`}><i className="fa fa-user"></i>My Profile</Link>
                        <a
                            className="nav-link"
                            href="#blank"
                            onClick={() => this.setState({ isModalOpen: true })}
                        ><i className="fa fa-lock"></i>Change Password</a>
                        <a className="nav-link" href="#blank" onClick={() => this.props.logout(this.props.history)}><i className="fa fa-power-off"></i>Logout</a>
                    </div>

                    <ChangePassword
                        isOpen={this.state.isModalOpen}
                        isClose={this.closeModal}
                        actionIsDone={this.actionIsDone}
                        user={authUser()}
                    />
                </div>
            </Fragment>
        )
    }
}
export default connect(null, { logout })(TopRightBar)