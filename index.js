const express = require('express');
const cors = require('cors');
const { PORT } = require('../config');
const routerAPI = require('./routes/index');

const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
const whiteList = ['http://localhost:3000', 'http://localhost:5000'];

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));
app.get('/', (req, res) => res.send('Hello World!'));

routerAPI(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Example app listening on port ${port}!`));
