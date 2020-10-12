import React, { Component } from 'react';
import '../../App.css';

//Boostrap Imports - Design work
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: ''
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
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" />
                            </Form.Group>
                            <Form.Group>
                                <Button type="submit">Login</Button>
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
