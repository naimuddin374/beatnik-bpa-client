import React from 'react'
import { connect } from 'react-redux'
import { login, forgotPassword } from '../../store/actions/authActions'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import logo from '../assets/images/logo.png';
import logo from '../assets/images/beatnik-time-white-logo.png';
import './Style.css';

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        actionStatus: 0,
        isForgot: false
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.isForgot) {
            if (JSON.stringify(nextProps.auth.forgotStatus) === JSON.stringify(prevState.actionStatus)) return null
            if (nextProps.auth.forgotStatus === 2) {
                nextProps.history.push('/')
            }
            return {
                actionStatus: nextProps.auth.forgotStatus,
            }
        } else {
            if (JSON.stringify(nextProps.auth.status) === JSON.stringify(prevState.actionStatus)) return null
            if (nextProps.auth.status === 2) {
                nextProps.history.push('/')
            }
            return {
                actionStatus: nextProps.auth.status,
            }
        }
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = event => {
        event.preventDefault()
        let { isForgot } = this.state
        if (isForgot) {
            this.props.forgotPassword(this.state)
        } else {
            this.props.login(this.state)
        }
    }
    render() {
        let { email, password, actionStatus, isForgot } = this.state
        let isDone = email && actionStatus !== 1 && (isForgot ? true : password)
        return (
            <React.Fragment>
                <div className="container-fluid bg-dark vh-100 overflow-hidden p-0">
                    <div className="left-card-section">
                        <div className="left-logo">
                            <img className="align-content" src={logo} alt="MainLogo" />
                        </div>
                        <div className="company-information">
                            <h3>WE USE THE POWER OF DESIGN AND TECHNOLOGY TO CREATE TRANSFORMATIONAL CHANGE.</h3>
                            <p>Empower your digital transformation with a partner who works closely with you and your team to understand your business challenges and creates unprecedented mobile-first and innovative digital experiences to help solve them.</p>
                        </div>
                    </div>
                    <div className="right-card-section">
                        {/* <h2>Beatnik Login</h2> */}
                        <div className="login-form-area">
                            <Form onSubmit={this.submitHandler}>
                                <Form.Group>
                                    <Form.Label>Email<span>*</span></Form.Label>
                                    <Form.Control
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        name="email"
                                        defaultValue={email}
                                        onChange={this.changeHandler}
                                        required
                                    />
                                </Form.Group>

                                {!isForgot &&
                                    <Form.Group>
                                        <Form.Label>Password<span>*</span></Form.Label>
                                        <Form.Control
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                            name="password"
                                            defaultValue={password}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </Form.Group>}
                                <Button type="submit" className="sign-in-btn" disabled={!isDone} block>{actionStatus === 1 ? `Please Wait...` : (isForgot ? "Submit" : "Sign In")}</Button>
                            </Form>

                            <div className="forgot-password-area mt-3">
                                {!isForgot ?
                                    <p onClick={() => this.setState({ isForgot: true })}>Forgot Password?</p>
                                    : <p onClick={() => this.setState({ isForgot: false })}>Sign In</p>
                                }
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-lg-6 bg-white">
                            <h1>Company Info</h1>
                        </div>
                        <div className="col-lg-6">
                            <h1>Login Form</h1>
                        </div>
                    </div> */}
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { login, forgotPassword })(Login)