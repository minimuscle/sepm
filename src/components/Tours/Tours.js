import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faCopy } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

//Boostrap Imports - Design work
import { Container, Table, Button, Modal } from 'react-bootstrap';


class Tours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: '',
      show: false,
      delete: false,
      name: ''
    }
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleCloseDelete = () => {
    this.setState({ show: false })
    fetch('http://localhost:9000/api/delete/tour', {
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

  showExtraHeaders() {
    if (this.props.userType == "admin") {
      return (
        <div>
          <div className="title"><h1>Tours</h1>
            <Button className="addBtn" onClick={() => this.changeView('add-tour')}>Add New Tour</Button></div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Locations</th>
                <th>Types</th>
                <th>Total Time</th>
                <th>Edit</th>
                <th>Copy</th>
                <th>Delete</th>
              </tr>
              {this.renderTours()}
            </thead>
          </Table>
        </div>
      )
    } else {
      return (
        <div>
          <div className="title"><h1>Tours</h1></div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Locations</th>
                <th>Types</th>
                <th>Total Time</th>
              </tr>
              {this.renderTours()}
            </thead>
          </Table>
        </div>
      )
    }
  }

  renderTours() {
    if (this.state.tours.length <= 0) {
      return <tr><td colSpan="4">Loading...</td></tr>
    } else {
      if (this.props.userType == "admin") {
        return (
          this.state.tours.map((val, key) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{val.name}</td>
                <td>{val.locations.join(', ')}</td>
                <td>{val.type}</td>
                <td>{val.time}</td>
                <td><Button variant="light" onClick={() => this.editTour(val.name)}><FontAwesomeIcon icon={faEdit} color="gray" /></Button></td>
                <td><Button variant="light" onClick={() => this.copyTour(val.name)}><FontAwesomeIcon icon={faCopy} color="gray" /></Button></td>
                <td><Button variant="danger" onClick={() => this.deleteTour(val.name)}><FontAwesomeIcon icon={faTimes} /></Button></td>
              </tr>
            )
          }))
      } else {
        return (
          this.state.tours.map((val, key) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{val.name}</td>
                <td>{val.locations.join(', ')}</td>
                <td>{val.type}</td>
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

  editTour(name) {
    this.props.edit(name);
    this.props.view('edit-tour');
  }

  copyTour(name) {
    this.props.edit(name);
    this.props.view('copy-tour');
  }

  deleteTour(name) {
    this.setState({ name: name });
    this.handleShow();
  }

  render() {
    return (
      <Container>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this tour? It cannot be undone!</Modal.Body>
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

export default Tours;
