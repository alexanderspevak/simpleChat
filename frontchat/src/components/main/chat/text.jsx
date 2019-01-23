import React, { Component } from 'react';

class Text extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textInput: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    submit(e) {
        e.preventDefault()
        const toId = this.props.activeUser.id
        const to = this.props.activeUser.chatNick
        const socket = this.props.socket
        const message = this.state.textInput
        const from = localStorage.getItem('chatNick')
        socket.emit('message', { toId, message, from, to })
        this.setState({ textInput: '' })
    }
    handleChange(e) {
        e.preventDefault()
        const target = e.target
        const { name, value } = target;
        this.setState({ [name]: value })
    }
    render() {
        
        let chatText=''
        const chatNick=this.props.activeUser.chatNick;
        const chats=this.props.chats;
       if( chatNick in chats){
           chatText=chats[chatNick].split("\n").map(line=>{
               return (<p key={line}>{line}</p>)
           })
       }
        return (
            <div>
                {this.props.activeUser.chatNick}
                {chatText}
                <form onSubmit={this.submit}>
                    <label >
                        Chat with {this.props.activeUser.chatNick}:
                    <input type="text" name={'textInput'} value={this.state.textInput} onChange={this.handleChange} />
                    </label>
                </form>
            </div>
        );
    }
}

export default Text;
