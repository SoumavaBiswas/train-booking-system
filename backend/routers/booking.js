const Routers = require("express")
const bookingController = require("../controllers/bookingController")
const routers = Routers()

routers.get("/seats", bookingController.getSeatDetails)
routers.get("/emptyseats", bookingController.getEmptySeats)
routers.post("/bookseat", bookingController.bookSeat)

module.exports = routers