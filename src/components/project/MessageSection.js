import React, { Component, Fragment } from 'react'
import Axios from 'axios';
import { API_URL } from '../../store/actions/types';
import MessageForm from './MessageForm';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser'

class MessageSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            projectId: props.projectId,
            loading: true,
            data: [],
            isWait: false
        };
    }
    UNSAFE_componentWillReceiveProps(props) {
        if (props.projectId !== this.state.projectId) {
            this.setState({
                projectId: props.projectId
            })
            this.dataFetch(props.projectId)
        }
    }
    componentDidMount() {
        this.dataFetch(this.state.projectId);
    }
    dataFetch = projectId => {
        Axios.get(`${API_URL}api/message/${projectId}`)
            .then(res => {
                this.setState({
                    data: res.data,
                })
            })
            .catch(err => console.log(err.response))
    }
    render() {
        let { data, projectId, userId } = this.state
        return (
            <Fragment>

                <div className={`${this.props.cardHeight} message-show-body`}>
                    {Object.keys(data).length !== 0 && data.map(item =>
                        <div className="row" key={item.id}>
                            <div className="col-lg-12">
                                <p className="mb-0"><Link to={`/profile/${item.user_id}`}>{item.user_name}</Link></p>
                                {item.image && <img src={API_URL + item.image} alt="UploadImage" className="message-image" />}
                                <div>{parse(item.message)}</div>
                            </div>
                        </div>
                    )}
                </div>


                <MessageForm userId={userId} projectId={projectId} actionIsDone={() => this.dataFetch(projectId)} />
            </Fragment>
        )
    }
}
export default MessageSection