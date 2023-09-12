import React from 'react';
import ReservationForm from './ReservationForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import './RestaurantModal.css';

export function withRouter(Children){
  return(props)=>{
    const match = {params: useParams()};
    return <Children {...props} match = {match}/>
  }
}

class RestaurantModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isPageDisplaying: false
    }
  }

  openReservationForm = () => {
    console.log('open reservation form');
    console.log(this.props);
  }

  render() {
    return(
      <div>
        <Modal
          show={this.props.isModalDisplaying}
          onHide={this.props.handleCloseModal}
          size='xs'
        >
          <Modal.Header closeButton className='modalHeader'>
            <Modal.Title id="modalTitle">{this.props.restaurantName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={this.props.restaurantImage} alt={this.props.restaurantName} title={this.props.restaurantName}/>
            <p>Address: {this.props.restaurantAddress}</p>
            <p>Price: {this.props.restaurantPrice}</p>
          </Modal.Body>
          <div id='buttonDiv'>
            <Button onClick={this.props.handleCloseModal} id='closeButton'>Back to Request Form</Button>
            <Button onClick={this.openReservationForm} id='submitButton'>Make Reservation</Button>
          </div>
        </Modal>
        {this.state.isPageDisplaying ? 
        <ReservationForm
          openReservationForm={this.openReservationForm}
        /> : null
        }
      </div>
    )
  }
}

export default withRouter(RestaurantModal);
