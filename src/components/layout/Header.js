import React, { Component, Fragment } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { API_URL } from '../../store/actions/types';
import { Link } from 'react-router-dom';
import ChangePassword from '../profile/ChangePassword';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
            user: props.auth.user
        }
    }
    render() {
        let { user, isOpen } = this.state
        return (
            <Fragment>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="header-menu-area">
                    <Link to="/">
                        {/* <img className="header-logo" src={logo} alt="BeatnikLogo" /> */}
                    </Link>
                    <Nav>
                        <img className="user-avatar" src={user.image ? `${API_URL + user.image}` : '/images/no_image.png'} alt="pic" />
                        <NavDropdown title={user.name} id="collasible-nav-dropdown">
                            <Link className="dropdown-item" to={`/profile/${user.id}`}> <i className="fa fa-user"></i> Profile</Link>
                            <NavDropdown.Item href="#action" onClick={() => this.setState({ isModalOpen: true })}><i className="fa fa-lock"></i> Change Password</NavDropdown.Item>
                            <NavDropdown.Item href="#action" onClick={() => this.props.logout(this.props.history)}><i className="fa fa-power-off"></i> Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <ChangePassword
                        isOpen={isOpen}
                        isClose={() => this.setState({ isOpen: false })}
                        user={user}
                    />
                </Navbar>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { logout })(Header)