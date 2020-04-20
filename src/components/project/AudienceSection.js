import React, { Component, Fragment } from 'react';
import AsyncSelect from 'react-select/async';
import { Button } from 'react-bootstrap';
import { API_URL } from '../../store/actions/types';
import Axios from 'axios';


class AudienceSection extends Component {
    constructor(props) {
        super(props);
        let users = props.users.map(user => {
            return {
                value: user.id,
                label: user.name,
            }
        })
        this.state = {
            inputValue: null,
            users,
            selected: {},
            projectId: props.projectId,
            isWait: false,
            selectedUsers: []
        }
    }
    changeHandler = event => {
        this.setState({
            selected: event
        })
    }
    handleInputChange = newValue => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        return inputValue;
    };
    audienceHandler = event => {
        if (event === null) {
            this.setState({ selectedUsers: [] })
        } else {
            let userId = event.map(item => {
                return item.value
            })
            this.setState({ selectedUsers: userId })
        }
    }
    submitHandler = () => {
        this.setState({ isWait: true })
        let { projectId, selectedUsers } = this.state
        Axios.post(`${API_URL}api/project-user`, { project_id: projectId, selectedUsers })
            .then(res => {
                this.setState({ isWait: false, selectedUsers: [] })
                this.props.actionIsDone()
            })
            .catch(err => {
                this.setState({ isWait: false })
                console.log(err.response)
            })
    }
    render() {
        let { users, isWait, selectedUsers } = this.state

        const filterColors = inputValue => {
            return users.filter(i =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        };
        const promiseOptions = inputValue =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve(filterColors(inputValue));
                }, 100);
            });

        return (
            <Fragment>
                {Object.keys(users).length !== 0 &&
                    <AsyncSelect
                        isMulti
                        defaultOptions
                        cacheOptions
                        onChange={(event) => this.audienceHandler(event)}
                        loadOptions={promiseOptions}
                    />}
                <Button type="submit" onClick={this.submitHandler} variant="dark" disabled={Object.keys(selectedUsers).length === 0}>{isWait ? `Please Wait...` : `Submit`}</Button>
            </Fragment>
        );
    }
}
export default AudienceSection