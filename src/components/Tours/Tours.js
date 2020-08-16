import React, { Component } from 'react';
import '../../App.css';

//Boostrap Imports - Design work
import { Container, Row, Table, Button } from 'react-bootstrap';

class Tours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: ''
    }
  }

  //This "fetches" the API which is set up to get the tours json data
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

  changeView(view) {
    this.props.view(view);
  }

  render() {
    return (
      <Container>
        <Row><h1>Tours</h1></Row>
        <Button onClick={() => this.changeView('add-tour')}>Add New Tour</Button>
    {/*<Button onClick={() => this.changeView('edit-tour')}>Edit Tour</Button>*/}
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
