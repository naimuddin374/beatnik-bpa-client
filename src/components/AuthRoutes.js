import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Login from './auth/Login';
import ResetPassword from './auth/ResetPassword';


class AuthRoutes extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path='/reset-password/:key' component={ResetPassword} history={this.props.history} />
                    <Route path='/' exact component={Login} history={this.props.history} />
                </Switch>
            </React.Fragment>
        )
    }
}
export default AuthRoutes