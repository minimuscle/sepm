import React, { Component } from 'react';
import '../../App.css';

//Boostrap Imports - Design work
import { Container, Row, Form, Button } from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: '',
      name: this.props.name+" Copy",
      coordinates: '',
      description: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleCoordinateChange = (event) => {
    this.setState({ coordinates: event.target.value })
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value })
  }

  handleSubmit = (e) => {
    const { name, description, coordinates } = this.state

    const wordCount = description.match(/(\w+)/g).length;
    const TTStime = Math.floor((wordCount/150)*60);

    fetch('http://localhost:9000/api/add/location', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        coordinates: coordinates,
        description: description,
        time: TTStime.toString()
      })
    })
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

  render() {
    return (
      <Container>
        <Row><h1>Add New Location</h1></Row>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Location Name:</Form.Label>
            <Form.Control required onChange={this.handleNameChange} type="text" defaultValue={this.state.name} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Coordinates:</Form.Label>
            <Form.Control required onChange={this.handleCoordinateChange} type="text" defaultValue={this.props.coordinates} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control required onChange={this.handleDescriptionChange} as="textarea" rows="5" defaultValue={this.props.description} />
          </Form.Group>
          <Button type="submit">
            Add Location
            </Button>
        </Form>
      </Container>
    )
  }
}
