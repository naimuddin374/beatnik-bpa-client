import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { storeData, updateData } from '../../store/actions/leaveActions'
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';
import "react-datepicker/dist/react-datepicker.css";
import authUser from '../../util/authUser';
import Axios from 'axios';
import { API_URL } from '../../store/actions/types';

import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { actionStatus } from '../../util/helper';
import { updateActionStatus } from './../../store/actions/commonActions';

class EntryForm extends Component {
    state = {
        userInfo: [],
        id: "",
        user_id: authUser().id,
        supervisor_id: 1,
        type: 1,
        start_date: new Date(),
        end_date: new Date(),
        total_day: 1,
        purpose: "",
        note: "",
        status: 0,
        actionStatus: actionStatus()
    }
    UNSAFE_componentWillReceiveProps(props) {
        if (props.actionType === 'EDIT') {
            this.setState({
                id: props.editData.id,
                type: props.editData.type,
                start_date: new Date(props.editData.start_date),
                end_date: new Date(props.editData.end_date),
                total_day: props.editData.total_day,
                purpose: props.editData.purpose,
                note: props.editData.note,
                status: 0,
            })
        }
    }
    componentDidMount() {
        Axios.get(`${API_URL}api/user/${authUser().id}`)
            .then(res => {
                this.setState({
                    userInfo: res.data
                })
            })
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    startDateChangeHandler = date => {
        this.setState({
            start_date: date
        })
    }
    endDateChangeHandler = date => {
        this.setState({
            end_date: date
        })
    }
    submitHandler = event => {
        event.preventDefault()
        let data = {
            ...this.state
        }
        let { start_date, end_date } = data
        data.start_date = dateFormat(start_date, "yyyy-mm-dd")
        data.end_date = dateFormat(end_date, "yyyy-mm-dd")

        if (this.props.actionType === 'ADD') {
            this.props.storeData({ ...data })
        } else if (this.props.actionType === 'EDIT') {
            this.props.updateData({ ...data }, data.id)
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
        let { type, start_date, end_date, total_day, purpose, note, userInfo, actionStatus } = this.state
        let isDone = type && start_date && end_date && actionStatus !== 2

        let casual_leave = 0;
        let sick_leave = 0;
        let other_leave = 0;

        let maxLeave = 15;
        if (userInfo[0]) {
            casual_leave = userInfo[0].casual_leave;
            sick_leave = userInfo[0].sick_leave;
            other_leave = userInfo[0].other_leave;

            if (Number(type) === 1) {
                maxLeave = userInfo[0].casual_leave;
            } else if (Number(type) === 2) {
                maxLeave = userInfo[0].sick_leave;
            }
        }

        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Leave Apply</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <p className="text-danger">{(Number(type) === 1 && `You have remaining leave ${casual_leave}`) || (Number(type) === 2 && `You have remaining leave ${sick_leave}`) || (Number(type) === 3 && `You already taken ${other_leave} leave`)}</p>
                                </div>
                            </div>

                            <Form.Group>
                                <Form.Label>Leave Type<span>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-control"
                                    name="type"
                                    defaultValue={type}
                                    onChange={this.changeHandler}
                                >
                                    <option value="0">Select One</option>
                                    <option value="1">Casual</option>
                                    <option value="2">Sick</option>
                                    <option value="3">Other</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Purpose</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Purpose"
                                    name="purpose"
                                    defaultValue={purpose}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>From<span>*</span></Form.Label>
                                <DatePicker
                                    className="form-control"
                                    selected={start_date}
                                    onChange={this.startDateChangeHandler}
                                    placeholder="From"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>To<span>*</span></Form.Label>
                                <DatePicker
                                    className="form-control"
                                    selected={end_date}
                                    onChange={this.endDateChangeHandler}
                                    placeholder="To"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Total Day <span>*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Total Day"
                                    name="total_day"
                                    max={maxLeave}
                                    defaultValue={total_day}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Note</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Note"
                                    name="note"
                                    defaultValue={note}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Button type="submit" block variant="dark" disabled={!isDone || (Number(total_day) > maxLeave)}>{actionStatus === 2 ? `Please Wait...` : `Submit`}</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}
export default connect(null, { storeData, updateData, updateActionStatus })(EntryForm)