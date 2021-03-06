const express = require('express')
const color = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 4000

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/transfers', require('./routes/transferRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
}

app.listen(process.env.PORT, () => 
console.log(`server started on port ${port}`)
)
