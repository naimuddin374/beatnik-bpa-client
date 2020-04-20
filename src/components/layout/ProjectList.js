import React, { Component, Fragment } from 'react';
import { API_URL } from '../../store/actions/types';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: true,
            authUser: props.auth.user
        }
    }
    componentDidMount() {
        Axios.get(`${API_URL}api/project`)
            .then(res => {
                this.setState({
                    loading: false,
                    data: res.data
                })
            })
            .catch(error => console.log(error.response))
    }
    render() {
        let { data } = this.state
        return (
            <Fragment>
                <ul className="sub-menu-ul-area">
                    <li><Link to='/project' ><i className="menu-icon fa fa-plus" /> Add New Project</Link></li>
                    {Object.keys(data).length !== 0 &&
                        data.map(item => <li key={item.id}><Link to={`/project-detail/${item.id}`} ><i className="menu-icon fa fa-bookmark-o" /> {item.name}</Link></li>)}
                </ul>
            </Fragment>
        )
    }

}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps)(ProjectList)