import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { storeData, updateData } from '../../store/actions/departmentActions'

import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { actionStatus } from '../../util/helper';
import { updateActionStatus } from '../../store/actions/commonActions';


class EntryForm extends Component {
    state = {
        id: "",
        name: "",
        actionStatus: actionStatus()
    }
    UNSAFE_componentWillReceiveProps(props) {
        if (props.actionType === 'EDIT') {
            this.setState({
                id: props.editData.id,
                name: props.editData.name,
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
        if (this.props.actionType === 'ADD') {
            this.props.storeData({ ...this.state })
        } else if (this.props.actionType === 'EDIT') {
            this.props.updateData({ ...this.state }, this.state.id)
        }
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
        let { id, name, actionStatus } = this.state
        let isDone = name && actionStatus !== 2
        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{id ? 'Edit Department' : 'Add New Department'} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group>
                                <Form.Label>Department Name<span>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    defaultValue={name}
                                    onChange={this.changeHandler}
                                    placeholder="Enter Department Name"
                                />
                            </Form.Group>
                            <Button type="submit" variant="dark" block disabled={!isDone}>{actionStatus === 2 ? `Please Wait...` : `Submit`}</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}
export default connect(null, { storeData, updateData, updateActionStatus })(EntryForm)