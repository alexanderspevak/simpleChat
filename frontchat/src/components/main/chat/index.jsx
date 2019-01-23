import React, { Component } from 'react';
import io from 'socket.io-client'
import Contacts from './contacts'
import Text from './text'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      activeUser: { chatNick: 'General', id: 'general' },
      chats: {},
      chatNick:''
    }
    this.removeUser = this.removeUser.bind(this)
    this.onUserClick = this.onUserClick.bind(this)
    this.highLightUser = this.highLightUser.bind(this)
    this.checkNick = this.checkNick.bind(this)
  }
  componentDidMount() {
    this.socket = io('http://localhost:8080')
    let chatNick = localStorage.getItem('chatNick')
    this.socket.on('currentUsers', (currentUsers) => {
      this.setState({ users: currentUsers })
      chatNick=this.checkNick(currentUsers,chatNick)
      this.socket.emit('chatNick', chatNick)
    })

    this.socket.on('newUser', (id, chatNick) => {
      let users = [...this.state.users]
      users.push({ id, chatNick })
      this.setState({ users })
    })
    this.socket.on('userDisconnected', (user) => {
      this.removeUser(user)
      let newGeneralChat = this.state.chats.General + ' ' + user + ' has left the conversation'
      let newUserChat = ''
      if (this.state.chats[user]) {
        newUserChat = this.state.chats[user] + ' ' + user + ' has left the conversation'
      }
      this.setState(prevState => ({
        ...prevState,
        chats: {
          ...prevState.chats,
          [user]: newUserChat,
          'General': newGeneralChat
        }
      }))
    })
    this.socket.on('message', (data, users) => {
      let user
      if (users.to === 'General') {
        user = 'General'
      } else if (users.from === chatNick) {
        user = users.to
      } else {
        user = users.from
        this.highLightUser(user, true)
      }
      let newText
      if (this.state.chats[user]) {
        newText = this.state.chats[user] + data
      } else {
        newText = data
      }

      this.setState(prevState => ({
        ...prevState,
        chats: {
          ...prevState.chats,
          [user]: newText
        }
      }))
    })
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }
  onUserClick(e) {
    const target = e.target
    const chatNick = target.getAttribute('value');
    const { id } = target
    this.setState({ activeUser: { chatNick, id } })
    this.highLightUser(chatNick, false)
  }

  highLightUser(chatNick, value) {
    let index = -1
    let userArray = [...this.state.users];
    for (var i = 0; i < userArray.length; i++) {
      if (userArray[i].chatNick === chatNick) {
        index = i
      }
    }
    if (index > -1) {
      if (this.state.activeUser.chatNick !== chatNick && value) {
        userArray[index].styling = value
        this.setState({ users: userArray })
      } else if (!value) {
        userArray[index].styling = value
        this.setState({ users: userArray })
      }
    }
  }
  checkNick(currentUsers, chatNick) {
    let index = -1;
    for (var i = 0; i < currentUsers.length; i++) {
      if (currentUsers[i].chatNick === chatNick) {
        index = i
      }
    }
    if (index > -1) {
         chatNick = prompt('User name taken, please try new')
      if (!chatNick) {
        chatNick = prompt('It can not be empty')
      }
      chatNick = this.checkNick(currentUsers, chatNick)
     
    }
    localStorage.setItem('chatNick', chatNick)
    this.setState({chatNick})
    return chatNick
  }
  removeUser(chatNick) {
    let users = [...this.state.users]
    for (var i = 0; i < users.length; i++) {
      if (users[i].chatNick === chatNick) {
        users.splice(i, 1)
        this.setState({ users: users }, () => {
          console.log(this.state)
        })
      }
    }
  }
  render() {
    const chatNick=localStorage.getItem('chatNick')
    const socket = this.socket
    let activeUser
    if (!this.state.activeUser) {
      activeUser = { chatNick: "General", id: "general" }
    } else {
      activeUser = this.state.activeUser
    }
    return (
      <div>
        <h1> Logged in as: {this.state.chatNick}</h1>
        <Contacts users={this.state.users} onClick={this.onUserClick} />
        <Text activeUser={activeUser} socket={socket} chats={this.state.chats} />
      </div>
    );
  }
}

export default Chat;
