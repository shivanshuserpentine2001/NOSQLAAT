require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

var app = express();
app.set('views', path.join(__dirname, '/views/'));
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "mainLayout"}));
app.set('view engine', 'hbs');
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());


app.listen(3800, () => {
    console.log('Express server started at port : 3800');
});
const cancerController = require('./controllers/cancerController');
app.use('/cancer',cancerController);