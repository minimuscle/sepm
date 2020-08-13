import React, { Component } from 'react';
import '../App.css';

//Boostrap Imports - Design work
import { Container, Row, Table } from 'react-bootstrap';

class Tours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: ''
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
  }

  renderTours() {
    if (this.state.tours.length <= 0) {
      return <tr><td colSpan="4">Loading...</td></tr>
    } else {
      return (
        this.state.tours.map((val, key) => {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{val.name}</td>
              <td>{val.locations.join(', ')}</td>
              <td>{val.time}</td>
            </tr>
          )
        }))
    }
  }

  render() {
    return (
      <Container>
          {/** TODO: Add CSS to this instead of the BRs */}
          <Row><h1>Tours</h1><br /><br /><br /></Row>
          <Row md="auto">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Locations</th>
                  <th>Total Time</th>
                </tr>
                {/** TODO: Insert Tour Data here */}
                {this.renderTours()}
              </thead>
            </Table>
          </Row>
        </Container>
    )
  }
}

export default Tours;
