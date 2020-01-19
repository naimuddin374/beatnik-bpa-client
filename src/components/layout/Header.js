import React from 'react'
import TopRightBar from './TopRightBar';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../store/actions/types';

class Header extends React.Component {
    render() {
        return (
            <header id="header" className="header">
                <div className="top-left">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to={`${BASE_URL}`}><img src="images/logo.png" alt="Logo" height="43" /></Link>
                        <Link className="navbar-brand hidden" to={`${BASE_URL}`}><img src="images/logo.png" alt="Logo" height="43" /></Link>
                        <a id="menuToggle" className="menutoggle"><i className="fa fa-bars"></i></a>
                    </div>
                </div>
                <div className="top-right">
                    <div className="header-menu">
                        <div className="header-left">

                            <div className="dropdown for-notification">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="notification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-bell"></i>
                                    <span className="count bg-danger">3</span>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="notification">
                                    <p className="red">You have 3 Notification</p>
                                    <a className="dropdown-item media" href="#">
                                        <i className="fa fa-check"></i>
                                        <p>Server #1 overloaded.</p>
                                    </a>
                                    <a className="dropdown-item media" href="#">
                                        <i className="fa fa-info"></i>
                                        <p>Server #2 overloaded.</p>
                                    </a>
                                    <a className="dropdown-item media" href="#">
                                        <i className="fa fa-warning"></i>
                                        <p>Server #3 overloaded.</p>
                                    </a>
                                </div>
                            </div>

                            <div className="dropdown for-message">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="message" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-envelope"></i>
                                    <span className="count bg-primary">4</span>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="message">
                                    <p className="red">You have 4 Mails</p>
                                    <a className="dropdown-item media" href="#">
                                        <span className="photo media-left">
                                            <img alt="avatar" src="images/avatar/1.jpg" />
                                        </span>
                                        <div className="message media-body">
                                            <span className="name float-left">Jonathan Smith</span>
                                            <span className="time float-right">Just now</span>
                                            <p>Hello, this is an example msg</p>
                                        </div>
                                    </a>
                                    <a className="dropdown-item media" href="#">
                                        <span className="photo media-left">
                                            <img alt="avatar" src="images/avatar/2.jpg" />
                                        </span>
                                        <div className="message media-body">
                                            <span className="name float-left">Jack Sanders</span>
                                            <span className="time float-right">5 minutes ago</span>
                                            <p>Lorem ipsum dolor sit amet, consectetur</p>
                                        </div>
                                    </a>
                                    <a className="dropdown-item media" href="#">
                                        <span className="photo media-left">
                                            <img alt="avatar" src="images/avatar/3.jpg" />
                                        </span>
                                        <div className="message media-body">
                                            <span className="name float-left">Cheryl Wheeler</span>
                                            <span className="time float-right">10 minutes ago</span>
                                            <p>Hello, this is an example msg</p>
                                        </div>
                                    </a>
                                    <a className="dropdown-item media" href="#">
                                        <span className="photo media-left">
                                            <img alt="avatar" src="images/avatar/4.jpg" />
                                        </span>
                                        <div className="message media-body">
                                            <span className="name float-left">Rachel Santos</span>
                                            <span className="time float-right">15 minutes ago</span>
                                            <p>Lorem ipsum dolor sit amet, consectetur</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <TopRightBar history={this.props.history} />
                    </div>
                </div>
            </header>
        )
    }
}
export default Header