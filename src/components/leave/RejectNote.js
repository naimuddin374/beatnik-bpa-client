import React from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { modalStyle } from '../../util/helper';
import { leaveReject } from '../../store/actions/leaveActions'


class RejectNote extends React.Component {
    state = {}
    UNSAFE_componentWillReceiveProps(props) {
        Modal.setAppElement('body');
        if (props.actionType === 'EDIT') {
            this.setState({
                id: props.editData.id,
                note: props.editData.note,
                status: 2,
            })
        } else {
            this.setState({
                id: "",
                note: "",
                status: 2,
            })
        }
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = event => {
        event.preventDefault()
        this.props.leaveReject({ ...this.state }, this.state.id)
        this.props.actionIsDone()
    }
    render() {
        let { id, note } = this.state
        let isDone = note
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.isClose}
                style={modalStyle("600px")}
            >
                <button type="button" className="popup-close" onClick={this.props.isClose}>&times;</button>
                <h3 className="mb-2">{id ? 'Leave Reject' : 'Add New'} </h3>
                <hr />
                <form onSubmit={this.submitHandler}>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>Enter Note <span>*</span></label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="note"
                                    rows="6"
                                    defaultValue={note}
                                    onChange={this.changeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8 text-center offset-lg-2">
                            <button type="submit" className="btn btn-primary btn-sm"
                                disabled={!isDone}><i className="fa fa-upload"></i> {id ? ' Confirm' : ' Submit'}</button>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}
export default connect(null, { leaveReject })(RejectNote)