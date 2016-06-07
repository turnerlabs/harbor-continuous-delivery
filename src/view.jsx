import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Settings from './settings.jsx'
import Logs from './logs.jsx'
import io from 'socket.io-client'

export default class View extends React.Component {

  constructor(props) {    
    super(props);
    this.state = {
      data: {
        settings: {},
        logs: []
      }
    };
  }

  componentDidMount() {

    //init socket.io
    this.socket = io();

    //trigger ui state updates when deploy msg comes in
    this.socket.on('deploy', function(data) {
      this.setState({ data: data });
    }.bind(this));

    //send a "ready" msg to the server to get initial state
    this.socket.emit('client-ready');
  }

  render() {
    return (
      <div>
        <br/>
        <Settings settings={this.state.data.settings} />
        <br/>
        <Logs logs={this.state.data.logs} />
      </div>
    );
  }
}
