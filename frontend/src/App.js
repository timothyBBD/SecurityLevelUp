import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import Components from './components/index';
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


import axios from 'axios';
import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";

import request from './services/requests';


import CreatePost from './pages/createPost/createPost';


import { postController } from './controllers';


const Article = Components.Article;
const AboutPreview = Components.AboutPreview;
const LoginModal = Components.LoginModal;

function App() {

  useEffect(() => {

    var what = localStorage.getItem('token');

    if (loadingArticles) {
      updateArticles();
    }


    // var ajson = {
    //   somehere: (w) => {
    //     console.log('some here as well' + w);
    //   }
    // }

    // ajson.somehere("lsjkdf");

    // request.user.login('peter@peter.com', 'peterpeter', 'peterpassword');



    // var env_path = process.env.JWT_VALIDATION_KEY_PATH;
    // var public_key_file = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyMPA056V5JW9o1n8bPGB\nZeM2phT1qGAQLWeapPpKtsj4DwfD3nYc9f0SdN651yYkMhVCSqUnm6WzEUZeT1oP\njTfdVc7wqkpkpxcFyLWVnLC6OrLCpNL2hoO8D13lQga4ShQVsYIvEfvlHtyEUlKa\naHPXK1CbuTI6KwJTUUF7q1gH/FLnrMSlSMY1UEH6rge2l91umVVcpR0nWG17t5JA\nzIvkEIk2g8e93AO5+ENuiagCYwh3xJS1WyghOTPQrccVWnVq1D8dzxbOsCy3XPSn\n3yL2tp00pV/SsueQO82pwJb+drtvxeKBkK/sQmg1W7Xlopt0/Bkj8wrs6ioRrbk8\nQwIDAQAB\n-----END PUBLIC KEY-----\n";
    // var jwt_token_decoded = jwt_decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIiLCJzdWIiOiJwZXRlcnBhbiIsImVtYWlsIjoicGV0ZXJAbmV2ZXJsYW5kLmNvbSIsImFkbWluIjowLCJpYXQiOjE2MjYwODg0NTN9.mHjMz5Fs_8wb1a5FMs5KDBgTchap2UKYEoZxHkqgwVg");

    // var decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIiLCJzdWIiOiJwZXRlcnBhbiIsImVtYWlsIjoicGV0ZXJAbmV2ZXJsYW5kLmNvbSIsImFkbWluIjowLCJpYXQiOjE2MjYwODg0NTN9.mHjMz5Fs_8wb1a5FMs5KDBgTchap2UKYEoZxHkqgwVg",
    //   public_key_file, 
    //   { algorithms: ["HS256"] }
    // );
    
    // console.log('decoded', decoded);

  });

  const history = useHistory();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [articles, setArticles] = useState([]);

  const handleClose = () => {
    history.push('/articles');
    setShow(false);
  };
  const handleShow = () => setShow(true);
  
  // const articles = postController.getAllPosts().map(article => {
  //   return <Article title={article.title} message={article.content}/>;
  // });

  const pageButtonStyle = {
    true: {
      border: '1px solid black',
      borderRadius: '8px',
      backgroundColor: 'black',
      color: 'white',
    },
    false: {},
  };

  const updateArticles = () => {
    // setLoadingArticles(true);
    postController.getAllPosts()
    .then((response) => {

        console.log('response articles', response);


        setArticles(response.data);

        setLoadingArticles(false);

    }).catch((e) => {
        console.debug('Error getting articles in exception: ', e);

        // setInvalidUser(true);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
    <div className='App'>
      <Modal show={show} onHide={handleClose} size='lg' onExited={() => {setPage(0);}}>
        <Modal.Body>
          <LoginModal closeModal={handleClose} userInformation={{loggedIn: setLoggedIn, username: setUsername}} />
        </Modal.Body>
      </Modal>

      {/* <Router> */}
        <Navbar collapseOnSelect expand='lg' className='py-4' variant='light'>
          <Container>
            <Navbar.Brand to='/' className='brandName' >Simplicity Blog</Navbar.Brand>

            {isLoggedIn && 
                <div >Hi, {username}</div>}

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

                {isLoggedIn ? 

                  <Link
                    style={pageButtonStyle[page === 2]}
                    className='pageButtonStyle mx-3'
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Log out
                  </Link> :
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
                }
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className='mainContent'>
          <Switch>
            <Redirect exact from="/" to="/articles" />
            <Route path='/articles'>
              <Container>
                <Row >
                  <Col className='articles'
                    md={{ order: 'first', span: 8 }}
                    xs={{ order: 'last', span: 12 }}
                  >
                    {loadingArticles ? <div>laoding</div> : articles.map(article => {
                      return <Article title={article.title} message={article.body}/>;
                    })}
                  </Col>
                  <Col className='articles'
                    md={{ order: 'last', span: 4 }}
                    xs={{ order: 'first', span: 12 }}
                  >
                    <AboutPreview />
                  </Col>
                </Row>
              </Container>
            </Route>
            <Route path='/AddPost'>
              <CreatePost isLoggedIn={isLoggedIn} update={updateArticles}/>
            </Route>
          </Switch>
        </div>
      {/* </Router> */}
    </div>
  );
}

export default App;
