import React, { Component } from 'react';
import Login from './login'
import { Redirect, withRouter } from 'react-router-dom'


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }
        this.logIn = this.logIn.bind(this)
        this.logOut = this.logOut.bind(this)
    }
    componentDidMount() {
        const loggedIn = localStorage.getItem('chatNick')
        if (loggedIn) {
            this.setState({ loggedIn: true })
        }
    }
    logOut(e) {
        if (localStorage.getItem('chatNick')) {
            localStorage.removeItem('chatNick')
        }

        this.setState({ loggedIn: false })
    }
    logIn(e) {
        if (e.length < 1) {
            return alert('Nickname please')
        }
        localStorage.setItem('chatNick', e)
        this.setState({ loggedIn: !this.state.loggedIn })
    }
    render() {
        const path = this.props.location.pathname
        let { loggedIn } = this.state
        return (
            <div>
                {!loggedIn && path !== '/' && <Redirect to='/' />}
                {loggedIn && path !== '/chat' && <Redirect to='/chat' />}
                {!loggedIn && <Login logIn={this.logIn} />}
                {loggedIn && <button onClick={this.logOut}>Logout </button>}
            </div>
        )
    }
}

const withRouterHeader = withRouter(Header)
export default withRouterHeader;
