import React, { Component } from 'react';
import '../../App.css';

//Boostrap Imports - Design work
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: '',
            selectedUser: '',
            username: '',
            password: '',
            type: 'admin'
        }
    }

    //This "fetches" the API which is set up to get the tours json data
    componentDidMount() {
        fetch('http://localhost:9000/api/get/users')
            .then(res => res.json())
            .then(res => {
                if (res && res.data) {
                    this.setState({ users: [...this.state.users, ...res.data] })
                }
            });
    }

    changeView(view) {
        this.props.view(view);
    }

    showUsers() {
        if (this.state.users.length <= 0) {
            return <option>Loading...</option>
        } else {
            return (
                this.state.users.map((val, key) => {
                    return (
                        <option key={key}>{val.username}</option>
                    )
                }))
        }
    }

    //deactivates selected account
    handleDeactivate = () => {
        fetch('http://localhost:9000/api/toggle/user', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.state.selectedUser,
              active: false
            })
          })
    }

    //activates the selected account
    handleActivate = () => {
        fetch('http://localhost:9000/api/toggle/user', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.state.selectedUser,
              active: true
            })
          })

    }

    handleSelectedUserChange = (event) => {
        this.setState({ selectedUser: event.target.value })
    }



    //Submits the form to create new accounts
    handleSubmit = () => {
        fetch('http://localhost:9000/api/add/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                type: this.state.type,
                active: true,
                login: false
            })
        })

        window.location.reload();
    }


    //The following are for handling the onChange values
    handleNameChange = (event) => {
        this.setState({ username: event.target.value })
    }

    handlePassChange = (event) => {
        this.setState({ password: event.target.value })
    }

    handleTypeChange = (event) => {
        this.setState({ type: event.target.value })
    }


    showSettings() {
        console.log(this.state.selectedUser)
        if (this.props.userType == "admin") {
            return (
                <Row className="justify-content-md-center" >
                    <Col md={4}>
                        {/*Deactivae / Reactivate Form*/}
                        <Form>
                            <Form.Group>
                                <Form.Label>Select Account</Form.Label>
                                <Form.Control value={this.state.selectedUser} onChange={this.handleSelectedUserChange} as="select">{this.showUsers()}</Form.Control><br />

                                <Button onClick={this.handleActivate} variant="success">Activate</Button>
                                <Button onClick={this.handleDeactivate} className="floatright" variant="danger">De-activate</Button>
                            </Form.Group>
                        </Form>
                        <br /><br /><br /><br />
                        {/**Create new admin / assistant Form */}
                        <Form>
                            <h2>Create New Account</h2>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleNameChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handlePassChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Form.Control as="select" value={this.state.type} onChange={this.handleTypeChange}>
                                    <option value="admin">Admin</option>
                                    <option value="assistant">Assistant</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Button onClick={this.handleSubmit}>Create New Account</Button>
                            </Form.Group>
                        </Form>
                    </Col>

                </Row>
            )
        } else {
            return (<Row className="justify-content-md-center"><h2>Sorry, you do not have permission to change settings</h2></Row>)
        }
    }

    render() {
        return (
            <Container className="login">
                <h1>Settings</h1><br />
                {this.showSettings()}
            </Container>
        )
    }
}

export default App;
