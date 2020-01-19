import React, { Component, Fragment } from 'react'
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'

class Leave extends Component {
    state = {
        leaves: []
    }
    componentDidMount() {
        console.log(this.props.userId)
        Axios.get(`${API_URL}api/leave/${this.props.userId}`)
            .then(res => {
                this.setState({
                    leaves: res.data
                })
            })
            .catch(err => console.log(err.response))
    }
    render() {
        let { leaves } = this.state
        return (
            <Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">

                            <div className="card-header">
                                <strong className="card-title">Leave History</strong>
                            </div>
                            <div className="table-stats order-table ov-h">
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Total Day(s)</th>
                                            <th>Purpose</th>
                                            <th>Note</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(leaves).length !== 0 &&
                                            leaves.map(item => (
                                                <tr key={item.id}>
                                                    <td>{(item.type === 1 && 'Casual') || (item.type === 2 && 'Sick') || (item.type === 3 && 'Other')}</td>
                                                    <td>{item.start_date}</td>
                                                    <td>{item.end_date}</td>
                                                    <td>{item.total_day}</td>
                                                    <td>{item.purpose}</td>
                                                    <td>{item.note}</td>
                                                    <td>{(item.status === 0 && 'Pending') || (item.status === 1 && 'Approved') || (item.status === 2 && 'Rejected')}</td>
                                                    <td>{item.created_at}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Leave