import React, { Component, Fragment } from 'react'
import MyMeeting from './MyMeeting'
// import ArchiveMeeting from './ArchiveMeeting'
import Leave from './Leave'


class Home extends Component {
    render() {
        return (
            <Fragment>
                <div className="content">
                    <div className="animated fadeIn">
                        <MyMeeting />
                        <div className="clearfix"></div>
                        <Leave />
                        {/* <ArchiveMeeting /> */}

                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Home