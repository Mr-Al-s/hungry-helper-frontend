import React from "react";
import "./ReservationPage.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

let SERVER = process.env.REACT_APP_SERVER_URL;
class ReservationPage extends React.Component {


  getReservations = async () => {
    console.log(this.props.reservations);
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
      window.location.reload();
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
      console.log("We have an error;", error.response.data);
    }
  };

  componentDidMount = async () => {
    this.getReservations();
  };

  render() {
    return (
      <div>
        {this.props.reservations ? (
          this.props.reservations.map((reservation) => (
            <Card
              key={reservation._id}
              style={{ width: "100%" }}
              className="reservation-page p-1 h-100"
            >
              <Card.Img
                variant="top"
                src={reservation.restaurantImage}
                alt={reservation.restaurantName}
                title={reservation.restaurantName}
              />
              <Card.Body>
                <Card.Title>{reservation.restaurantName}</Card.Title>
                <Card.Text>{reservation.restaurantAddress}</Card.Text>
                <Card.Text>{reservation.restaurantPrice}</Card.Text>
                <Card.Text>{reservation.date}</Card.Text>
                <Card.Text>{reservation.time}</Card.Text>
              </Card.Body>
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
