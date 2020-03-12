import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Sidebar extends Component {
    state = {
        pathName: window.location.pathname,
        user: this.props.auth.user
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
        let { pathname, user } = this.state
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
                                <li className={pathname === "conveyance" ? "active" : ''}>
                                    <Link to='/conveyance'><i className="menu-icon fa fa-money" />Conveyance</Link>
                                </li>
                                <li className={pathname === "leave" ? "active" : ''}>
                                    <Link to='/leave'><i className="menu-icon fa fa-laptop" />Leave </Link>
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

const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps)(Sidebar)