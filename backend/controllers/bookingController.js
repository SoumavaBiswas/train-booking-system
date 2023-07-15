const pool = require('../db')
const queryStrings = require('./queries')


const getEmptySeats = (req, res) => {
    pool.query(queryStrings.emptySeatDetailsQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}

const getSeatDetails = (req, res) => {
    pool.query(queryStrings.getSeatDetailsQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}

const bookSeat = (req, res) => {
    const { requiredSeats } = req.body
    console.log(`Method called with ${requiredSeats}`)
    if (requiredSeats > 7) {
        res.send({ "detail": "Can't book more than 7 seats!" })
    }
    else {
        let bookedSeats = []
        // Finding out available seats per row
        pool.query(queryStrings.getAvailableSeatByRow, (error, result) => {
            if (error) throw error
            let required_more = requiredSeats
            let required_rows = []
            for (row of result.rows) {
                if (required_more > 0) {
                    required_rows.push(row["row_no"])
                    required_more -= row["count"]
                }
            }
            // Checking if enough seats are available. If not, booking will not happen.
            if (required_more > 0) {
                res.send({ "detail": "Not enough seats available" })
            }
            else {
                // rows will contain the row number(s) where seats are going to be booked
                let rows = required_rows.map(function (row_no) { return row_no; }).join(",");
                let query = queryStrings.getToBeBookedSeats.replace("{$rows}", rows)
                // Finding out seat numbers associated with selected rows
                pool.query(query, [requiredSeats], (err, result) => {
                    if (err) throw err;
                    for (seat of result.rows) {
                        bookedSeats.push(seat["row_no"] + seat["seat_no"])
                    }
                    // Marking those rows are not available for future
                    for (seat of bookedSeats) {
                        let [row_no, seat_no] = seat.split("")
                        pool.query(queryStrings.updateSeatToBooked, [row_no, seat_no], (err, result) => {
                            if (err) throw err;

                        })
                    }
                    res.send(bookedSeats)
                })
            }
        })
    }
}
module.exports = { getEmptySeats, getSeatDetails, bookSeat }