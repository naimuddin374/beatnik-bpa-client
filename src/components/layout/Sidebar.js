import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../store/actions/types'
import authUser from '../../util/authUser'

class Sidebar extends React.Component {
    state = {
        pathName: window.location.pathname
    }
    render() {
        let { name, role } = authUser()
        let { pathname } = this.state
        return (
            <aside id="left-panel" className="left-panel">
                <nav className="navbar navbar-expand-sm navbar-default">
                    <div id="main-menu" className="main-menu collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><h4>Hi {name}</h4></li>
                            <li className={pathname === "/" ? "active" : ''}>
                                <Link to={`${BASE_URL}/`}><i className="menu-icon fa fa-laptop"></i>Dashboard </Link>
                            </li>
                            <li className={pathname === "leave" ? "active" : ''}>
                                <Link to={`${BASE_URL}/leave`}><i className="menu-icon fa fa-laptop"></i>Leave </Link>
                            </li>
                            <li className={pathname === "employee" ? "active" : ''}>
                                <Link to={`${BASE_URL}/employee`}><i className="menu-icon fa fa-users"></i>Employee Profile</Link>
                            </li>
                            {role !== 1 &&
                                <li className={pathname === "user" ? "active" : ''}>
                                    <Link to={`${BASE_URL}/user`}><i className="menu-icon fa fa-users"></i>Employee </Link>
                                </li>}

                            {role !== 1 &&
                                <li className="menu-item-has-children dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-tasks"></i>Tools</a>
                                    <ul className="sub-menu children dropdown-menu">
                                        <li className={pathname === "/department" ? "active" : ''}><i className="menu-icon fa fa-fort-awesome"></i><Link to={`${BASE_URL}/department`}>Department</Link></li>
                                    </ul>
                                </li>
                            }

                            {/* <li className="menu-title">Tools</li> */}
                        </ul>
                    </div>
                </nav>
            </aside>
        )
    }
}
export default Sidebar