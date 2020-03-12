import React, { Component, Fragment } from 'react';
import EditProfile from './edit/EditProfile';
import { Button } from 'react-bootstrap';


class ProfileInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authUser: props.authUser,
            isOpen: false,
        }
    }

    actionIsDone = () => {
        this.setState({ isOpen: false })
        this.props.actionIsDone()
    }

    render() {
        let { user } = this.props
        let { authUser, isOpen } = this.state

        let salarySection = <p>&nbsp;</p>
        if (Number(authUser.id) === Number(user.id)) {
            salarySection = <p>Salary: {user.salary}</p>
        } else if (Number(authUser.role) === 2) {
            salarySection = <p>Salary: {user.salary}</p>
        } else if (Number(authUser.role) === 3 && Number(user.supervisor_id) === Number(authUser.id)) {
            salarySection = <p>Salary: {user.salary}</p>
        } else if (Number(authUser.role) === 4) {
            salarySection = <p>Salary: {user.salary}</p>
        }

        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <div className="feed-box profile-info-area">
                            <section className="card">
                                <div className="card-body">
                                    <h3>Professional Information </h3>
                                    <hr />
                                    <p>Designation: {user.designation}</p>
                                    <p>Department: {user.department_name}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Joining Date: {user.joining_date}</p>
                                    <p>End Date: {Number(user.status) === 1 ? "Present" : user.end_date}</p>
                                    {salarySection}
                                    {/* <p>Status: {user.status === 1 ? "Current" : "Former"}</p> */}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="feed-box profile-info-area">
                            <section className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="float-left">
                                                <h3>Personal Information </h3>
                                            </div>
                                            <div className="float-right">
                                                {user.id === authUser.id &&
                                                    <Button
                                                        type="button"
                                                        variant="dark"
                                                        size="sm"
                                                        onClick={() => this.setState({
                                                            isOpen: true
                                                        })}
                                                    >
                                                        <i className="fa fa-pencil" />
                                                    </Button>}
                                            </div>
                                        </div>
                                    </div>

                                    <hr />
                                    <p>Blood Group: {user.blood_group}</p>
                                    <p>Personal Email: {user.personal_email}</p>
                                    <p>Address: {user.address}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Contact Number: {user.contact}</p>
                                    <br />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>


                {isOpen &&
                    <EditProfile
                        isOpen={isOpen}
                        isClose={() => this.setState({ isOpen: false })}
                        actionIsDone={this.actionIsDone}
                        user={user}
                    />}
            </Fragment>
        )
    }
}
export default ProfileInfo