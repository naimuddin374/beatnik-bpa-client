import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../assets/images/beatnik-time-white-logo.png';
import { Collapse } from 'react-collapse';
import ProjectList from './ProjectList';



class Sidebar extends Component {
    state = {
        pathName: window.location.pathname,
        user: this.props.auth.user,
        isConveyance: false,
        isProject: false,
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (JSON.stringify(nextProps.auth.user) === JSON.stringify(prevState.auth)) return null
    //     if (Object.keys(nextProps.auth.user).length === 0) {
    //         nextProps.history.push('/')
    //     }
    //     return {
    //         auth: nextProps.auth.user,
    //     }
    // }
    render() {
        let { pathname, user, isConveyance, isProject } = this.state
        return (
            <Fragment>
                <aside id="left-panel" className="left-panel bg-dark">
                    <nav className="navbar navbar-expand-sm navbar-default bg-dark">
                        <Link to="/">
                            <img className="header-logo" src={logo} alt="BeatnikLogo" />
                        </Link>
                        <div id="main-menu" className="main-menu collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li className={pathname === "/" ? "active" : ''}>
                                    <Link to='/'><i className="menu-icon fa fa-th" />Dashboard </Link>
                                </li>
                                <li className={pathname === "project" ? "active" : ''}>
                                    <Link onClick={() => this.setState({ isProject: !isProject })} to='#blank' ><i className="menu-icon fa fa-file-o" />Project</Link>
                                    <Collapse isOpened={isProject}>
                                        <ProjectList />
                                    </Collapse>
                                </li>

                                <li className={pathname === "meeting" ? "active" : ''}>
                                    <Link to='/meeting'><i className="menu-icon fa fa-handshake-o" />Meeting </Link>
                                </li>
                                <li className={pathname === "conveyance" ? "active" : ''}>
                                    <Link onClick={() => this.setState({ isConveyance: !isConveyance })} to='#blank' ><i className="menu-icon fa fa-file-o" />Conveyance</Link>
                                    <Collapse isOpened={isConveyance}>
                                        <ul className="sub-menu-ul-area">
                                            <li><Link to='/conveyance' ><i className="menu-icon fa fa-plus" />Add New</Link></li>
                                            <li><Link to='/conveyance' ><i className="menu-icon fa fa-bookmark-o" />List</Link></li>
                                        </ul>
                                    </Collapse>
                                </li>
                                <li className={pathname === "leave" ? "active" : ''}>
                                    <Link to='/leave'><i className="menu-icon fa fa-file-o" />Leave Application </Link>
                                </li>
                                {Number(user.role) === 3 &&
                                    <li className={pathname === "employee" ? "active" : ''}>
                                        <Link to='/my-team'><i className="menu-icon fa fa-users" />My Team</Link>
                                    </li>}
                                <li className={pathname === "employee" ? "active" : ''}>
                                    <Link to='/employee'><i className="menu-icon fa fa-users" />Other Profile</Link>
                                </li>
                                {Number(user.role) === 2 &&
                                    <li className={pathname === "user" ? "active" : ''}>
                                        <Link to='/user'><i className="menu-icon fa fa-users" />Employee </Link>
                                    </li>}
                                {Number(user.role) === 2 &&
                                    <li className={pathname === "department" ? "active" : ''}>
                                        <Link to='/department'><i className="menu-icon fa fa-file-o" />Department </Link>
                                    </li>}
                            </ul>
                        </div>
                    </nav>
                </aside>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps)(Sidebar)