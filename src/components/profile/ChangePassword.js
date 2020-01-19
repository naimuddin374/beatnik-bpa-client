import React from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { modalStyle } from '../../util/helper';
import { updatePassword } from '../../store/actions/profileActions'

class ChangePassword extends React.Component {
    state = {}
    UNSAFE_componentWillReceiveProps(props) {
        Modal.setAppElement('body');
        this.setState({
            id: props.user.id,
            current_password: '',
            password: '',
            confirmPassword: '',
        })
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = event => {
        event.preventDefault()
        this.props.updatePassword(this.state, this.state.id)
        this.props.isClose()
    }
    render() {
        let { current_password, password, confirmPassword } = this.state
        let isDone = current_password && password && confirmPassword && (password === confirmPassword)
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.isClose}
                style={modalStyle("400px")}
            >
                <button type="button" className="popup-close" onClick={this.props.isClose}>&times;</button>
                <h3 className="mb-2">Change Password </h3>
                <hr />

                <form onSubmit={this.submitHandler}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>Enter Current Password <span>*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="current_password"
                                    defaultValue={current_password}
                                    onChange={this.changeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label>Enter New Password <span>*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    defaultValue={password}
                                    onChange={this.changeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label>Enter Confirm Password <span>*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    defaultValue={confirmPassword}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8 text-center offset-lg-2">
                            <button type="submit" className="btn btn-primary btn-sm"
                                disabled={!isDone}><i className="fa fa-upload"></i> Save</button>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}
export default connect(null, { updatePassword })(ChangePassword)