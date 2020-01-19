import React, { Component, Fragment } from 'react';
import EditProfile from './EditProfile';
import { BASE_URL, API_URL } from '../../store/actions/types';
import ProfileInfo from './ProfileInfo';
import authUser from '../../util/authUser';
import Axios from 'axios';
import Leave from './Leave';

class MyProfile extends Component {
    state = {
        isModalOpen: false,
        user: []
    }
    componentDidMount() {
        this.dataFetch()
    }
    closeModal = () => {
        this.setState({
            isModalOpen: false,
        })
    }
    actionIsDone = () => {
        this.closeModal()
        setTimeout(() => {
            this.dataFetch()
        }, 1000)
    }
    dataFetch = () => {
        Axios.get(`${API_URL}api/user-info/${authUser().id}`)
            .then(res => {
                this.setState({
                    user: res.data[0]
                })
            })
            .catch(error => console.log(error.response))
    }
    render() {
        let { isModalOpen, user } = this.state
        return (
            <Fragment>
                <div className="content">
                    {Object.keys(user).length !== 0 &&
                        <section>
                            <div className="animated fadeIn">
                                <div className="row">
                                    <div className="col-md-10 offset-1">
                                        <div className="feed-box text-center">
                                            <section className="card">
                                                <div className="card-body">
                                                    <img className="align-self-center rounded-circle mr-3" width="200" height="200" alt="ProfilePicture" src={user.image ? BASE_URL + user.image : 'images/No_image_available.jpg'} />
                                                    <h2>{user.name}</h2>
                                                    <h4>{user.designation}</h4>
                                                    <div className="card-text text-sm-center">
                                                        <a href={`${user.facebook}`} target="_blank"><i className="fa fa-facebook pr-1"></i></a>
                                                        <a href={`${user.linkedin}`} target="_blank"><i className="fa fa-linkedin pr-1"></i></a>
                                                        <a href={`${user.twitter}`} target="_blank"><i className="fa fa-twitter pr-1"></i></a>
                                                    </div>
                                                    <p className="boi-padding">{user.bio}</p>
                                                    <button
                                                        className="btn btn-secondary mt-4"
                                                        onClick={() => this.setState({
                                                            isModalOpen: true
                                                        })}>
                                                        <i className="fa ti-pencil-alt" /> Edit Profile
                                                    </button>

                                                    <EditProfile
                                                        isOpen={isModalOpen}
                                                        isClose={this.closeModal}
                                                        actionIsDone={this.actionIsDone}
                                                        user={user}
                                                    />
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <ProfileInfo
                                    user={user}
                                />
                            </div>

                                <Leave
                                    userId={user.id}
                                />
                        </section>
                    }
                </div>
            </Fragment>
        )
    }
}
export default MyProfile