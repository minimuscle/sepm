import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../App.css';

//Boostrap Imports - Design work
import { Container, Row, Table, Button, Modal } from 'react-bootstrap';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

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

  handleShow = () => {
    this.setState({ show: true })
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
              <td>{val.type}</td>
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

  editTour(name) {
    this.props.edit(name);
    this.props.view('edit-tour');
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
                <th>Types</th>
                <th>Total Time</th>
                <th>Edit</th>
                <th>Delete</th>
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
