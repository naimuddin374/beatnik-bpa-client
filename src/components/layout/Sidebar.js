import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../store/actions/types'
import authUser from '../../util/authUser'

class Sidebar extends Component {
    state = {
        pathName: window.location.pathname
    }
    render() {
        let { role } = authUser()
        let { pathname } = this.state
        return (
            <Fragment>
                <aside id="left-panel" className="left-panel bg-dark">
                    <nav className="navbar navbar-expand-sm navbar-default bg-dark">
                        <div id="main-menu" className="main-menu collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li className={pathname === "/" ? "active" : ''}>
                                    <Link to='/'><i className="menu-icon fa fa-laptop" />Dashboard </Link>
                                </li>
                                <li className={pathname === "meeting" ? "active" : ''}>
                                    <Link to='/meeting'><i className="menu-icon fa fa-users" />Meeting </Link>
                                </li>
                                <li className={pathname === "leave" ? "active" : ''}>
                                    <Link to='/leave'><i className="menu-icon fa fa-laptop" />Leave </Link>
                                </li>
                                <li className={pathname === "employee" ? "active" : ''}>
                                    <Link to='/employee'><i className="menu-icon fa fa-users" />Employee Profile</Link>
                                </li>
                                {role === 2 &&
                                    <li className={pathname === "user" ? "active" : ''}>
                                        <Link to='/user'><i className="menu-icon fa fa-users" />Employee </Link>
                                    </li>}
                                {role === 2 &&
                                    <li className={pathname === "department" ? "active" : ''}>
                                        <Link to='/department'><i className="menu-icon fa fa-laptop" />Department </Link>
                                    </li>}
                            </ul>
                        </div>
                    </nav>
                </aside>
            </Fragment>
        )
    }
}
export default Sidebar