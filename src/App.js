import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/Home";
import Lemmata from "./components/Lemmata";
import Footer from "./components/Footer";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        {/* <Route path="/word/:word" component={Word} /> */}
        <Route path="/:lemma" component={Lemmata}/>
        <Footer />
      </Router>
    );
  }
}

export default App;