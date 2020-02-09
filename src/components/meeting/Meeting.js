import React, { Component, Fragment } from 'react'
import { deleteData } from '../../store/actions/meetingActions'
import { connect } from 'react-redux';
import Loading from './../layout/Loading';
import Table from 'react-bootstrap/Table'
import MeetingRoomBooked from './MeetingRoomBooked';
import { Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';
import "react-datepicker/dist/react-datepicker.css";

class Meeting extends Component {
    state = {
        selectedDate: dateFormat(new Date(), "yyyy-mm-dd")
    }
    dateChangeHandler = date => this.setState({ selectedDate: dateFormat(date, "yyyy-mm-dd") })
    render() {
        let { loading, selectedDate } = this.state
        return (
            <Fragment>
                <div className="content">
                    <div className="animated fadeIn">
                        <div className="row">

                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <strong className="card-title">Meeting</strong>
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
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th colSpan="2">10am - 11am</th>
                                                            <th colSpan="2">11am - 12pm</th>
                                                            <th colSpan="2">12pm - 1pm</th>
                                                            <th colSpan="2">1pm - 2pm</th>
                                                            <th colSpan="2">2pm - 3pm</th>
                                                            <th colSpan="2">3pm - 4pm</th>
                                                            <th colSpan="2">4pm - 5pm</th>
                                                            <th colSpan="2">5pm - 6pm</th>
                                                            <th colSpan="2">6pm - 7pm</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <MeetingRoomBooked selectedDate={selectedDate} />
                                                    </tbody>
                                                </Table>
                                            </div>}
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default connect(null, { deleteData })(Meeting)