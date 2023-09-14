import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Modal
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReservationPage from "./ReservationPage";
import "./ReservationForm.css"; // Import the CSS file
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

let SERVER = process.env.REACT_APP_SERVER
class ReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      time: "",
      numOfGuests: "",
      reservations: []
    };
  }

  /* TODO: Make a GET request to your API to fetch all the reservations from the database  */



  postReservations = async (newReservation) => {
    try{
       // get token
       const res = await this.props.auth0.getIdTokenClaims();
       // extract the raw token
       const jwt = res.__raw;
       console.log(jwt);
       const config = {
         headers: {"Authorization" : `Bearer ${jwt}`}
       }
      let url = `${SERVER}/reservations`;
      let createdReservation = await axios.post(url, newReservation, config);
      console.log('created reservation', createdReservation);
      // this.getBooks();
      this.setState({
        reservations: [...this.state.reservations, createdReservation.data]
      });
    } catch(error) {
      console.log('We have an error;', error.response.data);
    }
  }




  openReservationPage = (e) => {
    // console.log('open reservation form');
    // console.log(this.props);
    console.log(e);
    this.setState({
      makeSubmitReservationButtonClicked: true,
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.props.restaurantName);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('handle submit event', e);

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
      name: "",
      date: "",
      time: "",
      numOfGuests: "",
    });
  };

  render() {
    return (
      <Modal
        className="reservation-form-container"
        show={this.props.isPageDisplaying}
        onHide={this.props.handleCloseForm}
        size="xs"
      >
        <Modal.Header>Reservation Form</Modal.Header>
        <Modal.Body>
          <Form className="reservation-form" onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormLabel>Restaurant Name:</FormLabel>
              <FormControl
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                placeholder={this.props.restaurantName}
                required
                // readOnly
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
              <Button onClick={this.props.handleCloseForm} type="reset" className="cancel-button">
                Cancel
              </Button>
              <Link to="/reservations">
                <Button
                  // onClick={this.openReservationPage}
                  type="submit"
                  className="submit-button"
                >
                  Submit Reservation
                </Button>
              </Link>
            </div>
          </Form>
        </Modal.Body>
        {this.state.makeSubmitReservationButtonClicked ? (
          <ReservationPage
            reservations={this.state.reservations} // Pass reservation data as a prop
            openReservationPage={this.openReservationPage}
            restaurant={this.props.restaurant}
          />
        ) : null}
      </Modal>
    );
  }
}

export default withAuth0(ReservationForm);
