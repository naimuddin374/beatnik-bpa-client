import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { connect } from 'react-redux';

import AlertMessage from './layout/AlertMessage';

import Routes from './Routes';
import Login from './auth/Login';

class App extends React.Component {
    render() {
        let isAuth = this.props.auth.isAuth
        return (
            <React.Fragment>
                <AlertMessage />
                {isAuth ?
                    <Routes history={this.props.history} /> :
                    <Login history={this.props.history} />
                }
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(App)