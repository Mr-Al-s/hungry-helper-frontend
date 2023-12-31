import React from 'react';
import axios from 'axios';
import RestaurantModal from './RestaurantModal';
import { Button, Form } from "react-bootstrap";
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
      food: '',
      isModalDisplaying: false
    }
  }

  handleRequestSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      cityName: e.target[0].value
    });
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${e.target[0].value}&format=json`;
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
        food: e.target[1].value
      }, 
      () => {
        this.grabRestaurantData(lat, lon);
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
    let restaurantData = `${process.env.REACT_APP_SERVER}/restaurant?lat=${lat}&lon=${lon}`;
    try {
      const res = await this.props.auth0.getIdTokenClaims();
       const jwt = res.__raw;
       const config = {
         headers: {"Authorization" : `Bearer ${jwt}`}
       }
      let restaurant = await axios.get(restaurantData, config);
      this.setState({
        restaurant: restaurant.data,
        price: this.state.price,
        food: this.state.food
      });
      let filteredForPrice = restaurant.data.filter(restaurant => restaurant.price === this.state.price);
      console.log(filteredForPrice);
      console.log(this.state.food);
      let filteredForFood = filteredForPrice.filter(restaurant => {
        return restaurant.food.some(food => food.alias.includes(this.state.food));
      });
      
      console.log(filteredForFood);
      if (filteredForFood.length >= 1) {
      //   let criteria = typeOfFood;
      //   let data = JSON.stringify(filteredForPrice);
      //   let results = await axios.post(`${process.env.REACT_APP_SERVER}/filteredRestaurant`, { criteria, data });
      //   let filteredData = results.data.filteredData
      //   const startIndex = filteredData.indexOf(':') + 1;
      //   const jsonData = filteredData.slice(startIndex);
      //   console.log(jsonData);
      //   try {
      //     const dataArray = JSON.parse(jsonData);
        
      //     if (Array.isArray(dataArray) && dataArray.length > 0) {
      //       const restaurantInfo = dataArray.map(restaurant => ({
      //         image_url: restaurant.image_url,
      //         name: restaurant.name,
      //         address: restaurant.address,
      //         price: restaurant.price
      //       }));
        let randomRestaurantIndex = Math.floor(Math.random() * filteredForFood.length);
        let randomRestaurant = filteredForFood[randomRestaurantIndex];
        this.setState({ restaurant: randomRestaurant });
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
            phone={this.state.restaurant.phone}
            handleCloseModal={this.handleCloseModal}
            restuarant={this.state.restaurant}
          />) : (<p>No restaurants found</p>)
        }
      </div>
    )
  }
}

export default withAuth0(RequestForm);
