import React from 'react';
import './App.css';

import {
  Route,
  Link,
  HashRouter as Router
} from 'react-router-dom';

import Home       from './Home';
import TeethSales from './TeethSales';
import Procedures from './Procedures';
import ProceduresSearch from './ProceduresSearch';


class App extends React.Component {



  render(){

    return (
      <div className="App">
        <h1>Let Me Be Your Dentist. I insist.</h1>
        <hr />

      <Router>

        <nav>
          <Link to="/">Home</Link> | &nbsp;
          <Link to="/procedures">Procedures</Link> | &nbsp;
          <Link to="/">Contact Us</Link> | &nbsp;
          <Link to="/teethshop">Teeth Sales</Link>
          <br/>

        </nav>
        <br/>
        <br/>

        {
          // Like rails routes.rb:
          //   get '/' => 'pages#home'
        }
          <Route exact path="/" component={ Home } />
          <Route exact path="/procedures" component={ Procedures } />
          <Route exact path="/procedures/search/:query" component={ ProceduresSearch } />
          <Route exact path="/teethshop" component={ TeethSales } />
        </Router>

        <hr />
        <footer>
          &copy; 2020 Unsettling Professionals
        </footer>
      </div>
    );
  } // render

} // class App

export default App;
