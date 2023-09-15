import React from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import { withAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import "./ReservationPage.css";

let SERVER = process.env.REACT_APP_SERVER_URL;
class ReservationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      showUpdateReservation: false,
      reservationToUpdate: null
    }

  }

  getReservations = async () => {
    console.log(this.props.auth0.isAuthenticated);
    if (this.props.auth0.isAuthenticated) {
      try {
        // get token
        const res = await this.props.auth0.getIdTokenClaims();
        // extract the raw token
        const jwt = res.__raw;
        console.log(jwt);
        const config = {
          method: "get",
          baseURL: SERVER,
          url: "/reservations",
          headers: { Authorization: `Bearer ${jwt}` },
        };
        const results = await axios(config);
        // let results = await axios.get(`${SERVER}/books`);
        console.log(results);
        this.setState(
          {
            reservations: results.data,
          },
          () => {
            console.log("state updated", this.state.reservations);
          }
        );
      } catch (error) {
        console.log("We have an error;", error);
      }
    }
  };

  deleteReservations = async (id) => {
    try {
      let url = `${SERVER}/reservations/${id}`;
      await axios.delete(url);
      let updatedReservations = this.state.reservations.filter(
        (reservation) => reservation._id !== id
      );
      this.setState({
        reservations: updatedReservations,
      });
      // window.location.reload();
    } catch (error) {
      console.log("We have an error;", error.response.data);
    }
  };

  putReservations = async (reservationToUpdate) => {
    try {
      let url = `${SERVER}/reservations/${reservationToUpdate._id}`;
      let updatedReservation = await axios.put(url, reservationToUpdate);
      let updatedReservations = this.state.reservations.map(
        (existingReservation) => {
          return existingReservation._id === reservationToUpdate._id
            ? updatedReservation.data
            : existingReservation;
        }
      );
      this.setState({
        reservations: updatedReservations,
      });
    } catch (error) {
      console.log("We have an error;", error);
    }
  };

  showUpdateForm = (reservationToBeUpdated) => {
    this.setState({
      reservationToUpdate: reservationToBeUpdated,
      showUpdateReservation: true
    })
  }

  handleCloseForm = () => {
    this.setState({
      showUpdateReservation: false,
    })
  }

  componentDidMount = async () => {
    setTimeout(() => {
      this.getReservations();
    }, 850)
  };

  render() {
    return (
      <div className="card-container">
        {this.state.reservations.length > 0 ? (
          this.state.reservations.map((reservation) => (
            <Card 
              key={reservation._id}
              className="reservation-card p-1"
            >
              <Card.Body id="res-card-body">
                <Card.Img
                  variant="top"
                  src={reservation.image}
                  alt={reservation.name}
                  title={reservation.name}
                  className="res-card-img"
                />
                  <Card.Title className="res-card-title">{reservation.name}</Card.Title>
                  <Card.Text className="res-card-text">Address: {reservation.address}</Card.Text>
                  <Card.Text className="res-card-text">Price: {reservation.price}</Card.Text>
                  <Card.Text className="res-card-text">Date: {reservation.date}</Card.Text>
                  <Card.Text className="res-card-text">Time: {reservation.time}</Card.Text>
                  <Card.Text className="res-card-text">Number of Guests: {reservation.numberOfGuests}</Card.Text>
              </Card.Body>
              <div id="res-button-container">
                <Button onClick={() => this.deleteReservations(reservation._id)} variant="danger" className="delete-button">Delete</Button>
                {this.state.showUpdateReservation ? <UpdateForm putReservations={this.putReservations} showUpdateForm={this.showUpdateForm} handleCloseForm={this.handleCloseForm} reservation={this.state.reservationToUpdate} /> : <Button id="update-button" showUpdateForm={this.showUpdateForm} reservation={reservation} onClick={() => this.showUpdateForm(reservation)}>Edit</Button>}
              </div>
            </Card>
          ))
        ) : (
          <h3>No Reservations</h3>
        )}
      </div>
    );
  }
}

export default withAuth0(ReservationPage);
