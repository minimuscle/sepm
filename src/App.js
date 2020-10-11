import React, { Component } from 'react';
import './App.css';
import Tours from './components/Tours/Tours';
import AddTours from './components/Tours/AddTours';
import EditTours from './components/Tours/EditTours';
import Types from './components/TourTypes/Types';
import AddTypes from './components/TourTypes/AddTypes';
import EditTypes from './components/TourTypes/EditTypes';
import Locations from './components/Locations/Locations';
import AddLocations from './components/Locations/AddLocations';
import EditLocations from './components/Locations/EditLocations';

//Boostrap Imports - Design work
import { Navbar, Nav, Container } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'locations',
      edit_name: '',
      edit_coordinates: '',
      edit_description: '',
      edit_types: '',
    }
  }

  updateView(view) {
    this.setState({
      view: view
    })
  }


  //Set Edit "X" to be that when the prop is set by a component


  setName(name) {
    this.setState({
      edit_name: name
    })
  }
  setCoordinates(name) {
    this.setState({
      edit_coordinates: name
    })
  }
  setDescription(name) {
    this.setState({
      edit_description: name
    })
  }


  renderComponents() {
    switch (this.state.view) {
      case 'tours':
        return <Tours view={this.updateView.bind(this)} edit={this.setName.bind(this)} />

      case 'edit-tour':
        return <EditTours view={this.updateView.bind(this)} title={this.state.name} />

      case 'types':
        //The bind sets the 'view' to the variable that is set in <Types/>
        return <Types view={this.updateView.bind(this)} edit={this.setName.bind(this)} />

      case 'add-tour':
        return <AddTours />

      case 'add-location':
        return <AddLocations />

      case 'edit-location':
        return <EditLocations view={this.updateView.bind(this)} name={this.state.edit_name} coordinates={this.state.edit_coordinates} description={this.state.edit_description} />

      case 'locations':
        return <Locations view={this.updateView.bind(this)} edit_name={this.setName.bind(this)} edit_coordinates={this.setCoordinates.bind(this)} edit_description={this.setDescription.bind(this)}/>

      case 'add-type':
        return <AddTypes />

      case 'edit-type':
        return <EditTypes view={this.updateView.bind(this)} title={this.state.name} />
      //Default means that if there is an error or not a 'case' then it defaults to the tours page
      default:
        return <Locations view={this.updateView.bind(this)} edit={this.setName.bind(this)} />
    }
  }

  render() {
    return (
      <Container fluid>
        <Navbar bg="dark" variant="dark">
          {/** TODO: Change other tours to be their actual pages */}
          <Navbar.Brand>Tour Guide Manager</Navbar.Brand>
          <Navbar.Collapse>
            <Nav className='mr-auto'>
              <Nav.Link onClick={() => this.updateView('locations')}>Locations</Nav.Link>
              <Nav.Link onClick={() => this.updateView('tours')}>Tours</Nav.Link>
              <Nav.Link onClick={() => this.updateView('types')}>Tour Types</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Text>
            Signed in as <a href="#login">John Doe</a>
          </Navbar.Text>
        </Navbar>
        {this.renderComponents()}
      </Container>
    )
  }
}

export default App;
