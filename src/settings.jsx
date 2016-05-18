import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

export default class Settings extends React.Component {

  render() {
    return (
      <Card initiallyExpanded={true}>
        <CardHeader
          title="Settings"
          subtitle=""
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Build Plan</TableHeaderColumn>
                <TableHeaderColumn>Branch</TableHeaderColumn>
                <TableHeaderColumn>Deploys To</TableHeaderColumn>
                <TableHeaderColumn>Shipment</TableHeaderColumn>
                <TableHeaderColumn>Container</TableHeaderColumn>
                <TableHeaderColumn>Environment</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>{this.props.settings.buildPlan}</TableRowColumn>
                <TableRowColumn>{this.props.settings.branch}</TableRowColumn>
                <TableRowColumn>=></TableRowColumn>
                <TableRowColumn>{this.props.settings.shipment}</TableRowColumn>
                <TableRowColumn>{this.props.settings.container}</TableRowColumn>
                <TableRowColumn>{this.props.settings.environment}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </CardText>
      </Card>
    );
  }
}
