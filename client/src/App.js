import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/word/Home";
import WordFromJson from "./components/word/Word";
// import Lemmata from "./components/lemmata/Lemmata";
// import CountdownHome from "./components/countdown/CountdownHome";
// import Countdown from "./components/countdown/Countdown";
// import AnagramsHome from "./components/anagrams/AnagramsHome";
// import Anagrams from "./components/anagrams/Anagrams";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            {/* <Route path="/countdown/:word" component={Countdown} />
            <Route path="/countdown" component={CountdownHome} />
            <Route path="/anagrams/:word" component={Anagrams} />
            <Route path="/anagrams" component={AnagramsHome} /> */}
            <Route path="/about" component={About} />
            <Route path="/:word" component={WordFromJson} />
          </Switch>
          <Footer history={this.props.history}/>
        </Router>
      </div>
    );
  }
}

export default App;