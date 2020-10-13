import React, { Component } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faCopy } from '@fortawesome/free-solid-svg-icons';

//Boostrap Imports - Design work
import { Container, Table, Button, Modal } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: '',
      name: '',
      show: false
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

  showExtraHeaders() {
    if (this.props.userType == "admin") {
      return (
        <div>
          <div className="title"><h1>Locations</h1>
            <Button className="addBtn" onClick={() => this.changeView('add-location')}>Add New Location</Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Coordinates</th>
                <th>Description</th>
                <th>Time</th>
                <th>Edit</th>
                <th>Copy</th>
                <th>Delete</th>
              </tr>
              {this.renderLocations()}
            </thead>
          </Table>
        </div>
      )
    } else {
      return (
        <div>
          <div className="title"><h1>Locations</h1></div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Coordinates</th>
                <th>Description</th>
                <th>Time</th>
              </tr>
              {this.renderLocations()}
            </thead>
          </Table>
        </div>
      )
    }

  }

  renderLocations() {
    if (this.state.locations.length <= 0) {
      return <tr><td colSpan="4">Loading...</td></tr>
    } else {
      if (this.props.userType == "admin") {
        return (
          this.state.locations.map((val, key) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{val.name}</td>
                <td>{val.coordinates}</td>
                <td>{val.description}</td>
                <td>{val.time}</td>
                <td><Button variant="light" onClick={() => this.editLocation(val.name, val.coordinates, val.description)}><FontAwesomeIcon icon={faEdit} color="gray" /></Button></td>
                <td><Button variant="light" onClick={() => this.copyLocation(val.name, val.coordinates, val.description)}><FontAwesomeIcon icon={faCopy} color="gray" /></Button></td>
                <td><Button variant="danger" onClick={() => this.deleteLocation(val.name)}><FontAwesomeIcon icon={faTimes} /></Button></td>
              </tr>
            )
          }))
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
              </tr>
            )
          }))
      }
    }
  }

  changeView(view) {
    this.props.view(view);
  }

  editLocation(name, coordinates, description) {
    this.props.edit_name(name);
    this.props.edit_coordinates(coordinates);
    this.props.edit_description(description);
    this.props.view('edit-location');
  }

  copyLocation(name, coordinates, description) {
    this.props.edit_name(name);
    this.props.edit_coordinates(coordinates);
    this.props.edit_description(description);
    this.props.view('copy-location');
  }

  deleteLocation(name) {
    this.setState({ name: name });
    this.handleShow();
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleCloseDelete = () => {
    this.setState({ show: false })
    fetch('http://localhost:9000/api/delete/location', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
      })
    })
    window.location.reload();
  }


  render() {
    return (
      <Container>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this location? It cannot be undone!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
          </Button>
            <Button variant="primary" onClick={this.handleCloseDelete}>
              Confirm Deletion
          </Button>
          </Modal.Footer>
        </Modal>
        {this.showExtraHeaders()}
      </Container>
    )
  }
}

export default App;
