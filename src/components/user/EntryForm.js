import React from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { modalStyle } from '../../util/helper';
import { storeData, updateData } from '../../store/actions/userActions'
import { API_URL } from '../../store/actions/types';
import Axios from 'axios'
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';
import "react-datepicker/dist/react-datepicker.css";


class EntryForm extends React.Component {
    state = {
        departments: [],
        users: []
    }
    UNSAFE_componentWillReceiveProps(props) {
        Modal.setAppElement('body');
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
        } else {
            this.setState({
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
    joiningDateChangeHandler = date => {
        this.setState({
            joining_date: date
        })
    }
    endingDateChangeHandler = date => {
        this.setState({
            end_date: date
        })
    }
    probationPeriodDateChangeHandler = date => {
        this.setState({
            probation_period: date
        })
    }
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
        this.props.actionIsDone()
    }
    render() {
        let { departments, users, employee_id, department_id, supervisor_id, role, type, casual_leave, sick_leave, name, designation, email, password, joining_date, end_date, salary, status, id, isContinue, probation_period, probationPeriod } = this.state
        let isDone = name
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.isClose}
                style={modalStyle("800px")}
            >
                <button type="button" className="popup-close" onClick={this.props.isClose}>&times;</button>
                <h3 className="mb-2">{id ? 'Edit Data' : 'Add New'} </h3>
                <hr />

                <form onSubmit={this.submitHandler}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Department <span>*</span></label>
                                <select
                                    className="form-control"
                                    name="department_id"
                                    defaultValue={department_id}
                                    onChange={this.changeHandler}
                                >
                                    <option value="0">Select One</option>
                                    {Object.keys(departments).length !== 0 &&
                                        departments.map(item => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Supervisor</label>
                                <select
                                    className="form-control"
                                    name="supervisor_id"
                                    defaultValue={supervisor_id}
                                    onChange={this.changeHandler}
                                >
                                    <option value="0">Select One</option>
                                    {Object.keys(users).length !== 0 &&
                                        users.map(item => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Role <span>*</span></label>
                                <select
                                    className="form-control"
                                    name="role"
                                    defaultValue={role}
                                    onChange={this.changeHandler}
                                >
                                    <option value="0">Select Role</option>
                                    <option value="1">Employee</option>
                                    <option value="2">HR</option>
                                    <option value="3">Supervisor</option>
                                    <option value="4">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Type <span>*</span></label>
                                <select
                                    className="form-control"
                                    name="type"
                                    defaultValue={type}
                                    onChange={this.changeHandler}
                                >
                                    <option value="0">Select Type</option>
                                    <option value="1">Full Time</option>
                                    <option value="2">Part Time</option>
                                    <option value="3">Contact</option>
                                    <option value="4">Remote</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Casual Leave <span>*</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="casual_leave"
                                    defaultValue={casual_leave}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Sick Leave <span>*</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="sick_leave"
                                    defaultValue={sick_leave}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Employee ID <span>*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="employee_id"
                                    defaultValue={employee_id}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Designation <span>*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="designation"
                                    defaultValue={designation}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Name <span>*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    defaultValue={name}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Email <span>*</span></label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    defaultValue={email}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Password <span>*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    defaultValue={password}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Salary <span>*</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="salary"
                                    defaultValue={salary}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Joining Date <span>*</span></label><br />
                                <DatePicker
                                    className="form-control"
                                    selected={joining_date}
                                    onChange={this.joiningDateChangeHandler}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>End Date <span>*</span></label><br />
                                <label><input type="checkbox" checked={isContinue} onChange={() => this.setState({ isContinue: !isContinue })} /> Continue</label>
                                {!isContinue &&
                                    <DatePicker
                                        className="form-control"
                                        selected={end_date}
                                        onChange={this.endingDateChangeHandler}
                                    />
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Status <span>*</span></label>
                                <select
                                    className="form-control"
                                    name="status"
                                    defaultValue={status}
                                    onChange={this.changeHandler}
                                >
                                    <option value="0">Select Status</option>
                                    <option value="1">Current</option>
                                    <option value="2">Former</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label><input type="checkbox" checked={probationPeriod} onChange={() => this.setState({ probationPeriod: !probationPeriod })} /> No</label><br />
                                <label>If have probation period</label><br />
                                {!probationPeriod &&
                                    <DatePicker
                                        className="form-control"
                                        selected={probation_period}
                                        onChange={this.probationPeriodDateChangeHandler}
                                    />
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8 text-center offset-lg-2">
                            <button type="submit" className="btn btn-primary btn-sm"
                                disabled={!isDone}><i className="fa fa-upload"></i> {id ? ' Save' : ' Submit'}</button>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}
export default connect(null, { storeData, updateData })(EntryForm)