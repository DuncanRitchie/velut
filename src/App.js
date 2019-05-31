import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import WordFromJson from "./components/WordFromJson";
import Lemmata from "./components/Lemmata";
import CountdownHome from "./components/CountdownHome";
import Countdown from "./components/Countdown";
import AnagramsHome from "./components/AnagramsHome";
import Anagrams from "./components/Anagrams";
import Footer from "./components/Footer";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/lemma/:word" component={Lemmata} />
          <Route path="/countdown/:word" component={Countdown} />
          <Route path="/countdown" component={CountdownHome} />
          <Route path="/anagrams/:word" component={Anagrams} />
          <Route path="/anagrams" component={AnagramsHome} />
          <Route path="/:word" component={WordFromJson} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;