import React from 'react';
import { Grid, Segment, Icon } from 'semantic-ui-react';

const Header = props => {
  const { currentMonth, onPrevMonth, onNextMonth } = props;
  return (
    <Grid columns="equal" className="container" style={{ marginTop: '20px' }}>
      <Grid.Column>
        <Segment basic>
          <Icon size="big" name="caret square left" onClick={onPrevMonth} />
        </Segment>
      </Grid.Column>
      <Grid.Column width={8}>
        <Segment basic>
          <h1>{currentMonth}</h1>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment basic>
          <Icon size="big" name="caret square right" onClick={onNextMonth} />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default Header;
