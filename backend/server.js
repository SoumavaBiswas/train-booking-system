const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

require('dotenv').config()

const bookingRoutes = require('./routers/booking')
const app = express()
const port = process.env.BACKEND_PORT

app.listen(port, () => console.log(`Server started at port ${port}...`))
app.use(express.json());
app.use('/api/v1/bookings/', bookingRoutes);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))