import React, { Component } from 'react';
import { Card, Icon, Header } from 'semantic-ui-react';

class Cells extends Component {
  onHandleResolution = e => {
    this.props.handleResolution(e);
  };

  render() {
    const { days } = this.props;
    return (
      <Card.Group itemsPerRow={7} className="container">
        {days.map((day, i) => (
          <Card key={i}>
            <Card.Content>
              <div>
                <Icon
                  name="book"
                  size="big"
                  color={day.book ? 'grey' : 'red'}
                  onClick={() => this.onHandleResolution({ key: 'book', day })}
                  disabled={day.disabled}
                />
                <Icon
                  name="food"
                  size="big"
                  color={day.food ? 'grey' : 'green'}
                  onClick={() => this.onHandleResolution({ key: 'food', day })}
                  disabled={day.disabled}
                />
              </div>
              <div className="">
                <Icon
                  name="heart"
                  size="big"
                  color={day.heart ? 'grey' : 'violet'}
                  onClick={() => this.onHandleResolution({ key: 'heart', day })}
                  disabled={day.disabled}
                />
                <Icon
                  name="weight"
                  size="big"
                  color={day.weight ? 'grey' : 'blue'}
                  onClick={() =>
                    this.onHandleResolution({ key: 'weight', day })
                  }
                  disabled={day.disabled}
                />
              </div>
              <Header disabled={day.disabled}>{day.formattedDay}</Header>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    );
  }
}

export default Cells;
