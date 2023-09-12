import React from 'react';
import axios from 'axios';
import { Button, Form } from "react-bootstrap";
import './RequestForm.css';

class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      lat: '',
      lon: '',
      cityDisplayName: '',
      error: false,
      errorMessage: '',
      restaurant: [],
      restaurantError: '',
      price: ''
    }
  }

  handleRequestSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      cityName: e.target[0].value
    });
    console.log(e.target[0].value);
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${e.target[0].value}&format=json`;

    console.log(url);
    try {
      
      let cityData = await axios.get(url);
      let lat = cityData.data[0].lat;
      let lon = cityData.data[0].lon;
      let cityDisplayName = cityData.data[0].display_name;
      this.setState({
        lat: lat,
        lon: lon,
        cityDisplayName: cityDisplayName,
        cityData: cityData.data[0],
        price: e.target.price,
      }, 
      () => {
        console.log(lat, lon);
        this.grabRestaurantData(lat, lon);
        this.generateRandomRestaurant()
      }
      )
      
    } catch(error) {
      console.log('error: ', error);
      console.log('error.message: ', error.message)
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${error.response ? error.response.status : error.message}`
      });
    }
  }

  grabRestaurantData = async (lat, lon) => {
    let restaurantData = `${process.env.REACT_APP_SERVER_URL}/restaurant?lat=${lat}&lon=${lon}`;
    console.log(restaurantData);
    try {
      let restaurant = await axios.get(restaurantData);
      console.log(restaurant);
      this.setState({restaurant: restaurant.data});
      this.setState({price: this.state.price});
      let filteredForPrice = restaurant.filter(restaurant => restaurant.price === this.state.price);
      console.log(filteredForPrice);
    } catch (error) {
      console.log (`There is an error finding restaurants for the searched location: ${error.message}`);
      this.setState({restaurantError: error.response.data});
    }
  }

  generateRandomRestaurant = () => {
    return Math.floor(Math.random() * this.state.restaurant.length);
  }

  // renderRestaurant = () => {
  // }

  render() {
    return (
      <div className="request-form-page">
      <Form onSubmit={this.handleRequestSubmit} className="request-form-container">
          <Form.Group controlId="location" className="form-group">
            <Form.Label className="form-label">Location</Form.Label>
            <Form.Control className="form-control" type="text" />
          </Form.Group>
          <Form.Group controlId="typeOfFood" className="form-group">
            <Form.Label className="form-label">Type of Food</Form.Label>
            <Form.Control type="text" className="form-control" />
          </Form.Group>
          <Form.Select name="price" aria-label="$" className="form-select">
            <option>Select a price</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </Form.Select>
          <Button type="submit" className="form-submit-button" >Find Restaurant</Button>
        </Form>
        </div>
    )
  }
}

export default RequestForm;
