import React from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Modal
} from "react-bootstrap";
import './ReservationForm.css';

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      time: '',
      numberOfGuests: ''
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const reservation = {
      name: e.target.name.value || this.props.reservation.name,
      date: e.target.date.value || this.props.reservation.date,
      time: e.target.time.value || this.props.reservation.time,
      numberOfGuests: e.target.numOfGuests.value || this.props.reservation.numberOfGuests,
      image: this.props.reservation.image,
      address: this.props.reservation.address,
      price: this.props.reservation.price,
      _id: this.props.reservation._id,
      __v: this.props.reservation.__v
    }
    this.props.putReservations(reservation);
    this.props.handleCloseForm();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.props.reservation.name);
  };

  render() {
    return (
      <Modal
        className="reservation-form-container"
        show={this.props.showUpdateForm}
        onHide={this.props.handleCloseForm}
        size="xs"
      >
        <Modal.Header>Update Reservation Form</Modal.Header>
        <Modal.Body>
          <Form className="reservation-form" onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormLabel>Restaurant Name:</FormLabel>
              <FormControl
                type="text"
                name="name"
                defaultValue={this.props.reservation.name}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Date:</FormLabel>
              <FormControl
                type="date"
                name="date"
                defaultValue={this.props.reservation.date}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Time:</FormLabel>
              <FormControl
                type="time"
                name="time"
                defaultValue={this.props.reservation.time}
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
                defaultValue={this.props.reservation.numberOfGuests}
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
              <Button onClick={this.props.handleCloseForm} type="reset" className="cancel-button">
                Cancel
              </Button>
                <Button
                  type="submit"
                  className="submit-button"
                >
                  Update Reservation
                </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UpdateForm;
