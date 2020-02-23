import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { storeData, updateData } from '../../store/actions/leaveActions'
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
import { API_URL } from '../../store/actions/types';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';


class EntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: [],
            id: props.editData.id || null,
            user_id: props.auth.user.id,
            supervisor_id: props.editData.supervisor_id || 0,
            type: props.editData.type || 1,
            start_date: props.editData.start_date || null,
            end_date: props.editData.end_date || null,
            total_day: props.editData.total_day || 1,
            purpose: props.editData.purpose || null,
            note: props.editData.note || null,
            status: props.editData.status || 0,
            authUser: props.auth.user,
            actionStatus: 0,
        }
        this.faceData()
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
    faceData = () => {
        Axios.get(`${API_URL}api/user/${this.state.authUser.id}`)
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
        this.setState({ start_date: dateFormat(date, "yyyy-mm-dd") })
    }
    endDateChangeHandler = date => {
        this.setState({ end_date: dateFormat(date, "yyyy-mm-dd") })
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
        let { type, start_date, end_date, total_day, purpose, note, userInfo, actionStatus } = this.state
        let isDone = type && start_date && end_date && actionStatus !== 1

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
                <Modal show={this.props.isOpen} onHide={this.props.isClose} size="lg">
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
                                    value={type}
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
                                    selected={start_date ? new Date(start_date) : null}
                                    minDate={new Date()}
                                    onChange={this.startDateChangeHandler}
                                    placeholder="From"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>To<span>*</span></Form.Label>
                                <DatePicker
                                    className="form-control"
                                    minDate={start_date ? new Date(start_date) : new Date()}
                                    selected={end_date ? new Date(end_date) : null}
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
                            <Button type="submit" block variant="dark" disabled={!isDone || (Number(total_day) > maxLeave)}>{actionStatus === 1 ? `Please Wait...` : `Submit`}</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    common: state.common
})
export default connect(mapStateToProps, { storeData, updateData })(EntryForm)