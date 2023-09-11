import React, { Component } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import './ReservationForm.css'; // Import the CSS file

class ReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      time: '',
      numOfGuests: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the reservation object to send to the parent component
    const reservation = {
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
      numOfGuests: this.state.numOfGuests,
    };

    // Call the onSubmit callback function passed from the parent component
    this.props.onSubmit(reservation);

    // Clear the form fields
    this.setState({
      name: '',
      date: '',
      time: '',
      numOfGuests: '',
    });
  };

  render() {
    return (
      <div className='reservation-form-container' >
      <Form className="reservation-form" onSubmit={this.handleSubmit}>
        <FormGroup>
          <FormLabel>Restaurant Name:</FormLabel>
          <FormControl
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Date:</FormLabel>
          <FormControl
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Time:</FormLabel>
          <FormControl
            type="time"
            name="time"
            value={this.state.time}
            onChange={this.handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Number of Guests:</FormLabel>
          <Form.Select
            name="numOfGuests"
            aria-label="Number of Guests"
            className="form-select"
            value={this.state.numOfGuests}
            onChange={this.handleInputChange}
            required
          >
            <option value="">Choose Number of Guests</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="more than 5">More than 5</option>
          </Form.Select>
        </FormGroup>
        <div className="button-container">
          <Button type="submit" className="submit-button">
            Submit Reservation
          </Button>
          <Button type="reset" className="cancel-button">
            Cancel
          </Button>
        </div>
      </Form>
      </div>
    );
  }
}

export default ReservationForm;
