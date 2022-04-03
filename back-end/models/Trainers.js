const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
    name: String,
    battles: { type: Number, default: 0 },
    money: { type: Number, default: 0 },
});
mongoose.model('Trainer', TrainerSchema);