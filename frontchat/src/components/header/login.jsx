import React, { Component } from 'react';;


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginInput: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit=this.submit.bind(this)
    }
    submit() {
        this.props.logIn(this.state.loginInput)
    }
    handleChange(e) {
        e.preventDefault()
        const target = e.target
        const { name, value } = target;
        this.setState({ [name]: value })
    }
    render() {
        return (
            <form onSubmit={this.submit}>
                <label >
                    input your nickName
                    <input type="text" name={'loginInput'} value={this.state.loginInput} onChange={this.handleChange} />
                </label>
            </form>
        )
    }
}

export default Login;
