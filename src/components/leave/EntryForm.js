import React from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { modalStyle } from '../../util/helper';
import { storeData, updateData } from '../../store/actions/leaveActions'
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';
import "react-datepicker/dist/react-datepicker.css";
import authUser from '../../util/authUser';
import Axios from 'axios';
import { API_URL } from '../../store/actions/types';


class EntryForm extends React.Component {
    state = {
        userInfo: []
    }
    UNSAFE_componentWillReceiveProps(props) {
        Modal.setAppElement('body');
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
        } else {
            this.setState({
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
        this.props.actionIsDone()
    }
    render() {
        let { id, type, start_date, end_date, total_day, purpose, note, userInfo } = this.state
        let isDone = type && start_date && end_date

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
                                <label>Leave Type <span>*</span></label>
                                <select
                                    className="form-control"
                                    name="type"
                                    defaultValue={type}
                                    onChange={this.changeHandler}
                                >
                                    <option value="0">Select One</option>
                                    <option value="1">Casual</option>
                                    <option value="2">Sick</option>
                                    <option value="3">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Purpose</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="purpose"
                                    defaultValue={purpose}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <p className="text-danger">{(Number(type) === 1 && `You have remaining leave ${casual_leave}`) || (Number(type) === 2 && `You have remaining leave ${sick_leave}`) || (Number(type) === 3 && `You already taken ${other_leave} leave`)}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Start Date <span>*</span></label><br />
                                <DatePicker
                                    className="form-control"
                                    selected={start_date}
                                    onChange={this.startDateChangeHandler}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>End Date <span>*</span></label><br />
                                <DatePicker
                                    className="form-control"
                                    selected={end_date}
                                    onChange={this.endDateChangeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Total Day <span>*</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="total_day"
                                    max={maxLeave}
                                    defaultValue={total_day}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Note</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="note"
                                    defaultValue={note}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8 text-center offset-lg-2">
                            <button type="submit" className="btn btn-primary btn-sm"
                                disabled={!isDone || (Number(total_day) > maxLeave)}><i className="fa fa-upload"></i> {id ? ' Save' : ' Submit'}</button>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}
export default connect(null, { storeData, updateData })(EntryForm)