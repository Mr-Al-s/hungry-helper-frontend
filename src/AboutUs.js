import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import adnan from './img/adnan.jpeg';
import luke from './img/luke.jpeg';
import './AboutUs.css';

class About extends Component {
  render() {
    return (
      <div className='about-us-container'>
        <h1 className='page-header'>The Developers</h1>
        <div className='card-div'>
          <Card className='card-body'>
            <Card.Img variant='top' src={adnan} className='card-img-top' />
            <Card.Body className='card-body-text'>
              <Card.Title>Adnan Mohamud</Card.Title>
              <Card.Text>
                Enjoys playing and watching basketball. Likes to build websites during his free time. Traveler enthusiast.
              </Card.Text>
              <div className='button-container'>
                <Button
                  variant='primary'
                  href='https://github.com/adnanm123'
                  target='_blank'
                  className='profile-button'
                >
                  Go to Adnan's GitHub Profile
                </Button>
                <Button
                  variant='primary'
                  href='https://www.linkedin.com/in/adnanmohamud'
                  target='_blank'
                  className='profile-button'
                >
                  Go to Adnan's LinkedIn Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card className='card-body'>
            <Card.Img variant='top' src={luke} className='card-img-top' />
            <Card.Body className='card-body-text'>
              <Card.Title>Luke Rogers</Card.Title>
              <Card.Text>
                Loves anything and everything Sports. Obsessed with competition. If he's not winning, he's not living.
              </Card.Text>
              <div className='button-container'>
                <Button
                  variant='primary'
                  href='https://github.com/dlukerogers'
                  target='_blank'
                  className='profile-button'
                >
                  Go to Luke's GitHub Profile
                </Button>
                <Button
                  variant='primary'
                  href='http://www.linkedin.com/in/dluke-rogers'
                  target='_blank'
                  className='profile-button'
                >
                  Go to Luke's LinkedIn Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default About;
