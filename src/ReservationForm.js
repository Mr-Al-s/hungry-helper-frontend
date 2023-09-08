import React, { Component } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';

class ReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      time: '',
      numOfGuests:''
    };
  }

  handleInputChange = (e) => {
    const restaurantName = e.target.name;
    const inputDate = e.target.date;
    const inputTime = e.target.time;
    const inputGuests = e.target.numOfGuests;
    console.log('restaurant details', restaurantName, inputDate, inputTime, inputGuests);
    this.setState({ 
      name: restaurantName,
      date: inputDate,
      time: inputTime,
      numOfGuests: inputGuests
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the reservation object to send to the parent component
    const reservation = {
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
      numOfGuests: this.state.numOfGuests
    };

    // Call the onSubmit callback function passed from the parent component
    this.props.onSubmit(reservation);

    // Clear the form fields
    this.setState({
      name: '',
      date: '',
      time:'',
      numOfGuests:''
    });
  };

  // How to get to the reservation list after the form has been submited

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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
            type="date"
            name="time"
            value={this.state.date}
            onChange={this.handleInputChange}
            required
          />
        </FormGroup>
        <Form.Select name="status" aria-label="Completed" className="form-select">
            <option>Choose Number of Guests</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="more than 5">more than 5</option>
          </Form.Select>
        <Button type="submit">Submit Reservation</Button>
        <Button type="submit">Cancel</Button>
      </Form>
    );
  }
}

export default ReservationForm;
