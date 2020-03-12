import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../store/actions/authActions'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../assets/images/logo.png';

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        actionStatus: 0
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.auth.status) === JSON.stringify(prevState.actionStatus)) return null
        if (nextProps.auth.status === 2) {
            nextProps.history.push('/')
        }
        return {
            actionStatus: nextProps.auth.status,
        }
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = event => {
        event.preventDefault()
        this.props.login(this.state)
    }
    render() {
        let { email, password, actionStatus } = this.state
        let isDone = email && password && actionStatus !== 1
        return (
            <React.Fragment>
                <div className="container-fluid bg-dark vh-100 section-padding overflow-hidden">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <img className="align-content" src={logo} alt="MainLogo" />
                            </div>
                        </div>
                    </div>

                    <div className="row section-padding-top">
                        <div className="col-lg-4 offset-4">
                            <div className="text-center">
                                <div className="input-form-area">
                                    <Form onSubmit={this.submitHandler}>
                                        <Form.Group>
                                            <Form.Label>Email address<span>*</span></Form.Label>
                                            <Form.Control
                                                type="email"
                                                className="form-control"
                                                placeholder="Email address"
                                                name="email"
                                                defaultValue={email}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password<span>*</span></Form.Label>
                                            <Form.Control
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                name="password"
                                                defaultValue={password}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Group>
                                        <Button type="submit" variant="light" disabled={!isDone} block>{actionStatus === 1 ? `Please Wait...` : `Sign In`}</Button>
                                    </Form>
                                </div>
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
export default connect(mapStateToProps, { login })(Login)