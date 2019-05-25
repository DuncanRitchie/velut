import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/Home";
import WordFromJson from "./components/WordFromJson";
import Lemmata from "./components/Lemmata";
import Countdown from "./components/Countdown";
import Anagrams from "./components/Anagrams";
import Footer from "./components/Footer";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/lemma/:word" component={Lemmata} />
        <Route path="/countdown/:word" component={Countdown} />
        <Route path="/anagrams/:word" component={Anagrams} />
        <Route path="/:word" exact component={WordFromJson} />
        <Footer />
      </Router>
    );
  }
}

export default App;