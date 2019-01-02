import React, { Component } from 'react';
import Header from './components/Header';
import Days from './components/Days';
import Cells from './components/Cells';
import History from './components/History';
import daysRendering from './daysRendering';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import dateFns from 'date-fns';
import totalBoolean from './helpers/totalBoolean';
import streakBoolean from './helpers/streakBoolean';

import './App.css';

class App extends Component {
  state = {
    currentMonth: new Date(),
    prevMonth: '',
    selectedDate: '',
    days: [
      {
        day: {},
        formattedDay: '',
        book: false,
        food: false,
        heart: false,
        weight: false,
        disabled: false,
        startDate: '',
        thisMonth: '' // tell what month is!
      }
    ],
    currentMonthScore: {
      startDate: '',
      total: { book: 0, food: 0, heart: 0, weight: 0 },
      streak: {},
      LongestStreak: { book: 0, food: 0, heart: 0, weight: 0 }
    },
    prevMonthScore: {
      startDate: '',
      score: [],
      streak: []
    }
  };

  // this needs to know what month
  // use selectedDate, startDate to choose the month to search
  getDays = async (renderedDays, startDate) => {
    const url = `/api/resolution/${startDate}`;
    const { data } = await axios.get(url);
    let days = renderedDays;
    for (let i = 0; i < data.length; i++) {
      let index = days.findIndex(d => d.formattedDate === data[i].day);
      if (index !== -1) {
        const newDay = {
          day: days[index].day,
          formattedDay: days[index].formattedDay,
          formattedDate: days[index].formattedDate,
          startDate: days[index].startDate,
          thisMonth: days[index].currentMonth,
          book: data[i].book,
          food: data[i].food,
          heart: data[i].heart,
          weight: data[i].weight,
          disabled: days[index].disabled
        };
        days.splice(index, 1, newDay);
      }
      console.log('index', index);
    }
    return days;
  };

  async componentDidMount() {
    const { currentMonth, selectedDate } = this.state;
    const prevMonth = dateFns.subMonths(this.state.currentMonth, 1);
    const renderedDays = await daysRendering(currentMonth, selectedDate);
    const dbUpdated = await this.getDays(renderedDays, selectedDate);
    this.setState({ days: dbUpdated, prevMonth });
    this.setState({
      currentMonthScore: {
        total: {
          book: totalBoolean(dbUpdated, 'book'),
          heart: totalBoolean(dbUpdated, 'heart'),
          food: totalBoolean(dbUpdated, 'food'),
          weight: totalBoolean(dbUpdated, 'weight')
        },
        streak: {
          book: streakBoolean(dbUpdated, 'book'),
          heart: streakBoolean(dbUpdated, 'heart'),
          food: streakBoolean(dbUpdated, 'food'),
          weight: streakBoolean(dbUpdated, 'weight')
        }
      }
    });
  }

  handlePrevMonth = async () => {
    const newMonth = dateFns.subMonths(this.state.currentMonth, 1);
    // prevMonth setting
    const prevMonth = dateFns.subMonths(this.state.currentMonth, 1);
    const monthStart = dateFns.startOfMonth(newMonth);
    const startDate = dateFns.startOfWeek(monthStart);
    const formattedStartDate =
      dateFns.format(startDate, 'YYYY-MM-DD') + 'T00:00:00.000Z';
    const renderedDays = await daysRendering(newMonth);
    const dbUpdated = await this.getDays(renderedDays, formattedStartDate);

    this.setState({
      currentMonth: newMonth,
      prevMonth,
      selectedDate: formattedStartDate,
      days: dbUpdated
    });
  };

  handleNextMonth = async () => {
    const prevMonth = this.state.currentMonth;
    const newMonth = dateFns.addMonths(this.state.currentMonth, 1);
    const monthStart = dateFns.startOfMonth(newMonth);
    const startDate = dateFns.startOfWeek(monthStart);

    const formattedStartDate =
      dateFns.format(startDate, 'YYYY-MM-DD') + 'T00:00:00.000Z';
    const renderedDays = await daysRendering(newMonth);
    const dbUpdated = await this.getDays(renderedDays, formattedStartDate);
    this.setState({
      currentMonth: newMonth,
      prevMonth,
      selectedDate: formattedStartDate,
      days: dbUpdated
    });
  };

  handleResolution = async e => {
    let days = [...this.state.days];
    const index = days.findIndex(d => d.day === e.day.day);
    const newDay = e.day;
    newDay[e.key] = !e.day[e.key];
    days.splice(index, 1, newDay);
    this.setState({ days });
    await axios.post('/api/resolution', newDay);
    const streakCount = streakBoolean(days, 'heart');
    this.setState({
      currentMonthScore: {
        total: {
          book: totalBoolean(days, 'book'),
          heart: totalBoolean(days, 'heart'),
          food: totalBoolean(days, 'food'),
          weight: totalBoolean(days, 'weight')
        },
        streak: {
          book: streakBoolean(days, 'book'),
          heart: streakBoolean(days, 'heart'),
          food: streakBoolean(days, 'food'),
          weight: streakBoolean(days, 'weight')
        }
      }
    });
  };

  render() {
    const { currentMonth, selectedDate, days, currentMonthScore } = this.state;
    const dateFormat = 'MMMM YYYY';
    const month = dateFns.format(currentMonth, dateFormat);
    return (
      <div className="App">
        <Header
          currentMonth={month}
          onPrevMonth={this.handlePrevMonth}
          onNextMonth={this.handleNextMonth}
        />
        <div style={{ marginLeft: '40px' }}>
          <Grid>
            <Grid.Column width={13}>
              <Days month={month} />
              <Cells
                selectedDate={selectedDate}
                currentMonth={currentMonth}
                days={days}
                handleResolution={this.handleResolution}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <History score={currentMonthScore} />
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
