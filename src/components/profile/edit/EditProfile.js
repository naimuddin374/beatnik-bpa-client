import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { updateProfileInfo } from '../../../store/actions/profileActions'
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';
import "react-datepicker/dist/react-datepicker.css";

import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { updateActionStatus } from '../../../store/actions/commonActions';

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.user.id || '',
            name: props.user.name || '',
            contact: props.user.contact || '',
            personal_email: props.user.personal_email || '',
            blood_group: props.user.blood_group || '',
            address: props.user.address || '',
            bio: props.user.bio || '',
            facebook: props.user.facebook || '',
            linkedin: props.user.linkedin || '',
            twitter: props.user.twitter || '',
            date_of_birth: props.user.date_of_birth ? new Date(props.user.date_of_birth) : new Date(),
            actionStatus: 0
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.common.profileEditStatus) === JSON.stringify(prevState.actionStatus)) return null
        if (nextProps.common.profileEditStatus === 2) {
            nextProps.actionIsDone()
        }
        return {
            actionStatus: nextProps.common.profileEditStatus
        }
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    dateChangeHandler = date_of_birth => this.setState({ date_of_birth })
    submitHandler = event => {
        event.preventDefault()
        let data = {
            ...this.state
        }
        let { date_of_birth } = data
        data.date_of_birth = dateFormat(date_of_birth, "yyyy-mm-dd")
        this.props.updateProfileInfo({ ...data }, data.id)
    }
    render() {
        let { name, contact, personal_email, date_of_birth, blood_group, address, bio, actionStatus } = this.state
        let isDone = name && contact && actionStatus !== 1
        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group>
                                <Form.Label>Full Name<span>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    defaultValue={name}
                                    onChange={this.changeHandler}
                                    placeholder="Enter Full Name"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Personal Email </Form.Label>
                                <Form.Control
                                    type="email"
                                    className="form-control"
                                    name="personal_email"
                                    defaultValue={personal_email}
                                    onChange={this.changeHandler}
                                    placeholder="Enter Email Address"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contact Number<span>*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    className="form-control"
                                    name="contact"
                                    defaultValue={contact}
                                    onChange={this.changeHandler}
                                    placeholder="Enter Contact Number"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Date of Birth<span>*</span></Form.Label>
                                <DatePicker
                                    className="form-control"
                                    selected={date_of_birth}
                                    onChange={this.dateChangeHandler}
                                    placeholder="Date of Birth"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    defaultValue={address}
                                    onChange={this.changeHandler}
                                    placeholder="Enter Address"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Blood Group</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-control"
                                    name="blood_group"
                                    defaultValue={blood_group}
                                    onChange={this.changeHandler}
                                >
                                    <option value="">Select One</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Biography</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="4"
                                    className="form-control"
                                    name="bio"
                                    defaultValue={bio}
                                    onChange={this.changeHandler}
                                    placeholder="Enter Biography"
                                />
                            </Form.Group>
                            {/* <Form.Group>
                                <Form.Label>Facebook Link</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="facebook"
                                    defaultValue={facebook}
                                    onChange={this.changeHandler}
                                    placeholder="Enter Facebook Profile Link"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>linkedin Link</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="linkedin"
                                    defaultValue={linkedin}
                                    onChange={this.changeHandler}
                                    placeholder="Enter linkedin Profile Link"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Twitter Link</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="twitter"
                                    defaultValue={twitter}
                                    onChange={this.changeHandler}
                                    placeholder="Enter twitter Profile Link"
                                />
                            </Form.Group> */}
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
export default connect(mapStateToProps, { updateProfileInfo, updateActionStatus })(EditProfile)