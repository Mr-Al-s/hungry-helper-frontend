import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import adnan from './img/adnan.jpeg';
import luke from './img/luke.jpeg';
import './AboutUs.css';

class About extends Component {
  render() {
    return (
      <div className='card-div'>
        <Card className='card-body'>
          <Card.Img variant='top' src={adnan} className='card-img-top'/>
          <Card.Body className='card-body-text'>
            <Card.Title>Adnan Mohamud</Card.Title>
            <Card.Text>
              "Sometimes I wonder if the whole world's gone crazy. What's the
              point of competing if you don't even wanna win?"
            </Card.Text>
            <Card.Text>
              - Jeff Kinney, <span>Diary of a Wimpy Kid</span>
            </Card.Text>
            <Button
              variant='primary'
              href='https://github.com/adnanm123'
              target='_blank'
            >
              Go to Adnan's GitHub Profile
            </Button>
          </Card.Body>
        </Card>
        <Card className='card-body'>
          <Card.Img variant='top' src={luke} className='card-img-top'/>
          <Card.Body className='card-body-text'>
            <Card.Title>Luke Rogers</Card.Title>
            <Card.Text>
              "Strive to do small things well. Be a doer and a
              self-starter—aggressiveness and initiative are two most admired
              qualities in a leader—but you must also put your feet up and
              think. Strive for self-improvement through constant
              self-evaluation."
            </Card.Text>
            <Card.Text>
              - David H. Hackworth, <span>About Face</span>
            </Card.Text>
            <Button
              variant='primary'
              href='https://github.com/dlukerogers'
              target='_blank'
            >
              Go to Luke's GitHub Profile
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default About;
