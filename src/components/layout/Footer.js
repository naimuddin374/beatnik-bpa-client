import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="clearfix"></div>
                <footer className="site-footer">
                    <div className="footer-inner bg-white">
                        <div className="row">
                            <div className="col-sm-6">
                                Copyright &copy; 2020 Beatnik
                    </div>
                            <div className="col-sm-6 text-right">
                                Designed by <a target="_blank" href="https://beatnik.technology/" rel="noopener noreferrer">Beatnik Technology</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        )
    }
}
export default Footer