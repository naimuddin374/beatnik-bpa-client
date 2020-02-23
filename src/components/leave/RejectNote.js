import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { leaveReject } from '../../store/actions/leaveActions'

import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { actionStatus } from '../../util/helper';
import { updateActionStatus } from './../../store/actions/commonActions';

class RejectNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.editData.id || null,
            note: props.editData.note || null,
            status: 2,
            actionStatus: 0,
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.common.leaveStatus) === JSON.stringify(prevState.actionStatus)) return null
        if (nextProps.common.leaveStatus === 2) {
            nextProps.actionIsDone()
        }
        return {
            actionStatus: nextProps.common.leaveStatus
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
    }
    render() {
        let { note } = this.state
        let isDone = note && actionStatus !== 1
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
export default connect(mapStateToProps, { leaveReject, updateActionStatus })(RejectNote)