import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom';
import { BASE_URL } from '../store/actions/types';

import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './home/Home';
import Department from './department/Department';
import User from './user/User';
import Leave from './leave/Leave';
import MyProfile from './profile/MyProfile';
import EmployeeList from './profile/EmployeeList';
import EmployeeProfile from './profile/EmployeeProfile';

class Routes extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header history={this.props.history} />

                <div className="container-fluid vh-100">
                    <Sidebar />

                    <div id="right-panel" className="right-panel">
                        <Switch>
                            <Route path={`${BASE_URL}/profile/:id`} component={EmployeeProfile} history={this.props.history} />
                            <Route path={`${BASE_URL}/my-profile`} component={MyProfile} history={this.props.history} />
                            <Route path={`${BASE_URL}/leave`} component={Leave} history={this.props.history} />
                            <Route path={`${BASE_URL}/employee`} component={EmployeeList} history={this.props.history} />
                            <Route path={`${BASE_URL}/user`} component={User} history={this.props.history} />
                            <Route path={`${BASE_URL}/department`} component={Department} history={this.props.history} />
                            <Route path={`${BASE_URL}/`} exact component={Home} history={this.props.history} />
                            <Route path={`*`} exact component={Home} history={this.props.history} />
                        </Switch>
                        <Footer />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Routes