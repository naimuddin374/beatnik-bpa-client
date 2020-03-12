import React from 'react'
import { connect } from 'react-redux'
import { resetPassword } from '../../store/actions/authActions'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../assets/images/logo.png';
import './Style.css';
import { Link } from 'react-router-dom';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userKey: props.match.params.key,
            password: "",
            confirmPassword: "",
            actionStatus: 0,
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.auth.resetStatus) === JSON.stringify(prevState.actionStatus)) return null
        if (nextProps.auth.resetStatus === 2) {
            nextProps.history.push('/')
        }
        return {
            actionStatus: nextProps.auth.resetStatus,
        }
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = event => {
        event.preventDefault()
        this.props.resetPassword(this.state)
    }
    render() {
        let { password, confirmPassword, actionStatus } = this.state
        let isDone = password && confirmPassword && (password === confirmPassword) && actionStatus !== 1
        return (
            <React.Fragment>
                <div className="container-fluid bg-dark vh-100 overflow-hidden">
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
                        <h2>Reset Password</h2>
                        <div className="login-form-area">
                            <Form onSubmit={this.submitHandler}>
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
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Confirm Password<span>*</span></Form.Label>
                                    <Form.Control
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter Confirm Password"
                                        name="confirmPassword"
                                        defaultValue={confirmPassword}
                                        onChange={this.changeHandler}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" className="sign-in-btn" disabled={!isDone} block>{actionStatus === 1 ? `Please Wait...` : `Submit`}</Button>
                            </Form>

                            <div className="forgot-password-area">
                                <Link to="/" >Got to Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { resetPassword })(ResetPassword)