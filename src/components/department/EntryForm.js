import React from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { modalStyle } from '../../util/helper';
import { storeData, updateData } from '../../store/actions/departmentActions'

class EntryForm extends React.Component {
    state = {}
    UNSAFE_componentWillReceiveProps(props) {
        Modal.setAppElement('body');
        if (props.actionType === 'EDIT') {
            this.setState({
                id: props.editData.id,
                name: props.editData.name,
            })
        } else {
            this.setState({
                id: "",
                name: "",
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
        if (this.props.actionType === 'ADD') {
            this.props.storeData({ ...this.state })
        } else if (this.props.actionType === 'EDIT') {
            this.props.updateData({ ...this.state }, this.state.id)
        }
        this.props.actionIsDone()
    }
    render() {
        let { id, name } = this.state
        let isDone = name
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.isClose}
                style={modalStyle()}
            >
                <button type="button" className="popup-close" onClick={this.props.isClose}>&times;</button>
                <h3 className="mb-2">{id ? 'Edit Data' : 'Add New'} </h3>
                <hr />

                <form onSubmit={this.submitHandler}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    defaultValue={name}
                                    onChange={this.changeHandler}
                                    placeholder="Enter Name"
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
export default connect(null, { storeData, updateData })(EntryForm)