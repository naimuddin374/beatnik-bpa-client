import React, { Component, Fragment } from 'react';
import { BASE_URL, API_URL } from '../../store/actions/types';
import Axios from 'axios';
import ProfileInfo from './ProfileInfo';
import Leave from './Leave';
import { connect } from 'react-redux';

class EmployeeProfile extends Component {
    state = {
        user: [],
        authUser: this.props.auth.user
    }
    componentDidMount() {
        Axios.get(`${API_URL}api/user-info/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    user: res.data[0]
                })
            })
            .catch(error => console.log(error.response))
    }
    render() {
        let { user, authUser } = this.state
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
                                                    <img className="align-self-center rounded-circle mr-3" width="200" height="200" alt="ProfilePicture" src={user.image ? API_URL + user.image : `${BASE_URL}/images/admin.jpg`} />
                                                    <h2>{user.name}</h2>
                                                    <h4>{user.designation}</h4>
                                                    <div className="card-text text-sm-center">
                                                        {user.facebook && <a href={`${user.facebook}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook pr-1"></i></a>}
                                                        {user.linkedin && <a href={`${user.linkedin}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin pr-1"></i></a>}
                                                        {user.twitter && <a href={`${user.twitter}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter pr-1"></i></a>}
                                                    </div>
                                                    <p className="boi-padding">{user.bio}</p>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <ProfileInfo
                                    user={user}
                                    authUser={authUser}
                                />
                            </div>

                            {(authUser.role === 2 || (authUser.id === user.id) || (authUser.role === 3 && authUser.id === user.supervisor_id)) &&
                                <Leave
                                    userId={user.id}
                                />
                            }
                        </section>
                    }
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps)(EmployeeProfile)