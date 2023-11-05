require('dotenv').config();
require('express-async-errors');

//setting up express
const express = require('express');
const app = express();

//connecting to DB
const connectDB = require('./db/connect');

//setting up routes middleware
const productsRouter = require('./routes/products');

//setting up error middlware
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

//middleware

app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href = "/api/v1/products">products</a>');
})

app.use('/api/v1/products', productsRouter);

//products route

//using middleware to hangle errors
app.use(notFoundMiddleware);
app.use(errorMiddleware);

//setting up port variable
const port = process.env.PORT || 3000;

//booting up the server on port 
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();