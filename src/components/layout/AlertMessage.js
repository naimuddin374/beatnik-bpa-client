import React from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'

class AlertMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            message: '',
            time: 0
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.common.time) === JSON.stringify(prevState.time)) return null
        if (nextProps.common.time === 2) {
            nextProps.actionIsDone()
        }
        return {
            type: nextProps.common.type,
            message: nextProps.common.message,
            time: nextProps.common.time,
        }
    }

    render() {
        let { type, message } = this.state
        if (message) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: type,
                title: message
            })
        }
        return <div></div>
    }
}

const mapStateToProps = state => ({
    common: state.common
})
export default connect(mapStateToProps)(AlertMessage)