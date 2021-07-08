import logo from './logo.svg';
import './App.css';
import Components from './components/index'

const Article = Components.Article;
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Article title="Cleaning out emotional Clutter" message="Lorem Ipsum or something like that"/>
    </div>
  );
}

export default App;
