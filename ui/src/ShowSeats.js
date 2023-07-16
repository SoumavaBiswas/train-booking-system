import axios from "axios"
import { useEffect, useState } from "react"

const ShowAllSeats = () => {
    let prev_row = 1
    const [seats, setSeats] = useState([])
    useEffect(() => {
        axios.get('/seats').then((res) => {
            setSeats(res.data)

        }).catch((error) => { console.log(error) })
    }, [])
    return (
        <div className="seats">
            {seats.map((seat) => {
                const { row_no, seat_no, available } = seat
                let key = row_no + seat_no

                if (available === false) {
                    if (prev_row < row_no) {
                        prev_row += 1
                        return (<div className="seat"><br /><div className="seat" key={key} style={{ backgroundColor: "gray" }}>{row_no}{seat_no}</div></div>)

                    }
                    else {
                        return (
                            <div className="seat"><div className="seat" key={key} style={{ backgroundColor: "gray" }}>{row_no}{seat_no}</div></div>
                        )
                    }
                }
                else {
                    if (prev_row < row_no) {
                        prev_row += 1
                        return (<div className="seat"><br /><div className="seat" key={key} style={{ backgroundColor: "green" }}>{row_no}{seat_no}</div></div>)

                    }
                    else {
                        return (
                            <div className="seat"><div className="seat" key={key} style={{ backgroundColor: "green" }}>{row_no}{seat_no}</div></div>
                        )
                    }
                }

            })}
        </div>
    )
}

export { ShowAllSeats }

