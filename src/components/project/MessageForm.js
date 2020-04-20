import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { storeData, updateData } from '../../store/actions/messageActions'
import { Form } from 'react-bootstrap';


import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
// import 'react-summernote/lang/summernote-ru-RU'; // you can import any other locale

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';

window.jQuery = $;
require('bootstrap');



class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: props.userId,
            project_id: props.projectId,
            message: null,
            actionStatus: 0,
            image: null,
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.common.messageStatus) === JSON.stringify(prevState.actionStatus)) return null
        if (nextProps.common.messageStatus === 2) {
            // window.location.reload(true);
            nextProps.actionIsDone()
        }
        return {
            actionStatus: nextProps.common.messageStatus
        }
    }
    changeHandler = message => {
        this.setState({
            message: message
        })
    }
    submitHandler = event => {
        event.preventDefault()
        this.props.storeData(this.state)
        this.setState({ message: null, image: null })
    }
    imageUpload = event => {
        let reader = new FileReader()
        let _this = this
        reader.onload = function (r) {
            _this.setState({
                image: r.target.result,
            });
        }
        reader.readAsDataURL(event[0]);
    }
    render() {
        let { message, actionStatus } = this.state
        let isDone = message && actionStatus !== 1
        return (
            <Fragment>
                <div className="message-form-area">
                    <ReactSummernote
                        defaultValue={message}
                        options={{
                            lang: 'ru-RU',
                            height: 80,
                            dialogsInBody: true,
                            toolbar: [
                                ['style', ['style']],
                                ['font', ['bold', 'underline', 'clear']],
                                ['fontname', ['fontname']],
                                ['para', ['ul', 'ol', 'paragraph']],
                                ['table', ['table']],
                                ['insert', ['link', 'picture', 'video']],
                                ['view', ['fullscreen', 'codeview']]
                            ]
                        }}
                        onChange={this.changeHandler}
                        onEnter={this.submitHandler}
                        onImageUpload={this.imageUpload}
                    />
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    common: state.common,
    auth: state.auth,
})
export default connect(mapStateToProps, { storeData, updateData })(MessageForm)