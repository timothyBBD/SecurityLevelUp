import logo from './logo.svg';
import './App.css';
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

import Button from 'react-bootstrap/Button'

import Media from 'react-media';

import TheArticle from './pages/Articles/Articles';

const Article = Components.Article;
const AboutPreview = Components.AboutPreview;

function App() {



  return (
    <div className="App">

      {/* <BlogNavBar/> */}

      <Router>
        <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/articles">Articles</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

        <Switch>
          <Route path="/articles">
            <Button variant="primary" size="lg">
              Large button
            </Button>

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

        </Switch>
      </Router>

    </div>
  );
}

export default App;
