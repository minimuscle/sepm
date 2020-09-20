import React, { Component } from 'react';
import '../../App.css';

//Boostrap Imports - Design work
import { Container, Row, Form, Button } from 'react-bootstrap';

const locationList = [];
export default class Tours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: '',
      types: '',
      name: '',
      types: [],
      checked: false,
      radio: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:9000/api/get/locations')
      .then(res => res.json())
      .then(res => {
        if (res && res.data) {
          this.setState({ locations: [...this.state.locations, ...res.data] })
        }
      });

    fetch('http://localhost:9000/api/get/types')
      .then(res => res.json())
      .then(res => {
        if (res && res.data) {
          this.setState({ types: [...this.state.types, ...res.data] })
        }
      });
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleRadioChange = (event) => {
    this.setState({ radio: event.target.value })
  }

  handleCheckChange = (event) => {

    /*Setstate is not an immediate thing. Because of this, a function as a callback must be passed
    This means that they will be completed AFTER the state has been set. A new variable must be set
    because the "event" is not passed through to the callback function
    */
    if (event.target.checked) {
      const newType = event.target.value
      this.setState({ checked: event.target.checked }, () => {
        console.log(newType)
        locationList.push(newType)
      })
    } else if (!event.target.checked) {
      const newType = event.target.value
      this.setState({ checked: event.target.checked }, () => {
        locationList.splice(locationList.indexOf(newType), 1)
      })
    }
  }

  handleSubmit = () => {
    const { name, radio } = this.state

    fetch('http://localhost:9000/api/add/tour', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        type: radio,
        locations: locationList,
        time: '8'
      })
    })

    console.log("DONE, Name: " + name, locationList)
  }


  renderLocations() {
    if (this.state.locations.length <= 0) {
      return <tr><td colSpan="4">Loading...</td></tr>
    } else {
      return (
        this.state.locations.map((val, key) => {
          return (
            <Form.Check
              type="checkbox"
              value={val.name}
              onChange={this.handleCheckChange}
              id={key}
              label={val.name}
            />
          )
        }))
    }
  }

  renderTourTypes() {
    if (this.state.types.length <= 0) {
      return <tr><td colSpan="4">Loading...</td></tr>
    } else {
      return (
        this.state.types.map((val, key) => {
          return (
            <Form.Check
              type="radio"
              value={val.name}
              checked={this.state.radio === val.name}
              onChange={this.handleRadioChange}
              id={key}
              label={val.name}
            />
          )
        }))
    }
  }

  render() {
    return (
      <Container>
        <Row><h1>Add New Tours</h1></Row>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="">
            <Form.Label>Tour Type Name:</Form.Label>
            <Form.Control required onChange={this.handleChange} type="text" placeholder="Farmdale Primary School" />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label>Locations:</Form.Label>
            {['checkbox'].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                {this.renderLocations()}
              </div>
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Label>Tour Type:</Form.Label>
            {['radio'].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                {this.renderTourTypes()}
              </div>
            ))}
          </Form.Group>
          {this.state.radio}
          <Button type="submit">
            Add Tour Type
            </Button>
        </Form>
      </Container>
    )
  }
}
