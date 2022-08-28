const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routers/apiRouter');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// app.get('/positions', (req, res) => {
//     res.json('ok');
// });
app.use(apiRouter);
// Starting server
app.listen(5500, () => {
    // eslint-disable-next-line no-console
    console.log('Server has started on port 5500!!!');
});