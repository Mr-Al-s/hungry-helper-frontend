import React from "react";
import ReservationForm from "./ReservationForm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import { Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import "./RestaurantModal.css";

class RestaurantModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPageDisplaying: false,
      makeReservationButtonClicked: false,
      name: ''
    };
  }


  // openReservationForm = (e) => {
  //  e.preventDefault();
  //   console.log('open reservation form');
  //   console.log(this.props);
  //   this.setState({
  //     isPageDisplaying: true,
  //     name: this.props.restaurantName
  //   });
  //   console.log(this.state.name);
  // };

  handleShowForm = () => {
    this.setState({
      isPageDisplaying: true,
    })
  }

  handleCloseForm = () => {
    this.setState({
      isPageDisplaying: false,
    })
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.isModalDisplaying}
          onHide={this.props.handleCloseModal}
          size="xs"
        >
          <Modal.Header closeButton className="modalHeader">
            <Modal.Title id="modalTitle">
              {this.props.restaurantName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={this.props.restaurantImage}
              alt={this.props.restaurantName}
              title={this.props.restaurantName}
            />
            <p>Address: {this.props.restaurantAddress}</p>
            <p>Price: {this.props.restaurantPrice}</p>
          </Modal.Body>
          <div id="buttonDiv">
            <Button onClick={this.props.handleCloseModal} id="closeButton">
              Back to Request Form
            </Button>
            {/* <Link
              to={{
                pathname: "/reservationform",
                state: { restaurantName: this.props.restaurantName }, // Pass restaurantName as state
              }}
            >
              <Button id="submitButton">Make Reservation</Button>
            </Link> */}
             <Button onClick={this.handleShowForm} id="submitButton">Make Reservation</Button>
          </div>
        </Modal>
        {this.state.isPageDisplaying ? 
        <ReservationForm
          handleShowForm={this.handleShowForm}
          handleCloseForm={this.handleCloseForm}
          isPageDisplaying={this.state.isPageDisplaying}
          restaurantName={this.props.restaurantName}
          restaurantImage={this.props.restaurantImage}
          restaurantAddress={this.props.restaurantAddress}
          restaurantPrice={this.props.restaurantPrice}
          restaurant={this.props.restaurant}
        /> : null
        }
      </div>
    );
  }
}

export default withAuth0(RestaurantModal);
