import React, { Component } from 'react';
import '../App.css';

//Boostrap Imports - Design work
import { Container, Row, Table } from 'react-bootstrap';

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

  render() {
    return (
      <Container>
          {/** TODO: Add CSS to this instead of the BRs */}
          <Row><h1>Add New Tour Types</h1><br /><br /><br /></Row>
        </Container>
    )
  }
}

export default Tours;
