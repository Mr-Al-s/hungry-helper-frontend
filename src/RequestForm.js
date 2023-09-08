import React from 'react';
import axios from 'axios';
import { Button, Form } from "react-bootstrap";


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
    }
  }

  handleRequestSubmit = async (e) => {
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;
      
      let cityData = await axios.get(url);
      let lat = cityData.data[0].lat;
      let lon = cityData.data[0].lon;
      let cityDisplayName = cityData.data[0].display_name;
      this.setState({
        lat: lat,
        lon: lon,
        cityDisplayName: cityDisplayName,
        cityData: cityData.data[0] 
      }, 
      () => {
        this.grabRestaurantData(this.state.lat, this.state.lon);
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
    try {
      let restaurant = await axios.get(restaurantData);
      this.setState({restaurant: restaurant.data});
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
      <Form onSubmit={this.handleRequestSubmit} className="modal-content">
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
    )
  }
}

export default RequestForm;
