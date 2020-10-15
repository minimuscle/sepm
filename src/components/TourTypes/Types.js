import React, { Component } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

//Boostrap Imports - Design work
import { Container, Row, Table, Button, Modal } from 'react-bootstrap';

class Tours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:9000/api/get/types')
      .then(res => res.json())
      .then(res => {
        if (res && res.data) {
          this.setState({ types: [...this.state.types, ...res.data] })
        }
      });
  }

  renderTours() {
    if (this.state.types.length <= 0) {
      return <tr><td colSpan="4">Loading...</td></tr>
    } else {
      if (this.props.userType == "admin") {
        return (
          this.state.types.map((val, key) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{val.name}</td>
                <td><Button variant="light" onClick={() => this.editType(val.name)}><FontAwesomeIcon icon={faEdit} color="gray" /></Button></td>
                <td><Button variant="danger" onClick={() => this.deleteType(val.name)}><FontAwesomeIcon icon={faTimes} /></Button></td>
              </tr>
            )
          }))
      } else {
        return (
          this.state.types.map((val, key) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{val.name}</td>
              </tr>
            )
          }))
      }
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
    fetch('http://localhost:9000/api/delete/types', {
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

  changeView(view) {
    this.props.view(view);
  }

  editType(name) {
    this.props.edit(name);
    this.props.view('edit-type');
  }

  deleteType(name) {
    this.setState({ name: name });
    this.handleShow();
  }

  showExtraHeaders() {
    if (this.props.userType == "admin") {
      return (
        <div>
          <div className="title"><h1>Tour Types</h1>
            <Button className="addBtn" onClick={() => this.changeView('add-type')}>Add New Type</Button></div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tour Type</th>
                <th>Edit</th>
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
          <div className="title"><h1>Tour Types</h1></div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tour Type</th>
              </tr>
              {this.renderTours()}
            </thead>
          </Table>
        </div>
      )
    }
  }

  render() {
    return (
      <Container>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this tour type? It cannot be undone!</Modal.Body>
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
