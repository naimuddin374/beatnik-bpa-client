import React from 'react'
import './App.css'
import { connect } from 'react-redux';

import AlertMessage from './layout/AlertMessage';

import Routes from './Routes';
import LoginPage from './auth/LoginPage';

class App extends React.Component {
    render() {
        let isAuth = this.props.auth.isAuth
        return (
            <React.Fragment>
                <AlertMessage />
                {isAuth ?
                    <Routes history={this.props.history} /> :
                    <LoginPage history={this.props.history} />
                }
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(App)