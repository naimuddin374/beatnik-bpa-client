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
        let background = "meeting-bg-div bg-white";
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
                    background = Number(item.status) === 3 ? "meeting-bg-div bg-success" : "meeting-bg-div bg-secondary"
                    note = item.note
                    body = <Link className="d-block text-white" to={`/meeting-detail/${item.id}`}>{item.note}</Link>
                }
                return true;
            })
        }
        return <div className={background} title={note}>{body}</div>
    }
    render() {
        let { loading, actionType, editData, isModalOpen, selectedTime, selectedDate, totalTime } = this.state


        return (
            <Fragment>
                {loading ? <tr><td colSpan="12"><Loading /></td></tr> :
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