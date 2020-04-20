import React, { Component } from 'react';

import AsyncSelect from 'react-select/async';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types';

class AudienceSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: null,
            users: [],
            selected: {},
            meetingId: props.meetingId || null
        }
        this.fetchData()
    }
    fetchData = () => {
        Axios.get(`${API_URL}api/users-list`)
            .then(res => {
                let users = res.data.map(user => {
                    return {
                        value: user.id,
                        label: user.name,
                    }
                })
                this.setState({ users })
            })
            .catch(error => console.log(error.response))

        // if (this.state.meetingId) {
        //     Axios.get(`${API_URL}api/meeting-selected-user/${this.state.meetingId}`)
        //         .then(res => {
        //             let selected = res.data.map(user => {
        //                 return {
        //                     value: user.id,
        //                     label: user.name,
        //                 }
        //             })
        //             // this.setState({ selected: { ...selected } })
        //             this.setState({ selected })
        //         })
        //         .catch(error => console.log(error.response))
        // }
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
    render() {
        let { users } = this.state

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
            Object.keys(users).length !== 0 &&
            <AsyncSelect
                isMulti
                defaultOptions
                cacheOptions
                // defaultValue={meetingId&&selected}
                onChange={(event) => this.props.audienceHandler(event)}
                loadOptions={promiseOptions}
            />
        );
    }
}
export default AudienceSection