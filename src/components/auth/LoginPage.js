import React from 'react'
import { connect } from 'react-redux'
import { Login } from '../../store/actions/authActions'

class LoginPage extends React.Component {
    state = {
        email: "",
        password: ""
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = event => {
        event.preventDefault()
        this.props.Login(this.state, this.props.history)
    }
    render() {
        let { email, password } = this.state
        let isDone = email && password
        return (
            <React.Fragment>
                <div className="sufee-login d-flex align-content-center flex-wrap">
                    <div className="container">
                        <div className="login-content">
                            <div className="login-logo">
                                <a href="#">
                                    <img className="align-content" src="images/logo.png" alt="" height="200" />
                                </a>
                            </div>
                            <div className="login-form">
                                <form onSubmit={this.submitHandler}>
                                    <div className="form-group">
                                        <label>Email address <span>*</span></label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email address"
                                            name="email"
                                            value={email}
                                            onChange={this.changeHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password <span>*</span></label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={this.changeHandler}
                                        />
                                    </div>
                                    {/* <div className="checkbox">
                                        <label>
                                            <input type="checkbox" value="1" /> Remember Me
                            </label>
                                        <label className="pull-right">
                                            <a href="#">Forgotten Password?</a>
                                        </label>

                                    </div> */}
                                    <button type="submit" className="btn btn-success btn-flat m-b-30 m-t-30" disabled={!isDone}>Sign in</button>
                                    {/* <div className="social-login-content">
                                        <div className="social-button">
                                            <button type="button" className="btn social facebook btn-flat btn-addon mb-3"><i className="ti-facebook"></i>Sign in with facebook</button>
                                            <button type="button" className="btn social twitter btn-flat btn-addon mt-2"><i className="ti-twitter"></i>Sign in with twitter</button>
                                        </div>
                                    </div> 
                                    <div className="register-link m-t-15 text-center">
                                        <p>Don't have account ? <a href="#"> Sign Up Here</a></p>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect(null, { Login })(LoginPage)