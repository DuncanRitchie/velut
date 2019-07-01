import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from "./axios/axios";
import Home from "./components/word/Home";
import WordFromJson from "./components/word/WordFromJson";
import Lemmata from "./components/lemmata/Lemmata";
import CountdownHome from "./components/countdown/CountdownHome";
import Countdown from "./components/countdown/Countdown";
import AnagramsHome from "./components/anagrams/AnagramsHome";
import Anagrams from "./components/anagrams/Anagrams";
import Footer from "./components/footer/Footer";
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          currentWordObject: {},
          currentWordsArray: []
      }
  }
  
  fetchData() {
    // Let's fetch some data from MongoDB. The example here is listing all words of fifteen letters.
    axios.getWords({"Length": 15})
        .then((data)=>{this.setState({"currentWordsArray": data.data})})
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;