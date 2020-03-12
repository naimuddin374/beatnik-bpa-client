import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { API_URL } from '../../../store/actions/types';
import { updateUserProfilePhoto } from '../../../store/actions/profileActions';

class UpdateProfilePhoto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.userId || '',
            image: null,
            imgPath: props.userImage ? API_URL + props.userImage : '',
            actionStatus: 0
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.common.updateProfilePhoto) === JSON.stringify(prevState.actionStatus)) return null
        if (nextProps.common.updateProfilePhoto === 2) {
            nextProps.actionIsDone()
        }
        return {
            actionStatus: nextProps.common.updateProfilePhoto
        }
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
        this.props.updateUserProfilePhoto({ ...this.state }, this.state.id)
    }
    render() {
        let { imgPath, actionStatus } = this.state
        let isDone = imgPath && actionStatus !== 1
        return (
            <Fragment>
                <Modal show={this.props.isOpen} onHide={this.props.isClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Change Profile Photo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-6 offset-3">
                                <Form onSubmit={this.submitHandler}>
                                    <Form.Group className="text-center mb-5">
                                        <Form.Label htmlFor="profilePhoto">
                                            {imgPath && <img className="align-self-center rounded-circle mr-3" width="100" height="100" alt="ProfilePicture" src={imgPath} />}
                                        </Form.Label>
                                        <Form.Control
                                            id="profilePhoto"
                                            type="file"
                                            onChange={this.fileUploadHandler}
                                        />
                                    </Form.Group>
                                    <Button type="submit" block variant="dark" disabled={!isDone}>{actionStatus === 1 ? `Please Wait...` : `Submit`}</Button>
                                </Form>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    common: state.common
})
export default connect(mapStateToProps, { updateUserProfilePhoto })(UpdateProfilePhoto)