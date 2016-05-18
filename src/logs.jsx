import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import { teal500, deepOrange500 } from 'material-ui/styles/colors'

export default class Logs extends React.Component {

  constructor(props) {
    super(props);
    this.getColor = this.getColor.bind(this);
  }

  getColor(status) {
    var color = '';
    if (status === 'success')
      color = teal500;
    else if (status === 'failed')
      color = deepOrange500;
    return { 'color': color }
  }

  render() {
    return (
      <Card initiallyExpanded={true}>
        <CardHeader
          title="Deployment Logs"
          subtitle=""
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Time</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
                <TableHeaderColumn>Build Version</TableHeaderColumn>
                <TableHeaderColumn>Build Number</TableHeaderColumn>
                <TableHeaderColumn>Message</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.logs.map(function(log) {
                return (
                  <TableRow key={log.time}>
                    <TableRowColumn>{log.time}</TableRowColumn>
                    <TableRowColumn style={this.getColor(log.status)}>{log.status}</TableRowColumn>
                    <TableRowColumn>{log.buildVersion}</TableRowColumn>
                    <TableRowColumn>{log.buildNumber}</TableRowColumn>
                    <TableRowColumn>{log.message}</TableRowColumn>
                  </TableRow>
                );
              }.bind(this))}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    );
  }
}
