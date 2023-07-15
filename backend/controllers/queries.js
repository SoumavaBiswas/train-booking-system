const getSeatDetailsQuery = "SELECT * FROM bookings ORDER BY ROW_NO, SEAT_NO;"
const emptySeatDetailsQuery = "SELECT ROW_NO, SEAT_NO FROM bookings WHERE AVAILABLE=true;"
const getAvailableSeatByRow = "SELECT row_no, COUNT(available) FROM bookings WHERE available=true GROUP BY row_no ORDER BY count desc, row_no;"
const getToBeBookedSeats = "SELECT ROW_NO, SEAT_NO FROM bookings WHERE ROW_NO IN ({$rows}) AND AVAILABLE=true LIMIT $1"
const updateSeatToBooked = "UPDATE bookings SET AVAILABLE=false WHERE ROW_NO=$1 AND SEAT_NO=$2"


module.exports = { getSeatDetailsQuery, emptySeatDetailsQuery, getAvailableSeatByRow, getToBeBookedSeats, updateSeatToBooked }