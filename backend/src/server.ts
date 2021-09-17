
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const path = require('path');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const helmet  = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

// Enabling cors
app.use(cors());

// Enabling helmet
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limiting each IP to 100 requests per windowMs
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

app.listen(PORT, () =>
  console.log(
    colors.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  )
);
