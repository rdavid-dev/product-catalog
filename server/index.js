require('dotenv').config()
const express = require('express');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sgMail.setApiKey(process.env.SENDGRID_KEY);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    next();
});

const productRoutes = require('./routes/productRoute');


app.use('/products', productRoutes);

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  