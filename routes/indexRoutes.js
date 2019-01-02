const keys = require('../config/keys');
const mongoose = require('mongoose');
require('../models/Resolution');
const Resolution = mongoose.model('resolutions');

module.exports = app => {
  app.get('/api/resolution', async (req, res) => {
    const data = await Resolution.find({});
    res.send(data);
  });

  app.get('/api/resolution/:query', async (req, res) => {
    try {
      const data = await Resolution.find({
        startDate: req.params.query
      });
      res.send(data);
    } catch (err) {}
  });

  app.get('/api/resolution/:id', async (req, res) => {
    const result = await Resolution.findOne({ _id: req.params.id });
    res.send(result);
  });

  app.post('/api/resolution', async (req, res) => {
    const { day, heart, book, food, weight, startDate, thisMonth } = req.body;
    // console.log('body', req.body);

    const resolution = await Resolution.findOne({ day: day });
    // if resolution is found, replace it, otherwise, create a new one.
    console.log('resolution', resolution);
    if (resolution) {
      // see if any further optimizaton using key value.
      resolution.book = book;
      resolution.food = food;
      resolution.heart = heart;
      resolution.weight = weight;
      // resolution.startDate = startDate;

      const result = await resolution.save();
      res.json(result);
    } else {
      const resolution = new Resolution({
        day,
        heart,
        book,
        food,
        weight,
        startDate,
        thisMonth
      });

      try {
        const result = await resolution.save();
        res.send(result);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  });
};
