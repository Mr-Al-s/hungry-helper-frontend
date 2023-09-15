import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Modal
} from "react-bootstrap";
import ReservationPage from "./ReservationPage";
import "./ReservationForm.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

let SERVER = process.env.REACT_APP_SERVER_URL
class ReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      time: "",
      numberOfGuests: "",
      reservations: []
    };
  }



  postReservations = async (newReservation) => {
    try{
       const res = await this.props.auth0.getIdTokenClaims();
       const jwt = res.__raw;
       const config = {
         headers: {"Authorization" : `Bearer ${jwt}`}
       }
      let url = `${SERVER}/reservations`;
      let createdReservation = await axios.post(url, newReservation, config);
      this.setState({
        reservations: [...this.state.reservations, createdReservation.data]
      });
      if (createdReservation.status === 200) {
        this.props.navigate('/reservations');
      }
    } catch(error) {
      console.log('We have an error;', error);
    }
  }




  openReservationPage = (e) => {
    this.setState({
      makeSubmitReservationButtonClicked: true,
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const reservation = {
      name: e.target.name.value,
      date: e.target.date.value,
      time: e.target.time.value,
      numberOfGuests: e.target.numOfGuests.value,
      image: this.props.restaurantImage,
      address: this.props.restaurantAddress,
      price: this.props.restaurantPrice
    };

    this.postReservations(reservation);

    this.setState({
      name: "",
      date: "",
      time: "",
      numberOfGuests: "",
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
                defaultValue={this.props.restaurantName}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Date:</FormLabel>
              <FormControl
                type="date"
                name="date"
                defaultValue={this.state.date}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Time:</FormLabel>
              <FormControl
                type="time"
                name="time"
                defaultValue={this.state.time}
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
                defaultValue={this.state.numberOfGuests}
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
                  Submit Reservation
                </Button>
            </div>
          </Form>
        </Modal.Body>
        {this.state.makeSubmitReservationButtonClicked ? (
          <ReservationPage
            reservations={this.state.reservations}
            openReservationPage={this.openReservationPage}
            restaurant={this.props.restaurant}
          />
        ) : null}
      </Modal>
    );
  }
}

export default withAuth0(FormWithNavigate);
function FormWithNavigate(props) {
  const navigate = useNavigate();
  return <ReservationForm {...props} navigate={navigate} />
}
