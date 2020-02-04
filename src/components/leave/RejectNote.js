import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { leaveReject } from '../../store/actions/leaveActions'

import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { actionStatus } from '../../util/helper';
import { updateActionStatus } from './../../store/actions/commonActions';

class RejectNote extends Component {
    state = {
        id: "",
        note: "",
        status: 2,
        actionStatus: actionStatus()
    }
    UNSAFE_componentWillReceiveProps(props) {
        if (props.actionType === 'EDIT') {
            this.setState({
                id: props.editData.id,
                note: props.editData.note,
                status: 2,
            })
        }
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = event => {
        event.preventDefault()
        this.props.leaveReject({ ...this.state }, this.state.id)
        setInterval(() => {
            if (actionStatus() === 4) {
                this.props.updateActionStatus(1)
                this.props.actionIsDone()
            } else {
                this.setState({
                    actionStatus: actionStatus()
                })
            }
        }, 500)
    }
    render() {
        let { note } = this.state
        let isDone = note && actionStatus !== 2
        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reject Leave</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group>
                                <Form.Label>Reject Note<span>*</span></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="6"
                                    className="form-control"
                                    placeholder="Enter Reject Note"
                                    name="note"
                                    defaultValue={note}
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
export default connect(null, { leaveReject, updateActionStatus })(RejectNote)