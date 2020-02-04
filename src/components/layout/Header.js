import React, { Component, Fragment } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import authUser from '../../util/authUser';
import { API_URL } from '../../store/actions/types';
import { Link } from 'react-router-dom';
import ChangePassword from '../profile/ChangePassword';
import logo from '../assets/images/logo.png';

class Header extends Component {
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
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="header-menu-area">
                    <Link to="/">
                        <img className="header-logo" src={logo} alt="BeatnikLogo" />
                    </Link>
                    <Nav>
                        <img className="user-avatar" src={authUser().image ? `${API_URL + authUser().image}` : 'images/admin.jpg'} alt="User Avatar" />
                        <NavDropdown title={authUser().name} id="collasible-nav-dropdown">
                            <Link className="dropdown-item" to={`/my-profile`}> <i className="fa fa-user"></i> Profile</Link>
                            <NavDropdown.Item href="#action" onClick={() => this.setState({ isModalOpen: true })}><i className="fa fa-lock"></i> Change Password</NavDropdown.Item>
                            <NavDropdown.Item href="#action" onClick={() => this.props.logout(this.props.history)}><i className="fa fa-power-off"></i> Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <ChangePassword
                        isOpen={this.state.isModalOpen}
                        isClose={this.closeModal}
                        user={authUser()}
                    />
                </Navbar>
            </Fragment>
        )
    }
}
export default connect(null, { logout })(Header)