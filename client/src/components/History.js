import React, { Component } from 'react';
import { Grid, Button, Header, Segment } from 'semantic-ui-react';

const square = { width: 120, height: 120 };
class History extends Component {
  state = {};

  render() {
    const { total } = this.props.score;
    console.log('props', this.props.score);
    return (
      <div className="ui container">
        <Grid divided>
          <Grid.Row>
            <Button.Group
              size="small"
              vertical
              labeled
              icon
              style={{ marginRight: '10px' }}
            >
              <Button icon="book" color="red" content="Learn" />
              <Button icon="food" color="green" content="Heathy Food" />
              <Button icon="heart" color="violet" content="Love All" />
              <Button icon="weight" color="blue" content="Run or Play" />
            </Button.Group>
          </Grid.Row>

          <Grid.Row>
            <Segment circular inverted style={square}>
              <Header as="h2" inverted color="red">
                100
                <Header.Subheader>current streak</Header.Subheader>
              </Header>
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Segment circular inverted style={square}>
              <Header as="h2" inverted color="green">
                {total.heart}
                <Header.Subheader>total</Header.Subheader>
              </Header>
            </Segment>
          </Grid.Row>
          <Grid.Row textAlign="center">
            <Segment circular inverted style={square}>
              <Header as="h2" inverted color="violet">
                100
                <Header.Subheader>longest streak</Header.Subheader>
              </Header>
            </Segment>
          </Grid.Row>
          <Grid.Row textAlign="center">
            <Segment circular inverted style={square}>
              <Header as="h2" inverted color="red">
                100
                <Header.Subheader>% change</Header.Subheader>
              </Header>
            </Segment>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default History;
