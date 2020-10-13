import React, { Component } from 'react';
import '../../App.css';

//Boostrap Imports - Design work
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: '',
            username: '',
            password: '',
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

    handleNameChange = (event) => {
        this.setState({ username: event.target.value })
    }

    handlePassChange = (event) => {
        this.setState({ password: event.target.value })
    }

    changeView(view) {
        this.props.view(view);
    }

    handleSubmit = () => {
        const {username, password } = this.state;
        fetch('http://localhost:9000/api/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          })
          .then(res => {
            if (res.status == "202") {
                this.props.userType(username);
                this.changeView('locations');
            }
          })
    }



    render() {
        return (
            <Container className="login">
                <h1>Welcome! Login Below</h1><br />
                <Row className="justify-content-md-center">
                    <Col md={4}>
                    </Col>
                    <Col md={3}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleNameChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handlePassChange} />
                            </Form.Group>
                            <Form.Group>
                                <Button onClick={this.handleSubmit}>Login</Button>
                            </Form.Group>

                        </Form>
                    </Col>
                    <Col md={4}>
                    </Col>
                </Row>


            </Container>
        )
    }
}

export default App;
