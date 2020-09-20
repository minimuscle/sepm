import React, { Component } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

//Boostrap Imports - Design work
import { Container, Row, Table, Button } from 'react-bootstrap';

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
      return (
        this.state.types.map((val, key) => {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{val.name}</td>
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
          {/** TODO: Add CSS to this instead of the BRs */}
          <Row><h1>Tour Types</h1><br /><br /><br /></Row>
          <Row md="auto">
            <Button onClick={() => this.changeView('add-type')}>Add New Type</Button>
            <Button onClick={() => this.changeView('edit-type')}>Edit Tour Type</Button>
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
          </Row>
          <Row>{this.props.view}</Row>
        </Container>
    )
  }
}

export default Tours;
