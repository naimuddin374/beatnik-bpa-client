import React, { Component, Fragment } from 'react'
import { deleteData } from '../../store/actions/meetingActions'
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../../store/actions/types';
import { textLimit } from '../../util/helper';
import { Link } from 'react-router-dom';
import EntryForm from './EntryForm';
import { Button } from 'react-bootstrap';

class MeetingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            detail: [],
            meetingId: props.match.params.id,
            selectedTime: '',
            isModalOpen: false,
        };
        this.dataFetch();
    }
    dataFetch = () => {
        Axios.get(`${API_URL}api/meeting/${this.state.meetingId}`)
            .then(res => {
                this.setState({
                    data: res.data.data,
                    detail: res.data.detail,
                })
            })
            .catch(err => console.log(err.response))
    }
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            selectedTime: "09:00:00"
        })
    }
    actionIsDone = () => {
        this.closeModal()
        setTimeout(() => {
            this.onFetchData()
        }, 1000)
    }
    deleteHandler = id => {
        this.props.deleteData(id)
        this.props.history.push('/')
    }
    render() {
        let { data, detail, isModalOpen } = this.state
        return (
            <Fragment>
                <div className="content">
                    <div className="animated fadeIn">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">

                                    {Object.keys(data).length !== 0 &&
                                        data.map(item =>
                                            <div className="card-header" key={item.id}>
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <strong className="card-title">Date: {item.date}</strong>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <strong className="card-title">Start Time&End Time: {item.start_time}-{item.end_time}</strong>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <strong className="card-title">Created By: <Link to={`/profile/${item.user_id}`}>{item.user_name}</Link></strong>
                                                        <Button
                                                            type="button"
                                                            className="text-white float-right btn btn-primary ml-5"
                                                            variant="danger"
                                                            title="Cancel Meeting"
                                                            onClick={() => this.deleteHandler(item.id)}
                                                        ><i className="fa fa-close" /></Button>

                                                        <Button
                                                            type="button"
                                                            className="text-white float-right btn btn-primary"
                                                            variant="transparent"
                                                            title="Edit Information"
                                                            onClick={() => this.setState({ isModalOpen: true })}
                                                        ><i className="fa fa-edit" /></Button>
                                                    </div>
                                                </div>
                                                <div className="row mt-5">
                                                    <div className="col-lg-12">
                                                        <p>Meeting Agenda: {item.note}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    <div className="card-body">
                                        <div className="row">
                                            {Object.keys(detail).length !== 0 &&
                                                detail.map(user =>
                                                    <div className="col-md-3" key={user.id}>
                                                        <div className="feed-box text-center">
                                                            <section className="card">
                                                                <div className="card-body">
                                                                    <img className="align-self-center rounded-circle mr-3" width="65" height="65" alt="ProfilePicture" src={user.image ? API_URL + user.image : `/images/admin.jpg`} />
                                                                    <h4><Link to={`/profile/${user.user_id}`}>{user.name}</Link></h4>
                                                                    <h4>{user.designation}</h4>
                                                                    <div className="card-text text-sm-center">
                                                                        <a href={`${user.facebook}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook pr-1"></i></a>
                                                                        <a href={`${user.linkedin}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin pr-1"></i></a>
                                                                        <a href={`${user.twitter}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter pr-1"></i></a>
                                                                    </div>
                                                                    <p className="boi-padding">{textLimit(user.bio, 80)}</p>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isModalOpen &&
                    <EntryForm
                        isOpen={isModalOpen}
                        isClose={this.closeModal}
                        actionIsDone={this.actionIsDone}
                        actionType={'EDIT'}
                        editData={data}
                        selectedDate={new Date()}
                        selectedTime={null}
                    />}
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { deleteData })(MeetingDetail)