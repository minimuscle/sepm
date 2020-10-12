import React, { Component } from 'react';
import '../../App.css';

//Boostrap Imports - Design work
import { Container, Row, Form, Button } from 'react-bootstrap';

export default class Tours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: '',
      name: '',
      types: [],
      checked: false,
      tourTypes: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:9000/api/get/tours')
      .then(res => res.json())
      .then(res => {
        if (res && res.data) {
          this.setState({ tours: [...this.state.tours, ...res.data] })
        }
      });

    fetch('http://localhost:9000/api/get/types')
      .then(res => res.json())
      .then(res => {
        if (res && res.data) {
          this.setState({ tourTypes: [...this.state.tourTypes, ...res.data] })
        }
      });

    console.log("Title: " + this.props.title)
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleSubmit = (event) => {
    //event.preventDefault();
    const { name } = this.state

    console.log("DONE, Name: " + name)

    fetch('http://localhost:9000/api/delete/types', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.props.title,
      })
    })

    fetch('http://localhost:9000/api/add/types', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
      })
    })


  }

  renderTours() {
    if (this.state.tours.length <= 0) {
      return <tr><td colSpan="4">Loading...</td></tr>
    } else {
      return (
        this.state.tours.map((val, key) => {
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
        <Row><h1>Edit Tour Types</h1></Row>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="">
            <Form.Label>Tour Type Name:</Form.Label>
            <Form.Control required onChange={this.handleChange} type="text" defaultValue={this.props.title} />
          </Form.Group>
          <Button type="submit">
            Save
            </Button>
        </Form>
      </Container>
    )
  }
}
