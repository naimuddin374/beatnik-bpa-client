import React, { Component, Fragment } from 'react'
import EntryForm from './EntryForm'
import { deleteData } from '../../store/actions/meetingActions'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Button } from 'react-bootstrap';
import Loading from './../layout/Loading';
import { Link } from 'react-router-dom';


class MeetingRoomBooked extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDayMeeting: [],
            editData: {},
            isModalOpen: false,
            loading: true,
            actionType: 'ADD',
            selectedTime: "09:00:00",
            selectedDate: props.selectedDate,
            authUser: props.auth.user,
            totalTime: props.totalTime
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            selectedDate: props.selectedDate
        })
        this.onFetchData(props.selectedDate)
    }
    componentDidMount() {
        this.onFetchData()
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
        setTimeout(() => {
            this.onFetchData()
        }, 1000)
    }
    onFetchData = (date = this.state.selectedDate) => {
        this.setState({
            loading: true,
            toDayMeeting: [],
            editData: {},
        })
        Axios.post(`${API_URL}api/meeting-room-booking`, { date })
            .then(res => {
                this.setState({
                    loading: false,
                    toDayMeeting: res.data
                })
            })
            .catch(error => console.log(error.response))
    }
    hourBoxView = hour => {
        let { authUser } = this.state

        let background = "bg-white";
        let note = ""
        let body = <Button
            type="submit"
            className="border-0"
            variant="transparent"
            block
            onClick={() => this.setState({
                actionType: "ADD",
                isModalOpen: true,
                selectedTime: hour
            })}
        >
            <small className="d-block">Empty</small>
            <i className="fa fa-plus" /></Button>
        if (Object.keys(this.state.toDayMeeting).length !== 0) {
            this.state.toDayMeeting.map(item => {
                if (item.start_time === hour || (item.start_time < hour && item.end_time > hour)) {
                    background = "bg-secondary"
                    note = item.note
                    if (item.user_id === authUser.id) {
                        body = <div>
                            {/* <small className="d-block">{item.note}</small> */}
                            <div className="d-block">
                                <Link className="text-white float-left ml-3" to={`/meeting-detail/${item.id}`}><i className="fa fa-eye" title="Detail" /></Link>

                                <Button
                                    type="button"
                                    className="text-white float-right"
                                    variant="transparent"
                                    onClick={() => this.setState({
                                        actionType: "EDIT",
                                        isModalOpen: true,
                                        editData: item,
                                    })}
                                ><i className="fa fa-edit" title="Edit" /></Button>
                                {/* <Button
                                    type="button"
                                    className="text-white float-right"
                                    variant="transparent"
                                    onClick={() => this.deleteHandler(item.id)}
                                > <i className="fa fa-trash ml-2 text-danger" title="Delete" />
                                </Button> */}
                            </div>
                        </div >
                    } else {
                        body = <Link className="text-white" to={`/meeting-detail/${item.id}`}><i className="fa fa-eye" title="Detail" /></Link>
                    }
                }
            })
        }
        return <div className={background} title={note}>{body}</div>
    }
    render() {
        let { loading, actionType, editData, isModalOpen, selectedTime, selectedDate, totalTime } = this.state


        return (
            <Fragment>
                {loading ? <Loading /> :
                    <tr>
                        {totalTime.map((time, index) => (
                            <td key={time + index} className="border-right">
                                {this.hourBoxView(time)}
                            </td>
                        ))}
                    </tr>}

                {isModalOpen &&
                    <EntryForm
                        isOpen={isModalOpen}
                        isClose={this.closeModal}
                        actionIsDone={this.actionIsDone}
                        actionType={actionType}
                        editData={editData}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                    />}
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { deleteData })(MeetingRoomBooked)