import React, { Component } from 'react';
import '../App.css';

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
              <td>{val.tours.join(', ')}</td>
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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tour Type</th>
                  <th>Tours</th>
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
