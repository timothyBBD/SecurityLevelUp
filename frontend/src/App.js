import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Components from './components/index'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button'

import Media from 'react-media';

import TheArticle from './pages/Articles/Articles';

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
      color: 'white'
    },
    false: {
    }
  }

  return (
    <div className="App">

      {/* <BlogNavBar/> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <LoginModal/>
          
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Router>

      <Navbar collapseOnSelect expand="lg" className="py-4" variant="light">
        <Container>
          <Navbar.Brand href="#home">Simplicity Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav defaultActiveKey="/articles" className="ml-auto" >

              <Link style={pageButtonStyle[page === 0]} className="pageButtonStyle mx-3" onClick={() => {setPage(0)}} to="/articles">Articles</Link>

              <Link style={pageButtonStyle[page === 1]} className="pageButtonStyle mx-3" onClick={() => {setPage(1)}} to="/about">About</Link>

              <Link style={pageButtonStyle[page === 2]} className="pageButtonStyle mx-3" onClick={() => {setPage(2); handleShow();}} >Register/Login</Link>

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

  
        <Switch>
          <Route path="/articles">
            <Container>
              <Row>
                <Col className='testytest' md={{order: "first", span: 8}} xs={{order: "last", span: 12}}>
                  <Article title="Cleaning out emotional Clutter" message="Lorem Ipsum or something like that"/>
                </Col>
                <Col className='testytest' md={{order: "last", span: 4}} xs={{order: "first", span: 12}}>
                  <AboutPreview/>
                </Col>
              </Row>
            </Container>

          </Route>
          <Route path="/about">
            <AboutPreview/>
          </Route>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
