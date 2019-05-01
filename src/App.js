import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/Home";
import WordFromJson from "./components/WordFromJson";
import Lemmata from "./components/Lemmata";
import Footer from "./components/Footer";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/:lemma" exact component={Lemmata} />
        <Route path="/word/:word" component={WordFromJson} />
        <Footer />
      </Router>
    );
  }
}

export default App;