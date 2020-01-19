import React, { Component, Fragment } from 'react';
import authUser from '../../util/authUser';

class ProfileInfo extends Component {
    render() {
        let { user } = this.props

        let salarySection = ``;
        if (authUser().id === user.id) {
            salarySection = <p>Salary: {user.salary}</p>
        } else if (authUser().role === 2) {
            salarySection = <p>Salary: {user.salary}</p>
        } else if (authUser().role === 3 && user.supervisor_id === authUser().id) {
            salarySection = <p>Salary: {user.salary}</p>
        } else if (authUser().role === 4) {
            salarySection = <p>Salary: {user.salary}</p>
        }

        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-6">
                        <div className="feed-box profile-info-area">
                            <section className="card">
                                <div className="card-body">
                                    <h3>Professional Information: </h3>
                                    <hr />
                                    <p>Designation: {user.designation}</p>
                                    <p>Department: {user.department_name}</p>
                                    <p>Email: {user.email}</p>
                                    {salarySection}
                                    <p>Joining Date: {user.joining_date}</p>
                                    <p>End Date: {user.status === 1 ? "Continue" : user.end_date}</p>
                                    <p>Status: {user.status === 1 ? "Current" : "Former"}</p>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="feed-box profile-info-area">
                            <section className="card">
                                <div className="card-body">
                                    <h3>Personal Information: </h3>
                                    <hr />
                                    <p>Blood Group: {user.blood_group}</p>
                                    <p>Personal Email: {user.personal_email}</p>
                                    <p>Address: {user.address}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Contact Number: {user.contact}</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default ProfileInfo