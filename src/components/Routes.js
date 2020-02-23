import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom';

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
import Meeting from './meeting/Meeting';
import MeetingDetail from './meeting/MeetingDetail';

class Routes extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header history={this.props.history} />

                <div className="container-fluid vh-100">
                    <Sidebar />

                    <div id="right-panel" className="right-panel">
                        <Switch>
                            <Route path='/meeting' component={Meeting} history={this.props.history} />
                            <Route path='/meeting-detail/:id' component={MeetingDetail} history={this.props.history} />
                            <Route path='/profile/:id' component={EmployeeProfile} history={this.props.history} />
                            <Route path='/my-profile' component={MyProfile} history={this.props.history} />
                            <Route path='/leave' component={Leave} history={this.props.history} />
                            <Route path='/employee' component={EmployeeList} history={this.props.history} />
                            <Route path='/user' component={User} history={this.props.history} />
                            <Route path='/department' component={Department} history={this.props.history} />
                            <Route path='/' exact component={Home} history={this.props.history} />
                            <Route path='*' exact component={Home} history={this.props.history} />
                        </Switch>
                        <Footer />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Routes