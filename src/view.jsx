import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Settings from './settings.jsx'
import Logs from './logs.jsx'
import request from 'browser-request'

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
    request({ method: 'GET', url: '/data', json: true }, function(err, res) {
      if (err)  {
        console.error(err);
        throw err;
      }
      this.setState({ data: res.body });
    }.bind(this));
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
