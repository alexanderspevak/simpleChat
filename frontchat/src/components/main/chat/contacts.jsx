import React, { Component } from 'react';

class Contacts extends Component {


  render() {
    const lists = this.props.users.map(user => {
        let style={}
      if (user.styling) {
         console.log('styling is working')
         style = { backgroundColor: "#8CC152" }
      } 
      return (
        <li
          id={user.id}
          key={user.id}
          value={user.chatNick}
          onClick={this.props.onClick}
          style={style}
        >
          {user.chatNick}
        </li>)
    })
    console.log('lists',lists)
    return (
      <ul>
        <li id="general" value="General" onClick={this.props.onClick}>General</li>
        {lists}
      </ul>
    );
  }
}

export default Contacts;

