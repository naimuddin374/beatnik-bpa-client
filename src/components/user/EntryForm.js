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
import { actionStatus } from '../../util/helper';
import { updateActionStatus } from './../../store/actions/commonActions';


class EntryForm extends Component {
    state = {
        departments: [],
        users: [],
        id: null,
        employee_id: null,
        department_id: 0,
        supervisor_id: 0,
        role: 1,
        type: 1,
        casual_leave: 10,
        sick_leave: 10,
        name: null,
        designation: null,
        email: null,
        password: null,
        joining_date: new Date(),
        end_date: new Date(),
        isContinue: 0,
        salary: 0,
        probationPeriod: 0,
        probation_period: new Date(),
        status: 1,
        actionStatus: actionStatus()
    }
    UNSAFE_componentWillReceiveProps(props) {
        // Modal.setAppElement('body');
        if (props.actionType === 'EDIT') {
            this.setState({
                id: props.editData.id,
                employee_id: props.editData.employee_id,
                department_id: props.editData.department_id,
                supervisor_id: props.editData.supervisor_id,
                role: props.editData.role,
                type: props.editData.type,
                casual_leave: props.editData.casual_leave,
                sick_leave: props.editData.sick_leave,
                name: props.editData.name,
                designation: props.editData.designation,
                email: props.editData.email,
                password: null,
                joining_date: new Date(props.editData.joining_date),
                end_date: new Date(props.editData.end_date),
                isContinue: props.editData.status === 1 ? 1 : 0,
                salary: props.editData.salary,
                probation_period: props.editData.probation_period,
                status: props.editData.status,
                probationPeriod: props.editData.probation_period ? 1 : 0,
            })
        }
        this.faceDepartment()
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
    joiningDateHandler = joining_date => this.setState({ joining_date })
    endingDateHandler = end_date => this.setState({ end_date })
    probationPeriodDateHandler = probation_period => this.setState({ probation_period })
    submitHandler = event => {
        event.preventDefault()
        let data = {
            ...this.state
        }
        let { joining_date, end_date } = data
        data.joining_date = dateFormat(joining_date, "yyyy-mm-dd")
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
        let { departments, users, employee_id, department_id, supervisor_id, role, type, casual_leave, sick_leave, name, designation, email, password, joining_date, end_date, salary, status, id, isContinue, probation_period, probationPeriod, actionStatus } = this.state
        let isDone = name && role && type && designation && status && actionStatus !== 2
        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose}>
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
                                    defaultValue={department_id}
                                    onChange={this.changeHandler}
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
                                    defaultValue={supervisor_id}
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
                                    defaultValue={role}
                                    onChange={this.changeHandler}
                                >
                                    <option value="">Select One</option>
                                    <option value="0">Select Role</option>
                                    <option value="1">Employee</option>
                                    <option value="2">HR</option>
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
                                    defaultValue={type}
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
                                    selected={joining_date}
                                    onChange={this.joiningDateHandler}
                                    placeholder="Enter Joining Date"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>End Date<span>*</span></Form.Label>
                                <Form.Label><input type="checkbox" checked={isContinue} onChange={() => this.setState({ isContinue: !isContinue })} /> Continue</Form.Label>
                                <DatePicker
                                    className="form-control"
                                    selected={end_date}
                                    onChange={this.endingDateHandler}
                                    placeholder="Enter End Date"
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
                                    <option value="1">Current</option>
                                    <option value="2">Former</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>If have probation period?</Form.Label><br />
                                <Form.Label><input type="checkbox" checked={probationPeriod} onChange={() => this.setState({ probationPeriod: !probationPeriod })} /> No</Form.Label>
                                {!probationPeriod &&
                                    <DatePicker
                                        className="form-control"
                                        selected={probation_period}
                                        onChange={this.probationPeriodDateHandler}
                                    />}
                            </Form.Group>

                            <Button type="submit" block variant="dark" disabled={!isDone}>{actionStatus === 2 ? `Please Wait...` : `Submit`}</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}
export default connect(null, { storeData, updateData, updateActionStatus })(EntryForm)