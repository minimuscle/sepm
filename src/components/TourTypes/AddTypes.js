import React, { Component } from 'react';
import '../../App.css';

//Boostrap Imports - Design work
import { Container, Row, Form, Button } from 'react-bootstrap';

const tourList = [];
export default class Tours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: '',
      name: '',
      types: [],
      checked: false
    }
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value })
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
        tourList.push(newType)
      })
    } else if (!event.target.checked) {
      const newType = event.target.value
      this.setState({ checked: event.target.checked}, () => {
        tourList.splice(tourList.indexOf(newType), 1)
      })
    }
  }

  handleSubmit = () => {
    const { name } = this.state

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

    console.log("DONE, Name: " + name, tourList)
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
        <Row><h1>Add New Tour Types</h1></Row>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="">
            <Form.Label>Tour Type Name:</Form.Label>
            <Form.Control required onChange={this.handleChange} type="text" placeholder="Farmdale Primary School" />
          </Form.Group>
          <Button type="submit">
            Add Tour Type
            </Button>
        </Form>
      </Container>
    )
  }
}
