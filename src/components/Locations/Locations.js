import React, { Component } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

//Boostrap Imports - Design work
import { Container, Row, Table, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: ''
    }
  }

  //This "fetches" the API which is set up to get the tours json data
  componentDidMount() {
    fetch('http://localhost:9000/api/get/locations')
      .then(res => res.json())
      .then(res => {
        if (res && res.data) {
          this.setState({ locations: [...this.state.locations, ...res.data] })
        }
      });
  }

  renderLocations() {
    if (this.state.locations.length <= 0) {
      return <tr><td colSpan="4">Loading...</td></tr>
    } else {
      return (
        this.state.locations.map((val, key) => {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{val.name}</td>
              <td>{val.coordinates}</td>
              <td>{val.description}</td>
              <td>{val.time}</td>
              <td><Button variant="light" onClick={() => this.editTour(val.name)}><FontAwesomeIcon icon={faEdit} color="gray" /></Button></td>
              <td><Button variant="danger" onClick={() => this.deleteTour(val.name)}><FontAwesomeIcon icon={faTimes} /></Button></td>
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
        <Row><h1>Locations</h1></Row>
        <Button onClick={() => this.changeView('add-location')}>Add New Location</Button>
        {/*<Button onClick={() => this.changeView('edit-tour')}>Edit Tour</Button>*/}
        <Row md="auto">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Coordinates</th>
                <th>Description</th>
                <th>Time</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {/** TODO: Insert Tour Data here */}
              {this.renderLocations()}
            </thead>
          </Table>
        </Row>
      </Container>
    )
  }
}

export default App;
