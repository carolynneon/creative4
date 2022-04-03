const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/pokemon', {
  useNewUrlParser: true
});

const Trainers = require('./models/Trainers');
const Trainer = mongoose.model('Trainer');

app.post('/api/trainers', async (req, res) => {
    const trainer = new Trainer({
      name: req.body.name,
      battles: req.body.battles,
      money: req.body.money,
    });
    try {
      await trainer.save();
      res.send(trainer);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

app.get('/api/trainers', async (req, res) => {
  try {
    let trainers = await Trainer.find();
    res.send(trainers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/trainers/:id', async (req, res) => {
  try {
    await Trainer.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/trainers/:id', async (req, res) => {
  try {
    let trainer = await Trainer.findOne({
      _id: req.params.id
    });
    trainer.name = req.body.name;
    trainer.battles = req.body.battles;
    trainer.money = req.body.money;
    trainer.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));