import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { storeData, updateData } from '../../store/actions/meetingActions';

import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { actionStatus } from '../../util/helper';
import { updateActionStatus } from '../../store/actions/commonActions';
import authUser from '../../util/authUser';
import TimePicker from 'react-time-picker';
import Axios from 'axios';
import { API_URL } from '../../store/actions/types';

class EntryForm extends Component {
    state = {
        id: "",
        date: this.props.selectedDate,
        start_time: "10:00:00",
        end_time: "10:30:00",
        status: 1,
        note: "",
        user_id: authUser().id,
        actionStatus: actionStatus()
    }
    UNSAFE_componentWillReceiveProps(props) {
        let addMinute = 30 * 60 * 1000;
        let date1 = new Date(this.state.date + ' ' + props.selectedTime);
        let date2 = new Date(date1.getTime() + addMinute);

        let hour = date2.getHours();
        let minute = date2.getMinutes();

        if (minute.toString().length < 2) {
            minute = '0' + minute
        }
        let end_time = hour + ':' + minute;
        if (props.actionType === 'EDIT') {
            // let start_time = props.editData.start_time
            // if (props.editData.start_time.toString().length > 5) {
            //     start_time = props.editData.start_time.slice(0, -3)
            // }
            this.setState({
                id: props.editData.id,
                date: props.selectedDate,
                start_time: props.editData.start_time,
                end_time: props.editData.end_time,
                status: props.editData.status,
                note: props.editData.note,
            })
        } else {
            this.setState({
                date: props.selectedDate,
                start_time: props.selectedTime,
                end_time
            })
        }
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    startTimeHandler = start_time => this.setState({ start_time })
    endTimeHandler = end_time => this.setState({ end_time })

    submitHandler = event => {
        event.preventDefault()
        let formData = this.state
        if (formData.start_time.toString().length === 5) {
            formData.start_time = formData.start_time + ':00'
        }
        if (formData.end_time.toString().length === 5) {
            formData.end_time = formData.end_time + ':00'
        }
        Axios.post(`${API_URL}api/meeting-room-availability`, { ...formData })
            .then(res => {
                let selData = res.data
                let isReady = true
                if (Object.keys(selData).length !== 0) {
                    let { start_time, end_time } = formData
                    selData.map(item => {
                        if ((start_time < item.start_time && end_time > item.start_time) || (end_time > item.start_time && end_time < item.end_time)) {
                            isReady = false
                        }
                    })
                }
                if (!isReady) {
                    alert('This time meeting room has been booked, please try another time.')
                } else {
                    if (this.props.actionType === 'ADD') {
                        this.props.storeData(formData)
                    } else if (this.props.actionType === 'EDIT') {
                        this.props.updateData(formData, formData.id)
                    }
                }
            })
            .catch(err => console.log('err', err))
        this.props.actionIsDone()
    }
    render() {
        let { id, date, start_time, end_time, status, note } = this.state
        let isDone = date && start_time && end_time && status && start_time < end_time
        console.log('data', this.state)
        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{id ? 'Edit Meeting' : 'Add New Meeting'}+{id} Date: {date}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group>
                                <Form.Label>Start Time<span>*</span></Form.Label>
                                <TimePicker
                                    className="form-control"
                                    value={start_time}
                                    onChange={this.startTimeHandler}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>End Time<span>*</span></Form.Label>
                                <TimePicker
                                    className="form-control"
                                    value={end_time}
                                    onChange={this.endTimeHandler}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Take Note</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="note"
                                    defaultValue={note}
                                    onChange={this.changeHandler}
                                    placeholder="Take a Short Note"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status<span>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-control"
                                    name="status"
                                    defaultValue={status}
                                    onChange={this.changeHandler}
                                >
                                    <option value="">Select One</option>
                                    <option value="1">Active</option>
                                    <option value="3">Done</option>
                                </Form.Control>
                            </Form.Group>
                            <Button type="submit" variant="dark" block disabled={!isDone}>Submit</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}
export default connect(null, { storeData, updateData, updateActionStatus })(EntryForm)