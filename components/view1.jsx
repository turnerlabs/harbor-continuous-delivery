import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class View1 extends React.Component {

  render () {
    return (
      <div>
        <br />
        <Card initiallyExpanded={true}>
          <CardHeader
            title="View 1"
            subtitle="Subtitle"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expanable={true}>
            This is View 1.
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
      </div>
    );
  }

}

export default View1;
