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

//Boostrap Imports - Design work
import { Navbar, Nav, Container } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'locations',
      name: ''
    }
  }

  updateView(view) {
    this.setState({
      view: view
    })
  }

  setName(name) {
    this.setState({
      name: name
    })
  }


  renderComponents() {
    switch (this.state.view) {
      case 'tours':
        return <Tours view={this.updateView.bind(this)} edit={this.setName.bind(this)}/>

      case 'edit-tour':
        return <EditTours view={this.updateView.bind(this)} title={this.state.name}/>

      case 'types':
        //The bind sets the 'view' to the variable that is set in <Types/>
        return <Types view={this.updateView.bind(this)} edit={this.setName.bind(this)}/>

      case 'add-tour':
        return <AddTours />

      case 'add-location':
        return <AddLocations />

      case 'locations':
        return <Locations view={this.updateView.bind(this)}/>

      case 'add-type':
        return <AddTypes />

      case 'edit-type':
        return <EditTypes view={this.updateView.bind(this)} title={this.state.name}/>
      //Default means that if there is an error or not a 'case' then it defaults to the tours page
      default:
        return <Locations view={this.updateView.bind(this)} edit={this.setName.bind(this)}/>
    }
  }

  render() {
    return (
      <Container fluid>
        <Navbar bg="dark" variant="dark">
          {/** TODO: Change other tours to be their actual pages */}
          <Navbar.Brand onClick={() => this.updateView('tours')}>Tour Guide Manager</Navbar.Brand>
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
