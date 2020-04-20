import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { storeData, updateData } from '../../store/actions/projectActions'

import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';
import "react-datepicker/dist/react-datepicker.css";


class EntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.editData.id || null,
            name: props.editData.name || null,
            description: props.editData.description || null,
            dateline: props.editData.dateline || null,
            status: props.editData.status || 0,
            user_id: props.auth.user.id || null,
            actionStatus: 0,
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.common.projectStatus) === JSON.stringify(prevState.actionStatus)) return null
        if (nextProps.common.projectStatus === 2) {
            nextProps.actionIsDone()
        }
        return {
            actionStatus: nextProps.common.projectStatus
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
            this.props.storeData(this.state)
        } else if (this.props.actionType === 'EDIT') {
            this.props.updateData(this.state, this.state.id)
        }
    }
    render() {
        let { id, name, description, dateline, status, actionStatus } = this.state
        let isDone = name && description && status && actionStatus !== 1
        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{id ? 'Edit Project' : 'Add New Project'} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group>
                                <Form.Label>Name<span>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    defaultValue={name}
                                    onChange={this.changeHandler}
                                    placeholder="Enter Name"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    className="form-control"
                                    name="description"
                                    defaultValue={description}
                                    onChange={this.changeHandler}
                                    placeholder="Enter Description"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Dateline</Form.Label>
                                <DatePicker
                                    className="form-control"
                                    selected={dateline ? new Date(dateline) : null}
                                    onChange={(date) => this.setState({ dateline: dateFormat(date, "yyyy-mm-dd") })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status<span>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-control"
                                    name="status"
                                    value={status}
                                    onChange={this.changeHandler}
                                >
                                    <option value="">Select One</option>
                                    <option value="1">Pitch</option>
                                    <option value="2">Active</option>
                                    <option value="3">Completed</option>
                                    <option value="4">Archive</option>
                                </Form.Control>
                            </Form.Group>
                            <Button type="submit" variant="dark" block disabled={!isDone}>{actionStatus === 1 ? `Please Wait...` : `Submit`}</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    common: state.common,
    auth: state.auth,
})
export default connect(mapStateToProps, { storeData, updateData })(EntryForm)