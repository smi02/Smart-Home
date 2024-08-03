import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import device from './routes/device.js';
import auth from './routes/auth.js'
import history from './routes/history.js'
import security from './routes/security.js'
import temp from './routes/temp.js'
import semester from './routes/semester.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import { connect } from './cli/publisher.js';

const app = express();

// Middleware for parsing request body
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

// Middleware for handling CORS policy
// Op1: Allow all origins with default of cors
app.use(cors())
// Op2: Allow custom origins
// app.use(
//     cors({
//         origin: '',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders:['Content-Type']
//     })
// )

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome')
})

app.use('/device', device);
app.use('/auth', auth);
app.use('/history', history);
app.use('/security', security);
app.use('/temp', temp);
app.use('/semester', semester);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            // connect();
            console.log(`Server is running on port ${PORT}`);
            console.log('http://localhost:5555/semester');
        })
    })
    .catch((error) => {
        console.log(error);
    })