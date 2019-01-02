import React, { Component } from 'react';
import { Grid, Button, Header, Segment } from 'semantic-ui-react';

const square = { width: 120, height: 120 };
class History extends Component {
  state = {
    btnArray: [
      {
        name: 'book',
        icon: 'book',
        content: 'Learn New',
        color: 'red',
        active: true
      },
      {
        name: 'food',
        icon: 'food',
        content: 'Eat Healthy',
        color: 'green',
        active: true
      },
      {
        name: 'heart',
        content: 'Love All',
        icon: 'heart',
        color: 'violet',
        active: true
      },
      {
        name: 'weight',
        content: 'Run More',
        icon: 'weight',
        color: 'blue',
        active: true
      }
    ],
    displayArray: {
      total: 0,
      currentStreak: 0,
      highestStreak: 0,
      color: ''
    }
  };

  handleScoreButton = index => {
    let tmp = [...this.state.btnArray];
    tmp[index].active = !tmp[index].active;
    this.setState({ btnArray: tmp });

    switch (index) {
      case 0:
        this.setState({
          displayArray: {
            total: this.props.score.total.book,
            color: this.state.btnArray[index].color,
            currentStreak: this.props.score.streak.book.currentStreak,
            highestStreak: this.props.score.streak.book.highestStreak
          }
        });
        break;
      case 1:
        this.setState({
          displayArray: {
            total: this.props.score.total.food,
            color: this.state.btnArray[index].color,
            currentStreak: this.props.score.streak.food.currentStreak,
            highestStreak: this.props.score.streak.food.highestStreak
          }
        });
        break;
      case 2:
        this.setState({
          displayArray: {
            total: this.props.score.total.heart,
            color: this.state.btnArray[index].color,
            currentStreak: this.props.score.streak.heart.currentStreak,
            highestStreak: this.props.score.streak.heart.highestStreak
          }
        });
        break;
      case 3:
        this.setState({
          displayArray: {
            total: this.props.score.total.weight,
            color: this.state.btnArray[index].color,
            currentStreak: this.props.score.streak.weight.currentStreak,
            highestStreak: this.props.score.streak.weight.highestStreak
          }
        });
      default:
        break;
    }
  };

  render() {
    const {
      color,
      total,
      currentStreak,
      highestStreak
    } = this.state.displayArray;

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
              {this.state.btnArray.map((btn, index) => (
                <Button
                  key={index}
                  icon={btn.icon}
                  color={btn.color}
                  content={btn.content}
                  active={btn.active}
                  onClick={() => this.handleScoreButton(index)}
                />
              ))}
            </Button.Group>
          </Grid.Row>

          <Grid.Row>
            <Segment circular inverted style={square}>
              <Header as="h2" inverted color={color}>
                {currentStreak}
                <Header.Subheader>current streak</Header.Subheader>
              </Header>
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Segment circular inverted style={square}>
              <Header as="h2" inverted color={color}>
                {total}
                <Header.Subheader>total</Header.Subheader>
              </Header>
            </Segment>
          </Grid.Row>
          <Grid.Row textAlign="center">
            <Segment circular inverted style={square}>
              <Header as="h2" inverted color={color}>
                {highestStreak}
                <Header.Subheader>longest streak</Header.Subheader>
              </Header>
            </Segment>
          </Grid.Row>
          <Grid.Row textAlign="center">
            <Segment circular inverted style={square}>
              <Header as="h2" inverted color={color}>
                TBD
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
