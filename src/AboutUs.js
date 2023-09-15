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
          <Card>
            <Card.Img variant='top' src={adnan} className='about-card-img-top' />
            <Card.Body className='about-card-body'>
              <Card.Title className='about-card-title'>Adnan Mohamud</Card.Title>
              <Card.Text className='about-card-text'>
                Enjoys playing and watching basketball. Likes to build websites during his free time. Traveler enthusiast.
              </Card.Text>
              <div className='button-container'>
                <Button
                  variant='primary'
                  href='https://github.com/adnanm123'
                  target='_blank'
                  className='profile-button'
                >
                  GitHub
                </Button>
                <Button
                  variant='primary'
                  href='https://www.linkedin.com/in/adnanmohamud'
                  target='_blank'
                  className='profile-button'
                >
                  LinkedIn
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant='top' src={luke} className='card-img-top' />
            <Card.Body className='about-card-body'>
              <Card.Title className='about-card-title'>Luke Rogers</Card.Title>
              <Card.Text className='about-card-text'>
                Loves anything and everything Sports. Obsessed with competition. If he's not winning, he's not living.
              </Card.Text>
              <div className='button-container'>
                <Button
                  variant='primary'
                  href='https://github.com/dlukerogers'
                  target='_blank'
                  className='profile-button'
                >
                  GitHub
                </Button>
                <Button
                  variant='primary'
                  href='http://www.linkedin.com/in/dluke-rogers'
                  target='_blank'
                  className='profile-button'
                >
                  LinkedIn
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
