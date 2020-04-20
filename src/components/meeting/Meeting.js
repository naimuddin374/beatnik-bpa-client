import React, { Component, Fragment } from 'react'
import { deleteData } from '../../store/actions/meetingActions'
import { connect } from 'react-redux';
import Loading from './../layout/Loading';
import Table from 'react-bootstrap/Table'
import MeetingRoomBooked from './MeetingRoomBooked';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';
import "react-datepicker/dist/react-datepicker.css";

class Meeting extends Component {
    state = {
        // selectedDate: dateFormat(new Date(), "yyyy-mm-dd"),
        selectedDate: dateFormat(new Date(), "yyyy-mm-dd"),
    }
    dateChangeHandler = date => this.setState({ selectedDate: dateFormat(date, "yyyy-mm-dd") })
    render() {
        let { loading, selectedDate } = this.state

        let morning = [
            "09:00:00",
            "09:30:00",
            "10:00:00",
            "10:30:00",
            "11:00:00",
            "11:30:00",
            "12:00:00",
            "12:30:00",
        ]
        let afternoon = [
            "13:00:00",
            "13:30:00",
            "14:00:00",
            "14:30:00",
            "15:00:00",
            "15:30:00",
        ]

        let evening = [
            "16:00:00",
            "16:30:00",
            "17:00:00",
            "17:30:00",
            "18:00:00",
            "18:30:00",
        ]

        return (
            <Fragment>
                <div className="card">
                    <div className="card-header">
                        <strong className="card-title">Meeting Room Booking</strong>
                        <div className="float-right">
                            <Form.Group>
                                <Form.Label>Date<span>*</span></Form.Label>
                                <DatePicker
                                    className="form-control"
                                    selected={new Date(selectedDate)}
                                    onChange={this.dateChangeHandler}
                                    placeholder="Enter Date"
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="card-body">
                        {loading ? <Loading /> :
                            <div className="meeting-room-booking-area">
                                <strong className="card-title">Morning</strong>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th colSpan="2">9am - 10am</th>
                                            <th colSpan="2">10am - 11am</th>
                                            <th colSpan="2">11am - 12pm</th>
                                            <th colSpan="2">12pm - 1pm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <MeetingRoomBooked selectedDate={selectedDate} totalTime={morning} />
                                    </tbody>
                                </Table>

                                <br />
                                <strong className="card-title">Afternoon</strong>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th colSpan="2">1pm - 2pm</th>
                                            <th colSpan="2">2pm - 3pm</th>
                                            <th colSpan="2">3pm - 4pm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <MeetingRoomBooked selectedDate={selectedDate} totalTime={afternoon} />
                                    </tbody>
                                </Table>

                                <br />
                                <strong className="card-title">Evening</strong>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th colSpan="2">4pm - 5pm</th>
                                            <th colSpan="2">5pm - 6pm</th>
                                            <th colSpan="2">6pm - 7pm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <MeetingRoomBooked selectedDate={selectedDate} totalTime={evening} />
                                    </tbody>
                                </Table>
                            </div>}
                    </div>

                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { deleteData })(Meeting)