import React from 'react';
import dateFns from 'date-fns';
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';

const Days = props => {
  const { month } = props;
  let startDate = dateFns.startOfWeek(month);
  const dateFormat = 'dddd';

  const columns = _.times(7, i => (
    <Grid.Column columns="equal" key={i}>
      <span className="ui header medium">
        {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
      </span>
    </Grid.Column>
  ));

  return (
    <div className="ui container">
      <Grid columns="equal">{columns}</Grid>
    </div>
  );
};

export default Days;
