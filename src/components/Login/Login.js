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

  changeView(view) {
    this.props.view(view);
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
          <h1>Welcome! Login Below</h1>
      </Container>
    )
  }
}

export default App;
