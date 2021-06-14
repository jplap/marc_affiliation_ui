//https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
//import logo from './logo.svg';
import React from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';
import Search from './Search.js';

function App() {
    return (
        /*<div className="App">
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
        </div>*/
        <div>
            <section>
                <Search></Search>


            </section>
        </div>
    );
}

export default App;
