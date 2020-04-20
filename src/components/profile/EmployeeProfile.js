import React, { Component, Fragment } from 'react';
import { API_URL } from '../../store/actions/types';
import Axios from 'axios';
import ProfileInfo from './ProfileInfo';
import Leave from './Leave';
import { connect } from 'react-redux';
import Loading from './../layout/Loading';
// import EditProfile from './EditProfile';
import { Button } from 'react-bootstrap';
import UpdateProfilePhoto from './edit/UpdateProfilePhoto';


class EmployeeProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            authUser: props.auth.user,
            isLoading: true,
            isOpen: false,
        }
    }
    actionIsDone = () => {
        this.setState({ isOpen: false })
        setTimeout(() => {
            this.dataFetch()
        }, 500)
    }
    dataFetch = () => {
        Axios.get(`${API_URL}api/user-info/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    user: Object.keys(res.data).length !== 0 ? res.data[0] : [],
                    isLoading: false
                })
            })
            .catch(error => console.log(error.response))
    }
    componentDidMount() {
        this.dataFetch()
    }
    render() {
        let { user, authUser, isLoading, isOpen } = this.state
        return (
            <Fragment>
                <div className="feed-box text-center">
                    <section className="card">
                        {isLoading && <Loading />}
                        <div className="card-body">
                            {Object.keys(user).length !== 0 &&
                                <div className="row">
                                    <div className="col-lg-3">
                                        <img height="100" alt="ProfilePicture" src={user.image ? API_URL + user.image : `/images/no_image.png`} />
                                        <h3>{user.name}</h3>
                                        <h4>{user.designation}</h4>
                                        <h4>{user.department_name}</h4>
                                        {/* <div className="card-text">
                                                        {user.facebook && <a href={`${user.facebook}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook pr-1"></i></a>}
                                                        {user.linkedin && <a href={`${user.linkedin}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin pr-1"></i></a>}
                                                        {user.twitter && <a href={`${user.twitter}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter pr-1"></i></a>}
                                                    </div> */}

                                        {Number(user.id) === Number(authUser.id) &&
                                            <Button
                                                type="button"
                                                variant="dark"
                                                size="sm"
                                                onClick={() => this.setState({
                                                    isOpen: true
                                                })}
                                            >
                                                <i className="fa fa-pencil" /> Change Photo
                                                            </Button>}
                                    </div>
                                    <div className="col-lg-7">
                                        <p>{user.bio}</p>
                                    </div>
                                </div>}
                        </div>
                    </section>
                </div>
                <ProfileInfo
                    user={user}
                    authUser={authUser}
                    actionIsDone={this.actionIsDone}
                />

                {(Number(authUser.role) === 2 || (Number(authUser.id) === Number(user.id)) || (Number(authUser.role) === 3 && Number(authUser.id) === Number(user.supervisor_id))) &&
                    <Leave
                        userId={user.id}
                    />
                }
                {isOpen &&
                    <UpdateProfilePhoto
                        isOpen={isOpen}
                        isClose={() => this.setState({ isOpen: false })}
                        actionIsDone={this.actionIsDone}
                        userId={user.id}
                        userImage={user.image}
                    />}

            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps)(EmployeeProfile)