import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { updatePassword } from '../../store/actions/profileActions'
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            password: '',
            confirmPassword: '',
            actionStatus: 0
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.common.passUpdateStatus) === JSON.stringify(prevState.actionStatus)) return null
        if (nextProps.common.passUpdateStatus === 2) {
            nextProps.isClose()
        }
        return {
            actionStatus: nextProps.common.passUpdateStatus
        }
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = event => {
        event.preventDefault()
        this.props.updatePassword(this.state, this.props.user.id)
    }
    render() {
        let { currentPassword, password, confirmPassword, actionStatus } = this.state
        let isDone = currentPassword && password && confirmPassword && (password === confirmPassword) && actionStatus !== 1
        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose} size="lg">
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
                            <Button type="submit" block variant="dark" disabled={!isDone}>{actionStatus === 1 ? `Please Wait...` : `Submit`}</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    common: state.common
})
export default connect(mapStateToProps, { updatePassword })(ChangePassword)