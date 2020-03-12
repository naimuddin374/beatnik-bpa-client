import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { storeData, updateData } from '../../store/actions/conveyanceActions'

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
            note: props.editData.note || null,
            user_id: props.auth.user.id || null,
            amount: props.editData.amount || 0,
            status: props.editData.status || 0,
            date: props.editData.date || null,
            actionStatus: 0,
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.common.conveyanceStatus) === JSON.stringify(prevState.actionStatus)) return null
        if (nextProps.common.conveyanceStatus === 2) {
            nextProps.actionIsDone()
        }
        return {
            actionStatus: nextProps.common.conveyanceStatus
        }
    }
    dateHandler = date => this.setState({ date: dateFormat(date, "yyyy-mm-dd") })
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
        let { id, amount, note, date, actionStatus } = this.state
        let isDone = amount > 0 && note && actionStatus !== 1
        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{id ? 'Edit Conveyance' : 'Apply for Conveyance'} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group>
                                <Form.Label>Date<span>*</span></Form.Label>
                                <DatePicker
                                    className="form-control"
                                    selected={date ? new Date(date) : new Date()}
                                    onChange={this.dateHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Amount<span>*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    defaultValue={amount}
                                    onChange={this.changeHandler}
                                    placeholder="Enter Amount"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Purpose<span>*</span></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    className="form-control"
                                    name="note"
                                    defaultValue={note}
                                    onChange={this.changeHandler}
                                    placeholder="Enter Purpose"
                                />
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