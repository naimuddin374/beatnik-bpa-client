import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { updatePassword } from '../../store/actions/profileActions'
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { actionStatus } from '../../util/helper';

class ChangePassword extends Component {
    state = {
        currentPassword: '',
        password: '',
        confirmPassword: '',
        actionStatus: actionStatus()
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = event => {
        event.preventDefault()
        this.props.updatePassword(this.state, this.props.user.id)
        setInterval(() => {
            if (actionStatus() === 4) {
                this.props.isClose()
            } else {
                this.setState({
                    actionStatus: actionStatus()
                })
            }
        }, 500)
    }
    render() {
        let { currentPassword, password, confirmPassword, actionStatus } = this.state
        let isDone = currentPassword && password && confirmPassword && (password === confirmPassword) && actionStatus !== 2
        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Your Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group>
                                <Form.Label>Enter Current Password<span>*</span></Form.Label>
                                <Form.Control
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Current Password"
                                    name="currentPassword"
                                    defaultValue={currentPassword}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Enter New Password<span>*</span></Form.Label>
                                <Form.Control
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter New Password"
                                    name="password"
                                    defaultValue={password}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Enter Confirm Password<span>*</span></Form.Label>
                                <Form.Control
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Confirm Password"
                                    name="confirmPassword"
                                    defaultValue={confirmPassword}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Button type="submit" block variant="dark" disabled={!isDone}>{actionStatus === 2 ? `Please Wait...` : `Submit`}</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}
export default connect(null, { updatePassword })(ChangePassword)