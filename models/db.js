const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://naht:nhatvo123@cluster0-qbahl.mongodb.net/api?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true }) 
.then(() => console.log(`Successfully connect to mongodb`)) 
.catch(error => console.log(error));

require('./user.model');