import React, { Component } from 'react';
import './App.css';
import Tours from './components/Tours/Tours';
import AddTours from './components/Tours/AddTours';
import Types from './components/TourTypes/Types';
import AddTypes from './components/TourTypes/AddTypes';
import EditTypes from './components/TourTypes/EditTypes';

//Boostrap Imports - Design work
import { Navbar, Nav, Container } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'tours'
    }
  }

  updateView(view) {
    this.setState({
      view: view
    })
  }


  renderComponents() {
    switch (this.state.view) {
      case 'tours':
        return <Tours view={this.updateView.bind(this)} />

      case 'types':
        //The bind sets the 'view' to the variable that is set in <Types/>
        return <Types view={this.updateView.bind(this)} />

      case 'add-tour':
        return <AddTours />

      case 'add-type':
        return <AddTypes />

      case 'edit-type':
        return <EditTypes />
      //Default means that if there is an error or not a 'case' then it defaults to the tours page
      default:
        return <Tours view={this.updateView.bind(this)}/>
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
              <Nav.Link onClick={() => this.updateView('tours')}>Home</Nav.Link>
              <Nav.Link onClick={() => this.updateView('tours')}>Locations</Nav.Link>
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
