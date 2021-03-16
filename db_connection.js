const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB || 'mongodb://localhost:27017/store', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error : '));
db.once('open', function() {
    console.log("we are connected");
})