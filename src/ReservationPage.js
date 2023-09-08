import React from "react";
import './ReservationPage.css';
import Card from 'react-bootstrap/Card';

class ReservationPage extends React.Component {
constructor(props) {
super(props);
this.state = {
  
  }
}

render() {

  return (
    <Card style={{ width: '100%' }} className="reservation-page p-1 h-100">
      <Card.Img 
        onClick={this.handleTitleClick}
        variant="top" 
        src={this.props.image_url} 
        alt= {this.props.alt}
        title= {this.props.title}
        />
        <Card.Text>{this.props.name}</Card.Text>
          <Card.Body>
          <Card.Title>{this.props.date}</Card.Title>
          <Card.Text>{this.props.time}</Card.Text>
        </Card.Body>
      </Card>
    );}
}

export default ReservationPage;
