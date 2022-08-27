const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))
// Starting server
app.listen(1337, () => {
    // eslint-disable-next-line no-console
    console.log('Server has started on port 5500!!!');
});