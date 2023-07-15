import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';




const BokingForm = () => {
    const data = { "requiredSeats": 0 }
    const [requiredSeats, setRequiredSeats] = useState(data)
    const [msg, setMsg] = useState("")

    const ShowAlert = () => {
        if (msg !== "") return alert(msg)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post('/bookSeat', requiredSeats).then((response) => {
            if (response.data['detail'] === undefined) {
                //<ShowSeats title={"Booking successful :)"} msg={`Booked seats are ${response.data.toString()}`} />
                setMsg(`Booked seats are ${response.data.toString()}`)
            }
            else {
                //<ShowSeats title={"Booking unsuccessful :("} msg={`Booked seats are ${response.data.detail}`} />
                setMsg(response.data.detail)
            }
            window.location.reload();
        })

    }

    return (
        <div className="form">
            <Form onSubmit={handleSubmit}>
                <div className='single'>
                    <Form.Group className='form-elem' style={{ width: "35vw" }}>
                        <Form.Control type="number" defaultValue={0}
                            placeholder="Enter the number of seats you want to book" name='requiredSeats' onChange={(e) => setRequiredSeats({ ...requiredSeats, [e.target.name]: e.target.value })} />
                    </Form.Group>
                    <Form.Group className='form-elem' style={{ width: "10vw" }}>
                        <Button className="button" variant="success" type="submit">
                            Book now
                        </Button>
                    </Form.Group>
                </div>
            </Form>
            <ShowAlert />

        </div>
    )
}

export default BokingForm;
