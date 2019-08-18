import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/word/Home";
import Word from "./components/word/Word";
import SubwordsHome from "./components/subwords/SubwordsHome";
import Subwords from "./components/subwords/Subwords";
import AnagramsHome from "./components/anagrams/AnagramsHome";
import Anagrams from "./components/anagrams/Anagrams";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import './App.css';

class App extends Component {
render() {
    return (
      <div className="App" lang="en">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/subwords/:word" component={Subwords} />
            <Route path="/subwords" component={SubwordsHome} />
            <Route path="/anagramphrases/:word" component={Anagrams} />
            <Route path="/anagramphrases" component={AnagramsHome} />
            <Route path="/:type/:word" component={Word} />
            <Route path="/perfect" component={Home} />
            <Route path="/vowels" component={Home} />
            <Route path="/vowelsend" component={Home} />
            <Route path="/ecclesperfect" component={Home} />
            <Route path="/ecclesvowels" component={Home} />
            <Route path="/ecclesvowelsend" component={Home} />
            <Route path="/consonyms" component={Home} />
            <Route path="/anagrams" component={Home} />
            <Route path="/scansion" component={Home} />
            <Route path="/about" component={About}/>
            <Route path="/:word" component={Word} />
          </Switch>
          <Footer history={this.props.history}/>
        </Router>
      </div>
    );
  }
}

export default App;