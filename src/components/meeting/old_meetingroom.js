import React, { Component, Fragment } from 'react'
import EntryForm from './EntryForm'
import { deleteData } from '../../store/actions/meetingActions'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Button } from 'react-bootstrap';
import Loading from './../layout/Loading';

let fullDay = [
    "10:00:00",
    "10:30:00",
    "11:00:00",
    "11:30:00",
    "12:00:00",
    "12:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
    "15:00:00",
    "15:30:00",
    "16:00:00",
    "16:30:00",
    "17:00:00",
    "17:30:00",
    "18:00:00",
    "18:30:00",
]

class MeetingRoomBooked extends Component {
    state = {
        data: [],
        editData: {},
        isModalOpen: false,
        loading: true,
        actionType: 'ADD',
        selectedTime: "10:00:00",
        selectedDate: this.props.selectedDate,
        authUser: this.props.auth.user,
        oldDataId: 0
    }
    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            selectedDate: props.selectedDate
        })
        // this.onFetchData(props.selectedDate)
    }
    componentDidMount() {
        this.onFetchData(this.props.selectedDate)
    }
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            selectedTime: "10:00:00"
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
            data: [],
            editData: {},
        })
        Axios.post(`${API_URL}api/meeting-room-booking`, { date })
            .then(res => {
                this.setState({
                    loading: false,
                    data: res.data
                })
            })
            .catch(error => console.log(error.response))
    }
    getBookedInfo = time => {
        let { data } = this.state
        if (Object.keys(data).length !== 0) {
            data.map(item => {
                if (item.start_time === time || (item.start_time < time && item.end_time > time)) {
                    return item
                }
            })
        }
        return null
    }
    hourBoxView = (hour, index) => {
        let { authUser, data, oldDataId } = this.state
        let isBooked = 0
        if (Object.keys(data).length !== 0) {
            data.map(item => {
                if (item.start_time === hour || (item.start_time < hour && item.end_time > hour)) {
                    isBooked = item
                }
            })
        }
        if (Object.keys(isBooked).length !== 0) {
            if (isBooked.id === oldDataId) {
                return null
            } else {
                // this.setState({
                //     oldDataId: isBooked.id
                // })
                console.log('isBooked', hour)
                return <td key={index}>BOOKED-{isBooked.id}</td>
            }
        } else {
            return <td key={index}>Empty</td>
        }
        // if (!isBooked) {
        //     return null
        // } else {
        //     if (isBooked === 0) {
        //         return <td key={index}>Is Empty</td>
        //     } else if (oldDataId === isBooked) {
        //         return null
        //     } else {
        //         // this.setState({
        //         //     oldDataId: isBooked || 0
        //         // })
        //         return <td key={index}>{isBooked}</td>
        //     }
        // }

        // let isEmpty = true
        // let dataId = 0
        // let rowSpan = 1
        // let bgColor = "bg-white";
        // let note = ""
        // let body = ""





        // body = <Button
        //     type="submit"
        //     className="border-0"
        //     variant="transparent"
        //     block
        //     onClick={() => this.setState({
        //         actionType: "ADD",
        //         isModalOpen: true,
        //         selectedTime: hour
        //     })}>
        //     <small className="d-block">Empty</small>
        //     <i className="fa fa-plus" /></Button>


        // let meetingRoomId = 0
        // if (Object.keys(data).length !== 0) {
        //     data.map(item => {
        //         if (item.start_time === hour || (item.start_time < hour && item.end_time > hour)) {
        //             if (meetingRoomId === item.id) {
        //                 rowSpan = rowSpan + 1
        //             } else {
        //                 meetingRoomId = item.id

        //                 bgColor = "bg-secondary"
        //                 note = item.note
        //                 if (item.user_id === authUser.id) {
        //                     body = <div>
        //                         <small className="d-block">{item.user_name}</small>
        //                         <div className="d-block">
        //                             <Button
        //                                 type="button"
        //                                 className="text-white float-left"
        //                                 variant="transparent"
        //                                 onClick={() => this.setState({
        //                                     actionType: "EDIT",
        //                                     isModalOpen: true,
        //                                     editData: item,
        //                                 })}
        //                             ><i className="fa fa-edit" title="Edit" />
        //                             </Button>
        //                             <Button
        //                                 type="button"
        //                                 className="text-white float-right"
        //                                 variant="transparent"
        //                                 onClick={() => this.deleteHandler(item.id)}
        //                             > <i className="fa fa-trash ml-2 text-danger" title="Delete" />
        //                             </Button>
        //                         </div>
        //                     </div>
        //                 } else {
        //                     body = <small>Booked</small>
        //                 }
        //             }
        //         }
        //     })
        // }

        // return <td rowSpan={rowSpan} key={index} className={bgColor} title={note}>{body}</td>
    }
    render() {
        let { loading, actionType, editData, isModalOpen, selectedTime, selectedDate } = this.state

        return (
            <Fragment>
                {loading ? <Loading /> :
                    <tr>
                        {/* {fullDay.map((time, index) => (
                            <td key={time + index} className="border-right" rowSpan="2">
                                {this.hourBoxView(time)}
                            </td>
                        ))} */}
                        {fullDay.map((time, index) => this.hourBoxView(time, index))}
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