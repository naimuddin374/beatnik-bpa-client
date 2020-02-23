import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { storeData, updateData } from '../../store/actions/departmentActions'

import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { updateActionStatus } from '../../store/actions/commonActions';


class EntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.editData.id || '',
            name: props.editData.name || '',
            actionStatus: 0
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.common.departmentStatus) === JSON.stringify(prevState.actionStatus)) return null
        if (nextProps.common.departmentStatus === 2) {
            nextProps.actionIsDone()
        }
        return {
            actionStatus: nextProps.common.departmentStatus
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
        let { id, name, actionStatus } = this.state
        let isDone = name && actionStatus !== 2
        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose} size="lg">
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
const mapStateToProps = state => ({
    common: state.common
})
export default connect(mapStateToProps, { storeData, updateData, updateActionStatus })(EntryForm)