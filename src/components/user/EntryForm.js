import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { storeData, updateData } from '../../store/actions/userActions'
import { API_URL } from '../../store/actions/types';
import Axios from 'axios'
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';
import "react-datepicker/dist/react-datepicker.css";

import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';


class EntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            users: [],
            id: props.editData.id || null,
            employee_id: props.editData.employee_id || null,
            department_id: props.editData.department_id || 0,
            supervisor_id: props.editData.supervisor_id || 0,
            role: props.editData.role || 1,
            type: props.editData.type || 1,
            casual_leave: Number(props.editData.casual_leave) || 10,
            sick_leave: Number(props.editData.sick_leave) || 10,
            name: props.editData.name || null,
            designation: props.editData.designation || null,
            email: props.editData.email || null,
            password: null,
            joining_date: props.editData.joining_date || null,
            end_date: props.editData.end_date || null,
            salary: props.editData.salary || 0,
            probation_period: props.editData.probation_period || null,
            probationPeriod: props.editData.probation_period ? 1 : 0,
            status: Number(props.editData.status) || 1,
            isContinue: Number(props.editData.status) === 1 ? true : false,
            actionStatus: 0
        }
        this.faceDepartment()
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.common.employeeStatus) === JSON.stringify(prevState.actionStatus)) return null
        if (nextProps.common.employeeStatus === 2) {
            nextProps.actionIsDone()
        }
        return {
            actionStatus: nextProps.common.employeeStatus
        }
    }
    faceDepartment = () => {
        Axios.get(`${API_URL}api/department`)
            .then(res => {
                this.setState({
                    departments: res.data
                })
            })
        Axios.get(`${API_URL}api/supervisor`)
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    joiningDateHandler = date => {
        this.setState({
            joining_date: dateFormat(date, "yyyy-mm-dd")
        })
    }
    endingDateHandler = date => {
        this.setState({ end_date: dateFormat(date, "yyyy-mm-dd") })
    }
    probationPeriodDateHandler = date => {
        this.setState({
            probation_period: dateFormat(date, "yyyy-mm-dd")
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
        let { departments, users, employee_id, department_id, supervisor_id, role, type, casual_leave, sick_leave, name, designation, email, password, joining_date, end_date, salary, status, id, isContinue, probation_period, probationPeriod, actionStatus } = this.state
        let isDone = name && role && type && designation && status && actionStatus !== 1
        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{id ? 'Edit Employee' : 'Add New Employee'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group>
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-control"
                                    name="department_id"
                                    onChange={this.changeHandler}
                                    value={department_id}
                                >
                                    <option value="">Select One</option>
                                    {Object.keys(departments).length !== 0 &&
                                        departments.map(item => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Supervisor</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-control"
                                    name="supervisor_id"
                                    value={supervisor_id}
                                    onChange={this.changeHandler}
                                >
                                    <option value="">Select One</option>
                                    {Object.keys(users).length !== 0 &&
                                        users.map(item => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role<span>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-control"
                                    name="role"
                                    value={role}
                                    onChange={this.changeHandler}
                                >
                                    <option value="">Select One</option>
                                    <option value="0">Select Role</option>
                                    <option value="1">Employee</option>
                                    <option value="2">HR</option>
                                    <option value="5">Account</option>
                                    <option value="3">Supervisor</option>
                                    <option value="4">Admin</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Type<span>*</span></Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-control"
                                    name="type"
                                    value={type}
                                    onChange={this.changeHandler}
                                >
                                    <option value="">Select One</option>
                                    <option value="1">Full Time</option>
                                    <option value="2">Part Time</option>
                                    <option value="3">Contact</option>
                                    <option value="4">Remote</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Casual Leave</Form.Label>
                                <Form.Control
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Casual Leave"
                                    name="casual_leave"
                                    defaultValue={casual_leave}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Sick Leave</Form.Label>
                                <Form.Control
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Sick Leave"
                                    name="sick_leave"
                                    defaultValue={sick_leave}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Employee ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Employee ID"
                                    name="employee_id"
                                    defaultValue={employee_id}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Designation<span>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Designation"
                                    name="designation"
                                    defaultValue={designation}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Full Name<span>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Full Name"
                                    name="name"
                                    defaultValue={name}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email<span>*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    name="email"
                                    defaultValue={email}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password<span>*</span></Form.Label>
                                <Form.Control
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    name="password"
                                    defaultValue={password}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Salary</Form.Label>
                                <Form.Control
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter salary"
                                    name="salary"
                                    defaultValue={salary}
                                    onChange={this.changeHandler}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Joining Date<span>*</span></Form.Label>
                                <DatePicker
                                    className="form-control"
                                    selected={joining_date ? new Date(joining_date) : new Date()}
                                    onChange={this.joiningDateHandler}
                                    placeholder="Enter Joining Date"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>End Date<span>*</span> </Form.Label>
                                <Form.Label><input type="checkbox" checked={isContinue} onChange={() => this.setState({ isContinue: !isContinue })} /> Continue</Form.Label>
                                {!isContinue &&
                                    <DatePicker
                                        className="form-control"
                                        selected={end_date ? new Date(end_date) : new Date()}
                                        onChange={this.endingDateHandler}
                                        placeholder="Enter End Date"
                                    />}
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
                                    <option value="1">Current</option>
                                    <option value="2">Former</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>If have probation period?</Form.Label><br />
                                <Form.Label><input type="checkbox" checked={probationPeriod} onChange={() => this.setState({ probationPeriod: !probationPeriod })} /> Yes</Form.Label>
                                {probationPeriod === true &&
                                    <DatePicker
                                        className="form-control"
                                        selected={probation_period ? new Date(probation_period) : new Date()}
                                        onChange={this.probationPeriodDateHandler}
                                    />}
                            </Form.Group>

                            <Button type="submit" block variant="dark" disabled={!isDone}>{actionStatus === 1 ? `Please Wait...` : `Submit`}</Button>
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
export default connect(mapStateToProps, { storeData, updateData })(EntryForm)