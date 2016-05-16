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
            title="View 2"
            subtitle="Subtitle"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            This is View 2.
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
