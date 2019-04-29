import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Home from "./components/Home";
import Word from "./components/Word";
import Footer from "./components/Footer";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/:word" component={Word} />
        <Footer />
      </Router>
    );
  }
}

export default App;