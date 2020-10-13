import React, { Component } from 'react';
import './App.css';
import Tours from './components/Tours/Tours';
import AddTours from './components/Tours/AddTours';
import CopyTours from './components/Tours/CopyTours';
import EditTours from './components/Tours/EditTours';
import Types from './components/TourTypes/Types';
import AddTypes from './components/TourTypes/AddTypes';
import EditTypes from './components/TourTypes/EditTypes';
import Locations from './components/Locations/Locations';
import AddLocations from './components/Locations/AddLocations';
import EditLocations from './components/Locations/EditLocations';
import CopyLocations from './components/Locations/CopyLocations';
import Login from './components/Login/Login';

//Boostrap Imports - Design work
import { Navbar, Nav, Container } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      edit_name: '',
      edit_coordinates: '',
      edit_description: '',
      edit_types: '',
      user: '',
    }
  }

  updateView(view) {
    this.setState({
      view: view
    })
  }

  userType(user) {
    this.setState({
      user: user
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
        return <Tours user={this.state.user} view={this.updateView.bind(this)} edit={this.setName.bind(this)} />

      case 'edit-tour':
        return <EditTours user={this.state.user} view={this.updateView.bind(this)} title={this.state.edit_name} />

      case 'types':
        //The bind sets the 'view' to the variable that is set in <Types/>
        return <Types user={this.state.user} view={this.updateView.bind(this)} edit={this.setName.bind(this)} />

      case 'add-tour':
        return <AddTours user={this.state.user} />

      case 'copy-tour':
        return <CopyTours user={this.state.user} name={this.state.edit_name}/>

      case 'add-location':
        return <AddLocations user={this.state.user} />

      case 'edit-location':
        return <EditLocations user={this.state.user} view={this.updateView.bind(this)} name={this.state.edit_name} coordinates={this.state.edit_coordinates} description={this.state.edit_description} />

      case 'copy-location':
        return <CopyLocations user={this.state.user} view={this.updateView.bind(this)} name={this.state.edit_name} coordinates={this.state.edit_coordinates} description={this.state.edit_description} />

      case 'locations':
        return <Locations user={this.state.user} view={this.updateView.bind(this)} edit_name={this.setName.bind(this)} edit_coordinates={this.setCoordinates.bind(this)} edit_description={this.setDescription.bind(this)} />

      case 'add-type':
        return <AddTypes user={this.state.user} />

      case 'edit-type':
        return <EditTypes user={this.state.user} view={this.updateView.bind(this)} title={this.state.edit_name} />
      //Default means that if there is an error or not a 'case' then it defaults to the tours page
      default:
        return <Login view={this.updateView.bind(this)} user={this.userType.bind(this)}/>
    }
  }

  loginInfo(){
    if (this.state.user == "") {
      return <Navbar.Text><a className="ButtonLogin" onClick={this.login}>Login</a></Navbar.Text>
    } else {
      return <Navbar.Text>Signed in as <a className="ButtonLogin" onClick={this.logout}>{this.state.user}</a></Navbar.Text>
    }
  }

  login = () => {
    this.updateView('login')
  }

  logout = () => {
    this.userType("");
    this.updateView('login');
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
          {this.loginInfo()}
        </Navbar>
        {this.renderComponents()}
      </Container>
    )
  }
}

export default App;
