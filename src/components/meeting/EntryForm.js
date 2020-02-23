import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { storeData, updateData } from '../../store/actions/meetingActions';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { API_URL } from '../../store/actions/types';
import Axios from 'axios';
import { setEndTime } from '../../util/helper';
import AudienceSection from './AudienceSection';

class EntryForm extends Component {
    constructor(props) {
        super(props);
        let end_time = '';
        if (props.editData.id) {
            end_time = props.editData.end_time;
        } else {
            end_time = setEndTime(props.selectedTime);
        }
        this.state = {
            id: props.editData.id || null,
            date: props.editData.date || props.selectedDate,
            start_time: props.editData.start_time || props.selectedTime,
            end_time: end_time,
            status: props.editData.status || 1,
            note: props.editData.note || null,
            user_id: this.props.auth.user.id,
            actionStatus: 0,
            users: []
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.common.meetingRoomStatus) === JSON.stringify(prevState.actionStatus)) return null
        if (nextProps.common.meetingRoomStatus === 2) {
            nextProps.actionIsDone()
        }
        return {
            actionStatus: nextProps.common.meetingRoomStatus
        }
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    audienceHandler = event => {
        if (event === null) {
            this.setState({ users: [] })
        } else {
            let userId = event.map(item => {
                return item.value
            })
            this.setState({ users: userId })
        }
    }
    submitHandler = event => {
        event.preventDefault()
        Axios.post(`${API_URL}api/meeting-room-availability`, { ...this.state })
            .then(res => {
                let selData = res.data
                let isReady = true
                if (Object.keys(selData).length !== 0) {
                    let { start_time, end_time } = this.state
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
                        this.props.storeData(this.state)
                    } else if (this.props.actionType === 'EDIT') {
                        this.props.updateData(this.state, this.state.id)
                    }
                }
            })
            .catch(err => console.log('err', err))
    }
    render() {
        let { id, date, start_time, end_time, status, note } = this.state
        let isDone = date && start_time && end_time && status && start_time < end_time

        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{id ? 'Edit Meeting' : 'Add New Meeting'} Date: {date}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group>
                                <Form.Label>Start Time<span>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-control"
                                    name="start_time"
                                    defaultValue={start_time}
                                    onChange={this.changeHandler}
                                >
                                    <option value="">Select One</option>
                                    <option value="09:00:00">09:00 AM</option>
                                    <option value="09:30:00">90:30 AM</option>
                                    <option value="10:00:00">10:00 AM</option>
                                    <option value="10:30:00">10:30 AM</option>
                                    <option value="11:00:00">11:00 AM</option>
                                    <option value="11:30:00">11:30 AM</option>
                                    <option value="12:00:00">12:00 PM</option>
                                    <option value="12:30:00">12:30 PM</option>
                                    <option value="13:00:00">1:00 PM</option>
                                    <option value="13:30:00">1:30 PM</option>
                                    <option value="14:00:00">2:00 PM</option>
                                    <option value="14:30:00">2:30 PM</option>
                                    <option value="15:00:00">3:00 PM</option>
                                    <option value="15:30:00">3:30 PM</option>
                                    <option value="16:00:00">4:00 PM</option>
                                    <option value="16:30:00">4:30 PM</option>
                                    <option value="17:00:00">5:00 PM</option>
                                    <option value="17:30:00">5:30 PM</option>
                                    <option value="18:00:00">6:00 PM</option>
                                    <option value="18:30:00">6:30 PM</option>
                                    <option value="19:00:00">7:00 PM</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>End Time<span>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-control"
                                    name="end_time"
                                    defaultValue={end_time}
                                    onChange={this.changeHandler}
                                >
                                    <option value="">Select One</option>
                                    <option value="09:00:00">09:00 AM</option>
                                    <option value="09:30:00">90:30 AM</option>
                                    <option value="10:00:00">10:00 AM</option>
                                    <option value="10:30:00">10:30 AM</option>
                                    <option value="11:00:00">11:00 AM</option>
                                    <option value="11:30:00">11:30 AM</option>
                                    <option value="12:00:00">12:00 PM</option>
                                    <option value="12:30:00">12:30 PM</option>
                                    <option value="13:00:00">1:00 PM</option>
                                    <option value="13:30:00">1:30 PM</option>
                                    <option value="14:00:00">2:00 PM</option>
                                    <option value="14:30:00">2:30 PM</option>
                                    <option value="15:00:00">3:00 PM</option>
                                    <option value="15:30:00">3:30 PM</option>
                                    <option value="16:00:00">4:00 PM</option>
                                    <option value="16:30:00">4:30 PM</option>
                                    <option value="17:00:00">5:00 PM</option>
                                    <option value="17:30:00">5:30 PM</option>
                                    <option value="18:00:00">6:00 PM</option>
                                    <option value="18:30:00">6:30 PM</option>
                                    <option value="19:00:00">7:00 PM</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Meeting Agenda</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="note"
                                    defaultValue={note}
                                    onChange={this.changeHandler}
                                    placeholder="Meeting Agenda"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Audience Status</Form.Label>
                                <AudienceSection audienceHandler={this.audienceHandler} meetingId={id} />
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
const mapStateToProps = state => ({
    auth: state.auth,
    common: state.common,
})
export default connect(mapStateToProps, { storeData, updateData })(EntryForm)