import React from 'react';
import axios from 'axios';
import RestaurantModal from './RestaurantModal';
import { Button, Form } from "react-bootstrap";
// import { getIdTokenSilently } from '@auth0/auth0-react';
import { withAuth0 } from '@auth0/auth0-react';
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
      price: '',
      typeOfFood: '',
      isModalDisplaying: false
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
        price: e.target[2].value,
        typeOfFood: e.target[1].value
      }, 
      () => {
        console.log(e.target[2].value);
        this.grabRestaurantData(lat, lon, this.state.typeOfFood);
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

  grabRestaurantData = async (lat, lon, typeOfFood) => {
    let restaurantData = `${process.env.REACT_APP_SERVER_URL}/restaurant?lat=${lat}&lon=${lon}`;
    console.log(restaurantData);
    try {

      
// bring over auth token with request see reservation form for example!

      let restaurant = await axios.get(restaurantData);
      console.log(restaurant);
      this.setState({restaurant: restaurant.data});
      console.log(restaurant);
      this.setState({price: this.state.price});
      console.log(this.state.price);
      let filteredForPrice = restaurant.data.filter(restaurant => restaurant.price === this.state.price);
      console.log(filteredForPrice);
      let filteredForPriceName = filteredForPrice.map(restaurant => {
        return {
          name: restaurant.name,
          address: restaurant.address
        };
      });
      console.log(filteredForPriceName);
      if (filteredForPrice.length) {
        let criteria = typeOfFood;
        let data = filteredForPriceName;
        let newRestaurants = await axios.post(`${process.env.REACT_APP_SERVER_URL}/filteredRestaurant?criteria=${criteria}&data=${data}`);
        console.log(newRestaurants);
        let randomRestaurantIndex = Math.floor(Math.random() * filteredForPrice.length);
        console.log(randomRestaurantIndex);
        let randomRestaurant = filteredForPrice[randomRestaurantIndex];
        console.log(randomRestaurant.name);
        console.log(randomRestaurant);
        this.setState({ restaurant: randomRestaurant });
        console.log(restaurant);
      } else {
        this.setState({restaurant: null})
      }
    } catch (error) {
      console.log (`There is an error finding restaurants for the searched location: ${error.message}`);
      console.log(error);
      this.setState({restaurantError: error});
    }
  }
  
  handleShowModal = () => {
    this.setState({
      isModalDisplaying: true,
    })
  }

  handleCloseModal = () => {
    this.setState({
      isModalDisplaying: false,
    })
  }

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
          <Button type="submit" className="form-submit-button" onClick={this.handleShowModal} >Find Restaurant</Button>
        </Form>
        {this.state.restaurant ? 
          (<RestaurantModal
            isModalDisplaying={this.state.isModalDisplaying}
            restaurantName={this.state.restaurant.name}
            restaurantImage={this.state.restaurant.image_url}
            restaurantAddress={this.state.restaurant.address}
            restaurantPrice={this.state.restaurant.price}
            handleCloseModal={this.handleCloseModal}
            restuarant={this.state.restaurant}
          />) : (<p>No restaurants found</p>)
        }
      </div>
    )
  }
}

export default withAuth0(RequestForm);
