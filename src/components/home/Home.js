import React, { Component, Fragment } from 'react'
import Sales from './Sales'
// import Traffic from './Traffic'
import Order from './Order'

class Home extends Component {
    render() {
        return (
            <Fragment>
                <div className="content">
                    <div className="animated fadeIn">
                        <Sales />
                        {/* <Traffic /> */}

                        <div className="clearfix"></div>

                        <Order />

                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Home