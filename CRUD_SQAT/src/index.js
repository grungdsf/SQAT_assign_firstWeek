const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./database');

const path = require('path')
const d_public = path.join(__dirname, 'public');
const app = express();

app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use(express.json());

app.use('/api/all_data',require('./routes/crud_routes'));

app.use(express.static(d_public));

app.listen(app.get('port'), ()=>{
    console.log('PORT: ' + app.get('port'));
});
