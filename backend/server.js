const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const bookingRoutes = require('./routers/booking')
const app = express()
const port = 5000

app.listen(port, () => console.log(`Server started at port ${port}...`))
app.use(express.json());
app.use('/api/v1/bookings/', bookingRoutes);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))