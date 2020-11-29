import React, { Component, lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Footer from "./components/footer/Footer";
import './App.css';
// Code-splitting.
const Home               = lazy(() => import("./pages/word/Home"));
const Word               = lazy(() => import("./pages/word/Word"));
const Advanced           = lazy(() => import("./subsites/advanced/Advanced"));
const SubwordsHome       = lazy(() => import("./subsites/subwords/SubwordsHome"));
const Subwords           = lazy(() => import("./subsites/subwords/Subwords"));
const AnagramPhrasesHome = lazy(() => import("./subsites/anagramphrases/AnagramPhrasesHome"));
const AnagramPhrases     = lazy(() => import("./subsites/anagramphrases/AnagramPhrases"));
const English            = lazy(() => import("./subsites/english/English"));
const EnglishHome        = lazy(() => import("./subsites/english/EnglishHome"));
const About              = lazy(() => import("./pages/about/About"));
// JSX to display before an above component loads.
const loading = () => <p>Loading...</p>;

class App extends Component {
render() {
    return (
      <div className="App" lang="en">
        <Router>
          <Suspense fallback={loading()}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/advanced" component={Advanced} />
              {/* <Route path="/advanced" component={AdvancedHome} /> */}
              <Route path="/subwords/:word" component={Subwords} />
              <Route path="/subwords" component={SubwordsHome} />
              <Route path="/anagramphrases/:word" component={AnagramPhrases} />
              <Route path="/anagramphrases" component={AnagramPhrasesHome} />
              <Route path="/english/:word" component={English}/>
              <Route path="/english/" component={EnglishHome}/>
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
          </Suspense>
          <Footer history={this.props.history}/>
        </Router>
      </div>
    );
  }
}

export default App;