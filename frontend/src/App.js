import React, { useState, useEffect  } from 'react';
import logo from './logo.svg';
import './App.css';

import About from './pages/About/About';
import Articles from './pages/Articles/Articles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,

  Button 
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = 'sdfalksdfjlksdfjlksdjf';

    // Navbar.propTypes = {
    //   light: PropTypes.bool,
    //   dark: PropTypes.bool,
    //   fixed: PropTypes.string,
    //   color: PropTypes.string,
    //   role: PropTypes.string,
    //   expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    //   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    //   // pass in custom element to use
    // }

  });

  return (

    <div>
        <p>lakjsdf</p>
        <Button>what is this</Button>

            <Navbar color="light" dark expand="md" >
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>

      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/Articles">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/Articles">
            <Articles />
          </Route>
          {/* <Route path="/">
            <Home />
          </Route> */}
        </Switch>
      </div>
    </Router>

    </div>



  );
}

export default App;
