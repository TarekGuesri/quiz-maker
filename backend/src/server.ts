import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Load env vars
dotenv.config();

const app = express();

// Enabling cors
app.use(cors());

// Enabling helmet
app.use(helmet());

// Limiting each IP to 100 requests per windowMs
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

//  apply to all requests
app.use(limiter);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Defining Routes
app.use('/rest', require('./routes/rest'));


const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(
    colors.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  )
);
