import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './RestaurantModal.css';

// export function withRouter(Children){
//   return(props)=>{
//     const match = {
//       params: useParams(),
//       location: useLocation()
//     };
//     return <Children {...props} match = {match}/>
//   }
// }


// class RestaurantModal extends React.Component {
  
//   openReservationForm = () => {
//     console.log('open reservation form');
//     console.log(this.props);
//     const navigate = useNavigate(); 
//     const onClick = () => { navigate('/reservationform') };
//     onClick();
//     // if (this.props.history) {
//     //   this.props.history.push('/reservationform');
//     // }

//   }
  
  
//   render() {
//     return(
//       <div>
//         <Modal
//           show={this.props.isModalDisplaying}
//           onHide={this.props.handleCloseModal}
//           size='xs'
//           >
//           <Modal.Header closeButton className='modalHeader'>
//             <Modal.Title id="modalTitle">{this.props.restaurantName}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <img src={this.props.restaurantImage} alt={this.props.restaurantName} title={this.props.restaurantName}/>
//             <p>Address: {this.props.restaurantAddress}</p>
//             <p>Price: {this.props.restaurantPrice}</p>
//           </Modal.Body>
//           <div id='buttonDiv'>
//             <Button onClick={this.props.handleCloseModal} id='closeButton'>Back to Request Form</Button>
//             <Button onClick={this.openReservationForm} id='submitButton'>Make Reservation</Button>
//           </div>
//         </Modal>
//       </div>
//     )
//   }
// }

// export default RestaurantModal;

// // export default withRouter(RestaurantModal);

function RestaurantModal(props) {
  const navigate = useNavigate();

  const openReservationForm = () => {
    console.log('open reservation form');
    console.log(props);
    navigate('/reservationform');
  };

  return (
    <div>
      <Modal show={props.isModalDisplaying} onHide={props.handleCloseModal} size='xs'>
        <Modal.Header closeButton className='modalHeader'>
          <Modal.Title id="modalTitle">{props.restaurantName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={props.restaurantImage} alt={props.restaurantName} title={props.restaurantName} />
          <p>Address: {props.restaurantAddress}</p>
          <p>Price: {props.restaurantPrice}</p>
        </Modal.Body>
        <div id='buttonDiv'>
          <Button onClick={props.handleCloseModal} id='closeButton'>Back to Request Form</Button>
          <Button 
          onClick={openReservationForm} 
          id='submitButton'
          >Make Reservation</Button>
        </div>
      </Modal>
    </div>
  );
}

export default RestaurantModal;
