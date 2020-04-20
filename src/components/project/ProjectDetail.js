import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../../store/actions/types';
import SelectedUsers from './SelectedUsers';
import MessageSection from './MessageSection';
import { Collapse } from 'react-collapse';


class ProjectDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.auth.user.id,
            loading: true,
            data: [],
            projectId: props.match.params.id,
            authUser: props.auth.user,
            isWait: false,
            isCollapse: false,
        };
    }
    componentDidMount() {
        this.dataFetch(this.state.projectId);
    }
    UNSAFE_componentWillReceiveProps(props) {
        if (props.match.params.id !== this.state.projectId) {
            this.setState({
                projectId: props.match.params.id
            })
            this.dataFetch(props.match.params.id)
        }
    }
    dataFetch = projectId => {
        Axios.get(`${API_URL}api/project/${projectId}`)
            .then(res => {
                this.setState({
                    data: res.data,
                })
            })
            .catch(err => console.log(err.response))
    }
    render() {
        let { data, authUser, projectId, isCollapse } = this.state
        return (
            <Fragment>

                <div className="bg-white">
                    <span className="project-detail-collapse bg-white" onClick={() => this.setState({ isCollapse: !isCollapse })}>Project Detail <i className="fa fa-chevron-down" /></span>

                    <Collapse isOpened={isCollapse}>
                        {Object.keys(data).length !== 0 &&
                            data.map(item =>
                                <div className="project-detail-header border-0 pl-2 pr-2 mt-4" key={item.id}>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <strong className="card-title">Creator: {item.user_name}</strong>
                                        </div>
                                        <div className="col-lg-4">
                                            <strong className="card-title">Project Name: {item.name}</strong>
                                        </div>
                                        <div className="col-lg-4">
                                            <strong className="card-title">Dateline: {item.dateline}</strong>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-lg-12">
                                            <p><b>Description: </b>{item.description}</p>
                                        </div>
                                    </div>

                                    <SelectedUsers authUser={authUser} projectId={projectId} />
                                </div>
                            )}
                    </Collapse>
                </div>

                <MessageSection userId={authUser.id} projectId={projectId} cardHeight={isCollapse ? "height-38vh" : "height-63vh"} />

            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps)(ProjectDetail)