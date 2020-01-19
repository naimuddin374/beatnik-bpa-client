import React from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { modalStyle } from '../../util/helper';
import { updateProfileInfo } from '../../store/actions/profileActions'
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from '../../store/actions/types';

class EditProfile extends React.Component {
    state = {}
    UNSAFE_componentWillReceiveProps(props) {
        Modal.setAppElement('body');
        this.setState({
            id: props.user.id,
            name: props.user.name,
            contact: props.user.contact,
            personal_email: props.user.personal_email,
            blood_group: props.user.blood_group,
            address: props.user.address,
            bio: props.user.bio,
            facebook: props.user.facebook,
            linkedin: props.user.linkedin,
            twitter: props.user.twitter,
            imgPath: props.user.image ? BASE_URL + props.user.image : '',
            date_of_birth: props.user.date_of_birth ? new Date(props.user.date_of_birth) : new Date(),
        })
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    dateChangeHandler = date => {
        this.setState({
            date_of_birth: date
        })
    }
    fileUploadHandler = event => {
        let reader = new FileReader()
        let _this = this
        reader.onload = function (r) {
            _this.setState({
                image: r.target.result,
                imgPath: r.target.result,
            });
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    submitHandler = event => {
        event.preventDefault()
        let data = {
            ...this.state
        }
        let { date_of_birth } = data
        data.date_of_birth = dateFormat(date_of_birth, "yyyy-mm-dd")
        this.props.updateProfileInfo({ ...data }, data.id)
        this.props.actionIsDone()
    }
    render() {
        let { id, name, contact, personal_email, date_of_birth, blood_group, address, imgPath, bio, facebook, linkedin, twitter } = this.state
        let isDone = name
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.isClose}
                style={modalStyle("800px")}
            >
                <button type="button" className="popup-close" onClick={this.props.isClose}>&times;</button>
                <h3 className="mb-2">Edit Information</h3>
                <hr />

                <form onSubmit={this.submitHandler}>
                    <div className="row mb-3">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <label htmlFor="image" className="bmd-label-floating">
                                    {imgPath && <img className="align-self-center rounded-circle mr-3" width="100" height="100" alt="ProfilePicture" src={imgPath} />}
                                </label><br />
                                <input type="file" id="image" onChange={this.fileUploadHandler} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
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
                        <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                                <label>Personal Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="personal_email"
                                    defaultValue={personal_email}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                                <label>Contact Number</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="contact"
                                    defaultValue={contact}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                                <label>Start Date <span>*</span></label><br />
                                <DatePicker
                                    className="form-control"
                                    selected={date_of_birth}
                                    onChange={this.dateChangeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    defaultValue={address}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                                <label>Blood Group</label>
                                <select
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
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>Biography</label>
                                <textarea
                                    rows="3"
                                    className="form-control"
                                    name="bio"
                                    defaultValue={bio}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-12">
                            <div className="form-group">
                                <label>Facebook Link</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="facebook"
                                    defaultValue={facebook}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="form-group">
                                <label>Linkedin Link</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="linkedin"
                                    defaultValue={linkedin}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="form-group">
                                <label>Twitter Link</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="twitter"
                                    defaultValue={twitter}
                                    onChange={this.changeHandler}
                                />
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
export default connect(null, { updateProfileInfo })(EditProfile)