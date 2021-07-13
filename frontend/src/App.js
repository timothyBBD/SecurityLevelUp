import React, { useState, useEffect } from 'react';
import './App.scss';
import Components from './components/index';
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import CreatePost from './pages/createPost/createPost';
import { postController } from './controllers';
import PropagateLoader from "react-spinners/PropagateLoader";

const Article = Components.Article;
const AboutPreview = Components.AboutPreview;
const LoginModal = Components.LoginModal;

function App() {

  useEffect(() => {
    if (loadingArticles) {
      updateArticles();
    }
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
    setPage(0);
  };
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

  const updateArticles = () => {
    postController.getAllPosts()
    .then((response) => {

        console.debug('Response articles: ', response);

        setArticles(response.data);

        setLoadingArticles(false);

    }).catch((e) => {
        console.debug('Error getting articles in exception: ', e);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
    <div className='App'>
      <Modal show={show} onHide={handleClose} size='lg' onExited={() => {
          console.log('what what?');
          history.push('/articles');
          setPage(0);
        }} animation={false}>
        <Modal.Body>
          <LoginModal closeModal={handleClose} userInformation={{loggedIn: setLoggedIn, username: setUsername}} />
        </Modal.Body>
      </Modal>

      <Navbar collapseOnSelect expand='lg' className='py-4' variant='light'>
        <Container>
          <Navbar.Brand to='/' className='brandName' >Simplicity Blog</Navbar.Brand>

          {isLoggedIn && 
              <div >Hi, {username}</div>}

          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav defaultActiveKey='/articles' className='ml-auto'>
              <Link
                to='/articles'
                style={pageButtonStyle[page === 0]}
                className='pageButtonStyle mx-3'
                onClick={() => {
                  setPage(0);
                }}
              >
                Articles
              </Link>

              <Link
                to='/AddPost'
                style={pageButtonStyle[page === 1]}
                className='pageButtonStyle mx-3'
                onClick={() => {
                  setPage(1);
                }}
              >
                Add
              </Link>

              {isLoggedIn ? 

                <Link
                  to=''
                  style={pageButtonStyle[page === 2]}
                  className='pageButtonStyle mx-3'
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Log out
                </Link> :
                <Link
                  to=''
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
                  {loadingArticles ? <PropagateLoader size={5}/> : articles.map(article => {
                    return <Article key={article.title+article.body} title={article.title} message={article.body}/>;
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
    </div>
  );
}

export default App;
