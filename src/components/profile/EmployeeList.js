import React, { Component, Fragment } from 'react'
import Axios from 'axios'
import { API_URL, BASE_URL } from '../../store/actions/types'
import Loading from '../layout/Loading';
import { textLimit } from '../../util/helper';
import { Link } from 'react-router-dom';


class EmployeeList extends Component {
    state = {
        isLoading: true,
        data: []
    }
    componentDidMount() {
        this.setState({
            isLoading: true,
            data: [],
        })
        Axios.get(`${API_URL}api/user`)
            .then(res => {
                this.setState({
                    isLoading: false,
                    data: res.data
                })
            })
            .catch(error => console.log(error.response))
    }
    render() {
        let { data, isLoading } = this.state
        return (
            < Fragment >
                <div className="content">
                    <div className="animated fadeIn">
                        <div className="row">
                            {isLoading ? <Loading /> : Object.keys(data).length !== 0 &&
                                data.map(item => (
                                    <div className="col-md-4" key={item.id}>
                                        <div className="card">
                                            <div className="card-body profile-card-body">
                                                <div className="mx-auto d-block">
                                                    <img className="rounded-circle mx-auto d-block employee-image" src={item.image ? `${API_URL + item.image}` : `${BASE_URL}images/admin.jpg`} alt="Card image cap" />
                                                    <h4 className="text-sm-center mt-2 mb-1 employee-name"><Link to={`${BASE_URL}/profile/${item.id}`}>{item.name}</Link></h4>
                                                    <h5 className="text-sm-center mt-2 mb-1">{item.designation}</h5>
                                                    <div className="location text-sm-center"><i className="fa fa-map-marker"></i> {item.address}</div>
                                                    <p className="location text-sm-center">{textLimit(item.bio)}</p>
                                                </div>
                                                <hr />
                                                <div className="card-text text-sm-center">
                                                    <a href={`${item.facebook}`} target="_blank"><i className="fa fa-facebook pr-1"></i></a>
                                                    <a href={`${item.linkedin}`} target="_blank"><i className="fa fa-linkedin pr-1"></i></a>
                                                    <a href={`${item.twitter}`} target="_blank"><i className="fa fa-twitter pr-1"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </Fragment >
        )
    }
}

export default EmployeeList