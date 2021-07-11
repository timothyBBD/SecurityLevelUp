import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Components from './components/index';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import CreatePost from './pages/createPost/createPost'
const Article = Components.Article;
const AboutPreview = Components.AboutPreview;
const LoginModal = Components.LoginModal;

function App() {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const pageButtonStyle = {
    true: {
      border: '1px solid black',
      borderRadius: '8px',
      backgroundColor: 'black',
      color: 'white',
    },
    false: {},
  };

  return (
    <div className='App'>
      <Modal show={show} onHide={handleClose} size='lg' >
        <Modal.Body>
          <LoginModal closeModal={handleClose}/>
        </Modal.Body>
      </Modal>

      <Router>
        <Navbar collapseOnSelect expand='lg' className='py-4' variant='light'>
          <Container>
            <Navbar.Brand to='/' className='brandName' >Simplicity Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav defaultActiveKey='/articles' className='ml-auto'>
                <Link
                  style={pageButtonStyle[page === 0]}
                  className='pageButtonStyle mx-3'
                  onClick={() => {
                    setPage(0);
                  }}
                  to='/articles'
                >
                  Articles
                </Link>

                <Link
                  style={pageButtonStyle[page === 1]}
                  className='pageButtonStyle mx-3'
                  onClick={() => {
                    setPage(1);
                  }}
                  to='/AddPost'
                >
                  Add
                </Link>

                <Link
                  style={pageButtonStyle[page === 2]}
                  className='pageButtonStyle mx-3'
                  onClick={() => {
                    setPage(2);
                    handleShow();
                  }}
                >
                  Register/Login
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className='mainContent'>
          <Switch>
            <Route path='/articles'>
              <Container>
                <Row >
                  <Col className='testytest'
                    md={{ order: 'first', span: 8 }}
                    xs={{ order: 'last', span: 12 }}
                  >
                    <Article
                      title='Cleaning out emotional Clutter'
                      message='Lorem Ipsum or something like that'
                    />
                  </Col>
                  <Col className='testytest'
                    md={{ order: 'last', span: 4 }}
                    xs={{ order: 'first', span: 12 }}
                  >
                    <AboutPreview />
                  </Col>
                </Row>
              </Container>
            </Route>
            <Route path='/AddPost'>
              <CreatePost />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
